import httpClient from "apis/common/HttpClient";

const urlPrefix = process.env.REACT_APP_API_URL_PREFIX;

const getCustomerOrdersApi = async () => {
  try {
    const url = new URL(`${urlPrefix}customer-orders`);
    return await httpClient.get(url.href);
  } catch (error) {
    throw error;
  }
};

const addCustomerOrderApi = async (body) => {
  try {
    const url = new URL(`${urlPrefix}add-customer-order`);
    return await httpClient.post(url.href, body);
  } catch (error) {
    throw error;
  }
};

const updateCustomerOrderApi = async (body) => {
  try {
    const url = new URL(`${urlPrefix}update-customer-order`);
    return await httpClient.put(url.href, body);
  } catch (error) {
    throw error;
  }
};

const deleteCustomerOrderApi = async (id) => {
  try {
    const url = new URL(`${urlPrefix}delete-customer-order`);
    url.searchParams.append("id", id);
    return await httpClient.del(url.href);
  } catch (error) {
    throw error;
  }
};

const api = { getCustomerOrdersApi, addCustomerOrderApi, updateCustomerOrderApi, deleteCustomerOrderApi };

export default api;
