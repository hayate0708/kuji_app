const getAdministratorApi = (id, password) => {
  if (id === "ts" && password === "ts") {
    return 200;
  } else {
    return 404;
  }
};

const api = { getAdministratorApi };

export default api;
