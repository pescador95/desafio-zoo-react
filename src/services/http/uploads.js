import { getAxios } from "../../hooks/useAxiosFormData";
import { ENDPOINTS } from "../endpoints";

export const createUpload = async (file, idAnimal, fileRefence) => {
  const axios = getAxios();
  console.log("file =" + file);
  console.log("id =" + idAnimal);
  console.log("fileReference =" + fileRefence);
  const { data } = await axios.post(ENDPOINTS.uploads.add, file, {
    params: {
      fileRefence,
      idAnimal,
    },
  });
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
