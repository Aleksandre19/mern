import CheckoutSteps from '../components/general/CheckoutSteps';
import { ListGroup } from 'react-bootstrap';
import { PlaceOrder } from '../components/';
import { OrderInfo } from '../components/';
import { ShippingInfo } from '../components/';
import { PaymentMethods } from '../components/';
import { OrderItems } from '../components/';
import { OrderCard } from '../components/';
import { CardSummary } from '../components/';
import ButtonWithLoader from '../components/general/ButtonWithLoader';
import usePlaceOrderPage from '../hooks/usePlaceOrderPage';

function PlaceOrderPage() {
  // Custom hook
  const { placeOrderHandler, cart, placeOrderLoading } = usePlaceOrderPage();

  return (
    <>
      <CheckoutSteps step1 step2 step3 step4 />

      <PlaceOrder>
        <OrderInfo>
          <ShippingInfo order={cart} orderPage={false} />
          <PaymentMethods order={cart} orderPage={false} />
          <OrderItems order={cart} />
        </OrderInfo>

        <OrderCard>
          <CardSummary order={cart} />

          <ListGroup.Item>
            <ButtonWithLoader
              loading={placeOrderLoading}
              text={'Place Order'}
              className='btn-block'
              disabled={cart.orderItems.length === 0}
              onClick={placeOrderHandler}
            />
          </ListGroup.Item>
        </OrderCard>
      </PlaceOrder>
    </>
  );
}

export default PlaceOrderPage;
