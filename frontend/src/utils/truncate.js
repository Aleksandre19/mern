const truncate = (str, num) => {
  if (str.length <= num) return str;
  const subString = str.slice(0, num - 1);
  return subString.slice(0, subString.lastIndexOf(' ')) + ' ...';
};

export default truncate;
