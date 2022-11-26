import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createMedicacao = async (medicacao) => {
  const axios = getAxios();
  return axios.post(ENDPOINTS.medicacao.add, medicacao);
};

export const countMedicacao = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.medicacao.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getMedicacao = async (medicacao) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.medicacao.getById);
  return data;
};

export const updateMedicacao = async (medicacao) => {
  const axios = getAxios();
  const { data } = await axios.put(ENDPOINTS.medicacao.update, medicacao);
  return data;
};

export const getMedicacaos = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.medicacao.list, {
    params: {
      page,
      strgFilter,
    },
  });
};

export const deleteMedicacaos = async (medicacaos) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.medicacao.delete, {
    data: medicacaos?.map((e) => e.id),
  });
  return data;
};

export const reactiveListMedicacaos = async (medicacaos) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.medicacao.reactive, {
    data: medicacaos,
  });
  return data;
};
