import { Link } from 'react-router-dom';

const GoBackButton = () => {
  return (
    <Link className='btn btn-light my-3' to='/'>
      Go Back
    </Link>
  );
};

export default GoBackButton;
