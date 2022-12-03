import { getAxios } from "../../hooks/useAxios";
import { ENDPOINTS } from "../endpoints";

export const createUpload = async (values) => {
  console.log(values);
  const axios = getAxios();
  const fileReference = values.fileReference;
  const idAnimal = values.idAnimal;

  const bodyFormData = new FormData();
  bodyFormData.append("file", values);
  console.log(bodyFormData);

  const options = {
    headers: { "Content-type": "multipart/form-data" },
  };

  const arquivos = { file: bodyFormData };

  const URL = ENDPOINTS.uploads.add;
  const data = await axios.post(
    `${URL}?fileReference=${fileReference}&idAnimal=${idAnimal}`,
    arquivos,
    options
  );
  console.log(data + " data requisicao");
  return data;
};

export const countUpload = async (strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.uploads.count, {
    params: {
      strgFilter,
    },
  });
  return data;
};

export const getUpload = async (upload) => {
  const axios = getAxios();
  const { data } = await axios.post(ENDPOINTS.uploads.getById);
  return data;
};

export const updateUpload = async (upload) => {
  const axios = getAxios();
  const { data } = await axios.put(ENDPOINTS.uploads.update, upload);
  return data;
};

export const getUploads = async (page, strgFilter) => {
  const axios = getAxios();
  const { data } = await axios.get(ENDPOINTS.uploads.list, {
    params: {
      page,
      strgFilter,
    },
  });

  const parsed = data?.map((e) => {
    const parsed = e;
    delete parsed?.filesize;
    delete parsed?.mimetype;
    delete parsed?.keyname;

    return parsed;
  });
  return parsed;
};

export const deleteUploads = async (uploads) => {
  const axios = getAxios();
  const { data } = await axios.delete(ENDPOINTS.uploads.delete, {
    data: uploads?.map((e) => e.id),
  });
  return data;
};
