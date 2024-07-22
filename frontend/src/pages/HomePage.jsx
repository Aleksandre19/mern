import { useParams } from 'react-router-dom';
import { useGetProductsQuery } from '../slices/product';
import Meta from '../components/general/Meta';
import { ProductsList, ProductsCarousel } from '../components';
import GoBackButton from '../components/general/GoBackButton';
import ErrorHandler from '../components/general/ErrorHandler';
import Loader from '../components/general/Loader';
import Paginate from '../components/general/Paginate';

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
  if (productError) return <ErrorHandler error={productError} />;

  return (
    <>
      {keyword ? <GoBackButton /> : <ProductsCarousel />}

      <Meta
        title='MERN'
        description='MERN Stack Project From Scratch | E-Commerce Platform'
      />

      <h1>Latest Products </h1>

      <ProductsList data={data} />
      <Paginate pages={data.pages} page={data.page} keyword={keyword} />
    </>
  );
};

export default HomeScreen;
