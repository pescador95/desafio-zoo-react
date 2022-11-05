export const pageBreak = (x) => {
  if (!isNaN(x)) {
    if (parseInt(x) != parseFloat(x)) {
      return true;
    }
  }
  return false;
};
