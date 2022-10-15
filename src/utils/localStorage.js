export const setSessionStorage = (key, value) => {
  return sessionStorage.setItem(key, JSON.stringify(value));
};

export const getSessionStorage = (key, defaultValue) => {
  try {
    const response = sessionStorage.getItem(key);

    const parsed = JSON.parse(response);

    return parsed;
  } catch (error) {
    return defaultValue;
  }
};
