import axios from "axios";

export const getDataApi = async (url, token) => {
  const res = await axios.get(`https://dev-api.chawcad.com/api/v1/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const postDataApi = async (url, post, token) => {
  const res = await axios.post(
    `https://dev-api.chawcad.com/api/v1/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const logoutApi = async (url, token) => {
  const res = await axios.post(`https://dev-api.chawcad.com/api/v1/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};

export const putDataApi = async (url, post, token) => {
  const res = await axios.put(
    `https://dev-api.chawcad.com/api/v1/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const patchDataApi = async (url, post, token) => {
  const res = await axios.patch(
    `https://dev-api.chawcad.com/api/v1/${url}`,
    post,
    {
      headers: { Authorization: token },
    }
  );
  return res;
};

export const deleteDataApi = async (url, token) => {
  const res = await axios.delete(`https://dev-api.chawcad.com/api/v1/${url}`, {
    headers: { Authorization: token },
  });
  return res;
};
