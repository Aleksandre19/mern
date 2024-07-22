import { ListGroup } from 'react-bootstrap';
import { PayPalButtons } from '@paypal/react-paypal-js';
import Loader from '../general/Loader';
const CardPayments = ({
  isPaid,
  isPaying,
  isPending,
  onApprove,
  createOrder,
  onError,
}) => {
  return (
    <>
      {!isPaid && (
        <ListGroup.Item>
          {isPaying && <Loader />}
          {isPending && <Loader />}
          {/* <div>
                    <Button
                      onClick={onApproveTest}
                      style={{ marginBottom: '10px' }}
                    >
                      Test Pay Order
                    </Button>
                  </div> */}
          <div>
            <PayPalButtons
              createOrder={createOrder}
              onApprove={onApprove}
              onError={onError}
            ></PayPalButtons>
          </div>
        </ListGroup.Item>
      )}
    </>
  );
};

export default CardPayments;
