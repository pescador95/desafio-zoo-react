import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createNutricao = async (nutricao) => {
  const axios = getAxios();
  return axios.post(ENDPOINTS.nutricao.add, nutricao);
};

export const countNutricao = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.nutricao.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getNutricao = async (nutricao) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.nutricao.getById);
  return data;
};

export const updateNutricao = async (nutricao) => {
  const axios = getAxios();
  const { data } = await axios.put(ENDPOINTS.nutricao.update, nutricao);
  return data;
};

export const getNutricaos = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.nutricao.list, {
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

export const deleteNutricaos = async (nutricaos) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.nutricao.delete, {
    data: nutricaos?.map((e) => e.id),
  });
  return data;
};

export const reactiveListNutricaos = async (nutricaos) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.nutricao.reactive, {
    data: nutricaos,
  });
  return data;
};
