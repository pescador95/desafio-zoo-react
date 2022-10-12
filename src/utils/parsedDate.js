export const parsedDate = (data) => {
  return new Date(data).toISOString().slice(0, -1);
};

export const formattedDateForInput = (data) => {
  return data?.split("/").reverse().join("-");
};
