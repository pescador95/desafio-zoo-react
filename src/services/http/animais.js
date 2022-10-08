import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createAnimal = async (animal) => {
  const axios = getAxios();

  const { data } = await axios.post(ENDPOINTS.createAnimal);

  return data;
};

export const getAnimals = async (page) => {
  const axios = getAxios();

  const { data } = await axios.get(ENDPOINTS.getAnimals, {
    params: {
      page,
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

  await axios.delete(ENDPOINTS.deleteAnimals, {
    data: animals,
  });

  return;
};
