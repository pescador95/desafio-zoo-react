import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createEnriquecimentoAmbiental = async (
  enriquecimentoAmbiental
) => {
  const axios = getAxios();
  const { data } = await axios.post(
    ENDPOINTS.enriquecimentoAmbiental.add,
    enriquecimentoAmbiental
  );
  return data;
};

export const countEnriquecimentoAmbiental = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.enriquecimentoAmbiental.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getEnriquecimentoAmbiental = async (enriquecimentoAmbiental) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.enriquecimentoAmbiental.getById);
  return data;
};

export const updateEnriquecimentoAmbiental = async (
  enriquecimentoAmbiental
) => {
  const axios = getAxios();
  const { data } = await axios.put(
    ENDPOINTS.enriquecimentoAmbiental.update,
    enriquecimentoAmbiental
  );
  return data;
};

export const getEnriquecimentoAmbientais = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.enriquecimentoAmbiental.list, {
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

export const deleteEnriquecimentoAmbientais = async (
  enriquecimentoAmbientais
) => {
  const axios = getAxios();
  const { data } = await axios.delete(
    ENDPOINTS.enriquecimentoAmbiental.delete,
    {
      data: enriquecimentoAmbientais?.map((e) => e.id),
    }
  );
  return data;
};

export const reactiveListEnriquecimentoAmbientais = async (
  enriquecimentoAmbientais
) => {
  const axios = getAxios();
  const { data } = await axios.delete(
    ENDPOINTS.enriquecimentoAmbiental.reactive,
    {
      data: enriquecimentoAmbientais,
    }
  );
  return data;
};
