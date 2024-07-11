import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetOrderDetailsQuery,
} from '../slices/ordersApi';
import { toast } from 'react-toastify';

const usePayPal = () => {
  // Grab orders ID
  const { id: orderId } = useParams();

  // Get orders details
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // Database Order updating action
  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation();

  const [{ isPending }, paypalDispatch] = usePayPalScriptReducer();

  // Get PayPal Client ID.
  const {
    data: paypal,
    isLoading: paypalLoading,
    error: paypalError,
  } = useGetPaypalClientIdQuery();

  // Check PayPal Client ID error
  if (paypalError && paypalLoading && !paypal.clientId)
    return toast.error('Could not connect to PayPal. Try again later.');

  // Call to load PayPal Script
  useEffect(() => {
    const loadPayPalScript = async () => {
      paypalDispatch({
        type: 'resetOptions',
        value: {
          'client-id': paypal.clientId,
          currency: 'USD',
        },
      });

      paypalDispatch({ type: 'setLoadingStatus', value: 'pending' });
    };

    // Load PayPal script
    if (order && !order.isPaid && !window.paypal) loadPayPalScript();
  }, [order, paypal, paypalDispatch, paypalLoading, paypalError]);

  // PayPal pop up window tester
  const onApprove = (data, actions) => {
    return actions.order.capture().then(async function (details) {
      try {
        await payOrder({ orderId, details });
        refetch();
        toast.success('payment successful');
      } catch (error) {
        toast.error(error?.data?.message || error.message || 'Payment failed');
      }
    });
  };

  // PayPal test button
  const onApproveTest = async () => {
    await payOrder({ orderId, details: { payer: {} } });
    refetch();
    toast.success('payment successful');
  };

  // PayPal payment error handler
  const onError = (error) => {
    toast.error(error.message);
  };

  // PayPal order creation
  const createOrder = (data, actions) => {
    return actions.order
      .create({
        purchase_units: [
          {
            amount: {
              value: order.totalPrice,
            },
          },
        ],
      })
      .then((orderId) => {
        return orderId;
      });
  };

  return {
    order,
    onApprove,
    onApproveTest,
    onError,
    createOrder,
    isPaying,
    isPending,
    isLoading,
    error,
  };
};

export default usePayPal;
