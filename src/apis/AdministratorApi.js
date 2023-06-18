import httpClient from "apis/common/HttpClient";

const urlPrefix = process.env.REACT_APP_API_URL_PREFIX;

const getAdministratorApi = async (id, password) => {
  try {
    const url = new URL(`${urlPrefix}administrator`);
    url.searchParams.append("id", id);
    url.searchParams.append("password", password);
    return await httpClient.get(url.href);
  } catch (error) {
    // throw error;
    console.log(error);
  }
};

const api = { getAdministratorApi };

export default api;
