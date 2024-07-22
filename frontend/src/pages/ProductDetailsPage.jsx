import Loader from '../components/general/Loader';
import GoBackButton from '../components/general/GoBackButton';
import ErrorHandler from '../components/general/ErrorHandler';
import {
  ProductDetailsSection,
  ProductDetails,
  ProductDetailsImage,
  AddToCart,
  ProductReviews,
  ReviewsList,
  WriteComment,
} from '../components/';
import useProductDetailsPage from '../hooks/useProductDetailsPage';

const ProductDetailsPage = () => {
  // Custom hook
  const {
    product,
    addToCartHandler,
    reviewSubmitHandler,
    userInfo,
    qty,
    setQty,
    rating,
    setRating,
    comment,
    setComment,
    isProductLoading,
    isReviewLoading,
    productError,
  } = useProductDetailsPage();

  // Handle loading
  if (isProductLoading) return <Loader />;

  // Handle error
  if (productError) return ErrorHandler(productError);

  return (
    <>
      <GoBackButton />

      <ProductDetailsSection>
        <ProductDetailsImage product={product} />
        <ProductDetails product={product} />
        <AddToCart
          product={product}
          addToCartHandler={addToCartHandler}
          qty={qty}
          setQty={setQty}
          isReviewLoading={isReviewLoading}
        />
      </ProductDetailsSection>

      <ProductReviews isReviewLoading={isReviewLoading} product={product}>
        <ReviewsList product={product} />

        <WriteComment
          userInfo={userInfo}
          reviewSubmitHandler={reviewSubmitHandler}
          rating={rating}
          setRating={setRating}
          comment={comment}
          setComment={setComment}
          isReviewLoading={isReviewLoading}
        />
      </ProductReviews>
    </>
  );
};

export default ProductDetailsPage;
