import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useGetProductsQuery } from '../slices/product';
import { updateTitle } from '../slices/home';
import capitalize from '../utils/capitalize';

const useHomePage = () => {
  const dispatch = useDispatch();

  // Get page number
  const { pageNumber, keyword, categoryname } = useParams();

  // Get title
  const title = useSelector((state) => state.home.title);

  // Get products
  const {
    data,
    isLoading,
    error: productError,
  } = useGetProductsQuery({
    keyword,
    pageNumber,
    categoryname,
  });

  // Update product title on search and category selection.
  useEffect(() => {
    // Category
    if (data?.category) dispatch(updateTitle(`${data.category} Products`));

    // Search
    if (keyword) dispatch(updateTitle(`${capitalize(keyword)} Products`));
  }, [data?.category, dispatch, keyword]);

  return {
    data,
    title,
    keyword,
    isLoading,
    productError,
  };
};

export default useHomePage;
