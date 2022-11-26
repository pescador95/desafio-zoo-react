import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createHistoricoEtologico = async (historicoEtologico) => {
  const axios = getAxios();
  return axios.post(ENDPOINTS.historicoEtologico.add, historicoEtologico);
};

export const countHistoricoEtologico = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.historicoEtologico.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getHistoricoEtologico = async (historicoEtologico) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.historicoEtologico.getById);
  return data;
};

export const updateHistoricoEtologico = async (historicoEtologico) => {
  const axios = getAxios();
  const { data } = await axios.put(
    ENDPOINTS.historicoEtologico.update,
    historicoEtologico
  );
  return data;
};

export const getHistoricoEtologicos = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.historicoEtologico.list, {
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

export const deleteHistoricoEtologicos = async (historicoEtologicos) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.historicoEtologico.delete, {
    data: historicoEtologicos?.map((e) => e.id),
  });
  return data;
};

export const reactiveListHistoricoEtologicos = async (historicoEtologicos) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.historicoEtologico.reactive, {
    data: historicoEtologicos,
  });
  return data;
};
