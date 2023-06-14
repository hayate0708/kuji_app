import fetch from "node-fetch";
import { createHeaders } from "apis/common/HttpHeaders";

const get = (url) =>
  new Promise(async (resolve, reject) =>
    fetch(url, { method: "GET", headers: createHeaders() }).then((response) =>
      response.status === 200 ? resolve(response.json()) : reject(response.status)
    )
  );

const post = (url, body) =>
  new Promise(async (resolve, reject) =>
    fetch(url, {
      method: "POST",
      body: JSON.stringify(body),
      headers: createHeaders(),
    }).then((response) => (response.status === 200 ? resolve(response.status) : reject(response.status)))
  );

const put = (url, body) =>
  new Promise(async (resolve, reject) =>
    fetch(url, {
      method: "PUT",
      body: JSON.stringify(body),
      headers: createHeaders(),
    }).then((response) => (response.status === 200 ? resolve(response.status) : reject(response.status)))
  );

const del = (url) =>
  new Promise(async (resolve, reject) =>
    fetch(url, { method: "DELETE", headers: createHeaders() }).then((response) =>
      response.status === 200 ? resolve(response.status) : reject(response.status)
    )
  );

const method = { get, post, put, del };

export default method;
