const randomStr = () => {
  return Math.random().toString(36).substr(2, 11);
};

export default randomStr;
