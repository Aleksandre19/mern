const useProductListPage = (products) => {
  const deleteHandler = (id) => {
    console.log('delete', id);
  };

  return {
    deleteHandler,
  };
};

export default useProductListPage;
