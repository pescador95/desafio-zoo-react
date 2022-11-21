import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createAnimal = async (animal) => {
  const axios = getAxios();
  return axios.post(ENDPOINTS.animal.add, animal);
};

export const countAnimal = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.animal.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getAnimal = async (animal) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.animal.getById);
  return data;
};

export const updateAnimal = async (animal) => {
  const axios = getAxios();
  const { data } = await axios.put(ENDPOINTS.animal.update, animal);
  return data;
};

export const getAnimals = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.animal.list, {
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

export const deleteAnimals = async (animals) => {
  const axios = getAxios();
  await axios.delete(ENDPOINTS.animal.delete, {
    data: animals?.map((e) => e.id),
  });
  return;
};

export const reactiveListAnimals = async (animals) => {
  const axios = getAxios();
  await axios.delete(ENDPOINTS.animal.reactive, {
    data: animals,
  });
  return;
};
