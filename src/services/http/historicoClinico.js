import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createHistoricoClinico = async (historicoClinico) => {
  const axios = getAxios();
  return axios.post(ENDPOINTS.historicoClinico.add, historicoClinico);
};

export const countHistoricoClinico = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.historicoClinico.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getHistoricoClinico = async (historicoClinico) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.historicoClinico.getById);
  return data;
};

export const updateHistoricoClinico = async (historicoClinico) => {
  const axios = getAxios();
  const { data } = await axios.put(
    ENDPOINTS.historicoClinico.update,
    historicoClinico
  );
  return data;
};

export const getHistoricoClinicos = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.historicoClinico.list, {
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

export const deleteHistoricoClinicos = async (historicoClinicos) => {
  const axios = getAxios();
  await axios.delete(ENDPOINTS.historicoClinico.delete, {
    data: historicoClinicos?.map((e) => e.id),
  });
  return;
};

export const reactiveListHistoricoClinicos = async (historicoClinicos) => {
  const axios = getAxios();
  await axios.delete(ENDPOINTS.historicoClinico.reactive, {
    data: historicoClinicos,
  });
  return;
};
