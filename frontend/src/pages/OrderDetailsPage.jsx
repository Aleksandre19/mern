import useOrderDetailsPage from '../hooks/useOrderDetailsPage';
import Loader from '../components/general/Loader';
import ErrorHandler from '../components/general/ErrorHandler';

import {
  OrderDetailsContainer,
  OrderInfo,
  ShippingInfo,
  PaymentMethods,
  OrderItems,
  OrderCard,
  CardSummary,
  CardPayments,
  MarkAsDelivered,
} from '../components';

const OrderPage = () => {
  const {
    order,
    onApprove,
    onApproveTest,
    onError,
    isPaying,
    createOrder,
    deliverHandler,
    userInfo,
    isPending,
    isLoading,
    isDelivering,
    error,
  } = useOrderDetailsPage();

  // Handle loading
  if (isLoading) return <Loader />;

  // Handle error
  if (error) return <ErrorHandler error={error} />;

  return (
    <>
      <OrderDetailsContainer orderId={order._id}>
        <OrderInfo>
          <ShippingInfo order={order} />
          <PaymentMethods order={order} />
          <OrderItems order={order} />
        </OrderInfo>

        <OrderCard>
          <CardSummary order={order} />

          <CardPayments
            isPaid={order.isPaid}
            isPaying={isPaying}
            isPending={isPending}
            onApprove={onApprove}
            createOrder={createOrder}
            onError={onError}
          />

          <MarkAsDelivered
            userInfo={userInfo}
            isPaid={order.isPaid}
            isDelivering={isDelivering}
            isDelivered={order.isDelivered}
            deliverHandler={deliverHandler}
          />
        </OrderCard>
      </OrderDetailsContainer>
    </>
  );
};

export default OrderPage;
