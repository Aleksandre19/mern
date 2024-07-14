import Loader from '../components/Loader';
import GoBackButton from '../components/GoBackButton';
import ErrorHandler from '../components/ErrorHandler';
import {
  ProductDetailsSection,
  ProductDetails,
  ProductDetailsImage,
  AddToCart,
  ProductReviews,
  ReviewsList,
  WriteComment,
} from '../components/productDetailsPage';
import useProductPage from '../hooks/useProductPage';

const ProductPage = () => {
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
  } = useProductPage();

  // Handle loading
  if (isProductLoading) return <Loader />;
  return (
    <>
      <GoBackButton />
      <ErrorHandler error={productError} />

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

export default ProductPage;
