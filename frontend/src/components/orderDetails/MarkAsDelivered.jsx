import { ListGroup } from 'react-bootstrap';
import ButtonWithLoader from '../general/ButtonWithLoader';

const MarkAsDelivered = ({
  userInfo,
  isPaid,
  isDelivering,
  isDelivered,
  deliverHandler,
}) => {
  return (
    <>
      {userInfo && userInfo.isAdmin && isPaid && !isDelivered && (
        <ListGroup.Item>
          <ButtonWithLoader
            loading={isDelivering}
            text='Mark As Delivered'
            type='button'
            className='btn btn-block'
            onClick={deliverHandler}
          />
        </ListGroup.Item>
      )}
    </>
  );
};

export default MarkAsDelivered;
