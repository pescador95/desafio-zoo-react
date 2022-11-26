import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const getUserProfile = async (user) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.user.getById);

  return data;
};

export const updateUserProfile = async (user) => {
  const axios = getAxios();

  try {
    const { data } = await axios.put(ENDPOINTS.user.update, user);

    return data;
  } catch (error) {
    return error;
  }
};

export const getUsersProfile = async (page, strgFilter) => {
  const axios = getAxios();

  const { data } = await axios.get(ENDPOINTS.user.list, {
    params: {
      page,
      strgFilter,
    },
  });

  const parsed = data?.map((e) => {
    const parsed = e;
    delete parsed?.isAtivo;
    delete parsed?.systemDateDeleted;
    delete parsed?.dataAcao;

    return parsed;
  });
  return parsed;
};

export const deleteUsersProfile = async (users) => {
  const axios = getAxios();

  await axios.delete(ENDPOINTS.user.delete, {
    data: users?.map((e) => e.id),
  });
  return;
};

export const reactiveListUsersProfile = async (users) => {
  const axios = getAxios();

  const { data } = await axios.delete(ENDPOINTS.user.reactive, {
    data: users,
  });

  return data;
};

export const recoverPassword = async (email) => {
  const axios = getAxios();

  const { data } = await axios.post(ENDPOINTS.recoverPassword + email, {
    data: email,
  });

  return data;
};
