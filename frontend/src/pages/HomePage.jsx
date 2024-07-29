import Meta from '../components/general/Meta';
import GoBackButton from '../components/general/GoBackButton';
import ErrorHandler from '../components/general/ErrorHandler';
import Loader from '../components/general/Loader';
import Paginate from '../components/general/Paginate';
import {
  HomePage,
  SideBar,
  ProductsWrapper,
  ProductsList,
  ProductTitle,
  ProductSorting,
} from '../components';
import useHomePage from '../hooks/useHomePage';

const HomeScreen = () => {
  // Custom hook
  const {
    data,
    title,
    keyword,
    categoryname,
    sort,
    setSort,
    isLoading,
    productError,
  } = useHomePage();

  // Handle loading
  if (isLoading) return <Loader />;

  // Handle error
  if (productError) return <ErrorHandler error={productError} />;

  return (
    <>
      {keyword && <GoBackButton />}

      <Meta
        title='MERN'
        description='MERN Stack Project From Scratch | E-Commerce Platform'
      />

      <HomePage>
        <SideBar />
        <ProductsWrapper>
          <ProductTitle title={title} />
          <ProductSorting sort={sort} setSort={setSort} />

          <ProductsList data={data} />
          <Paginate
            pages={data.pages}
            page={data.page}
            keyword={keyword}
            category={categoryname}
          />
        </ProductsWrapper>
      </HomePage>
    </>
  );
};

export default HomeScreen;
