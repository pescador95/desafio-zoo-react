export const setLocalStorage = (key, value) => {
  return localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalStorage = (key, defaultValue) => {
  try {
    const response = localStorage.getItem(key);

    const parsed = JSON.parse(response);

    return parsed;
  } catch (error) {
    return defaultValue;
  }
};
