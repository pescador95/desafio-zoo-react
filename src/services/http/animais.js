import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createAnimal = async (animal) => {
  const axios = getAxios();

  const { data } = await axios.post(ENDPOINTS.animal.add);

  return data;
};

export const getAnimal = async (animal) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.animal.getById);

  return data;
};

export const updateAnimal = async (animal) => {
  const axios = getAxios();

  const { data } = await axios.put(ENDPOINTS.animal.update);

  return data;
};

export const getAnimals = async (page) => {
  const axios = getAxios();

  const { data } = await axios.get(ENDPOINTS.animal.list, {
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

  await axios.delete(ENDPOINTS.animal.delete, {
    data: animals,
  });
  console.log(animals);
  return;
};

export const reactiveListAnimals = async (animals) => {
  const axios = getAxios();

  await axios.delete(ENDPOINTS.animal.reactive, {
    data: animals,
  });

  return;
};
