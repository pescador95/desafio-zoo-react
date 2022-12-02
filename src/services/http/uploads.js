import { getAxios } from "../../hooks/useAxiosFormData";
import { ENDPOINTS } from "../endpoints";

export const createUpload = async (values) => {
  console.log(values.file);
  const axios = getAxios();
  const fileReference = values.fileReference;
  const idAnimal = values.idAnimal;

  const bodyFormData = new FormData();
  bodyFormData.append("file", values);
  bodyFormData.append("fileUpload", values.file);
  bodyFormData.append("fileReference", fileReference);
  bodyFormData.append("idAnimal", idAnimal);

  const headers = {
    "content-type": "multipart/form-data",
  };

  const URL = ENDPOINTS.uploads.add;

  console.log(bodyFormData);

  const { data } = await axios.post(
    `${URL}?fileReference=${fileReference}&idAnimal=${idAnimal}`,
    { data: bodyFormData },
    headers
  );
  console.log(data);
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
