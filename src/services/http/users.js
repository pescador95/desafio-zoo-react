import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createUser = async (user) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.user.add, user);
  return data;
};

export const countUser = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.user.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getUser = async (user) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.user.getById);
  return data;
};

export const updateUser = async (user) => {
  const axios = getAxios();
  const { data } = await axios.put(ENDPOINTS.user.update, user);
  return data;
};

export const getUsers = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.user.list, {
    params: {
      page,
      strgFilter,
    },
  });

  const parsed = data?.map((e) => {
    const parsed = e;
    // delete parsed?.id;
    delete parsed?.usuario;
    delete parsed?.usuarioAcao;
    delete parsed?.isAtivo;
    delete parsed?.systemDateDeleted;
    delete parsed?.dataAcao;

    return parsed;
  });
  return parsed;
};

export const deleteUsers = async (users) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.user.delete, {
    data: users?.map((e) => e.id),
  });

  return data;
};

export const reactiveListUsers = async (users) => {
  const axios = getAxios();

  const { data } = await axios.delete(ENDPOINTS.user.reactive, {
    data: users,
  });
  return data;
};

export const getMyProfile = async () => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.user.getMyProfile);
  return data;
};
