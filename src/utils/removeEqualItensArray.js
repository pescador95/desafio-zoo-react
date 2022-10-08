export const removeEqualItensArray = (array) => {
  const result = [];

  array?.forEach((e) => {
    !result?.find((value) => String(value?.id) === String(e?.id)) &&
      result?.push(e);
  });

  return result;
};
