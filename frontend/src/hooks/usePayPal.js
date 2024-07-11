import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import {
  usePayOrderMutation,
  useGetPaypalClientIdQuery,
  useGetOrderDetailsQuery,
  useDeliverOrderMutation,
} from '../slices/ordersApi';
import { toast } from 'react-toastify';

const usePayPal = () => {
  // Grab orders ID
  const { id: orderId } = useParams();

  // Get user info from the state
  const { userInfo } = useSelector((state) => state.auth);

  // Get orders details
  const {
    data: order,
    refetch,
    isLoading,
    error,
  } = useGetOrderDetailsQuery(orderId);

  // Order updating endpoint
  const [payOrder, { isLoading: isPaying }] = usePayOrderMutation();

  // Mark as delivered endpint - Admin
  const [deliverOrder, { isLoading: isDelivering }] = useDeliverOrderMutation();

  // PapPal script reducer
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

  // Mark order as delivered - Admin
  const deliverHandler = async () => {
    // Order by Id
    const delivered = await deliverOrder(orderId);

    // Handle error
    if (!delivered) return toast.error('Could not find delivery');

    refetch();

    // Handle success
    toast.success('Order delivered');
  };

  return {
    order,
    onApprove,
    onApproveTest,
    onError,
    createOrder,
    deliverHandler,
    userInfo,
    isPaying,
    isPending,
    isLoading,
    isDelivering,
    error,
  };
};

export default usePayPal;
