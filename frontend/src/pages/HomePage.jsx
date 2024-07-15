import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/product';
import HomeProducts from '../components/HomeProducts';
import GoBackButton from '../components/GoBackButton';
import Loader from '../components/Loader';
import Message from '../components/Message';
import Paginate from '../components/Paginate';

const HomeScreen = () => {
  // Get page number
  const { pageNumber, keyword } = useParams();

  // Get products
  const {
    data,
    isLoading,
    error: productError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  // Handle loading
  if (isLoading) return <Loader />;

  // Handle error
  if (productError)
    return <Message variant='danger'>{productError?.data}</Message>;

  return (
    <>
      {keyword && <GoBackButton />}
      <h1>Latest Products </h1>
      <HomeProducts data={data} />
      <Paginate pages={data.pages} page={data.page} keyword={keyword} />
    </>
  );
};

export default HomeScreen;
