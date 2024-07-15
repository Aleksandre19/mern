import useProductListPage from '../../hooks/admin/useProductListPage.js';
import Paginate from '../../components/Paginate';
import Loader from '../../components/Loader';
import {
  AdminProductsContainer,
  AdminProductsHeader,
  AdminProductsTabel,
} from '../../components/admin';

const ProductListPage = () => {
  // Custom hook
  const {
    data,
    deleteHandler,
    createProductHandler,
    getProductLoading,
    createProductLoading,
    deleteProductLoading,
    getProductError,
  } = useProductListPage();

  // Handle loadings
  if (getProductLoading) return <Loader />;

  return (
    <AdminProductsContainer>
      <AdminProductsHeader
        getProductError={getProductError}
        createProductLoading={createProductLoading}
        createProductHandler={createProductHandler}
      />

      <AdminProductsTabel
        data={data}
        deleteProductLoading={deleteProductLoading}
        deleteHandler={deleteHandler}
      />

      <Paginate pages={data.pages} page={data.page} isAdmin={true} />
    </AdminProductsContainer>
  );
};

export default ProductListPage;
