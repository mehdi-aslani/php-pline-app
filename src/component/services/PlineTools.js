import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

/*
--help--
axios.get('/foo')
  .catch(function (error) {
    if (error.response) {
      console.log(error.response.data);
      console.log(error.response.status);
      console.log(error.response.headers);
    }
  });

*/

export const url = () => {
  return window.location.host.indexOf("localhost:3000") >= 0
    ? "http://localhost:8080"
    : "";
};

export const ResponseStatus = {
  Error: 0,
  Success: 1,
  Warning: 2,
  Info: 3,
  Danger: 4,
};

export const getRequest = (path) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        getCookies("token") === undefined ? "" : getCookies("token")
      }`,
    },
  };
  if (!path.startsWith(url())) {
    path = url() + path;
  }
  const response = axios.get(path, requestOptions);
  response.catch((error) => {
    if (error.response === undefined) {
      toast.error(
        "Unable to connect to server. Check your network connection or contact your system administrator."
      );
      deleteUserInfo();
    }
  });
  return response;
};

export const postRequest = (path, data) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        getCookies("token") === undefined ? "" : getCookies("token")
      }`,
    },
  };
  if (!path.startsWith(url())) {
    path = url() + path;
  }
  const response = axios.post(path, data, requestOptions);
  response.catch((error) => {
    if (error.response === undefined) {
      toast.error(
        "Unable to connect to server. Check your network connection or contact your system administrator."
      );
      deleteUserInfo();
    }
  });
  return response;
};

export const deleteRequest = (path) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        getCookies("token") === undefined ? "" : getCookies("token")
      }`,
    },
  };
  if (!path.startsWith(url())) {
    path = url() + path;
  }
  const response = axios.delete(path, requestOptions);
  response.catch((error) => {
    if (error.response === undefined) {
      toast.error(
        "Unable to connect to server. Check your network connection or contact your system administrator."
      );
      deleteUserInfo();
    }
  });
  return response;
};

export const patchRequest = (path, data = {}) => {
  const requestOptions = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        getCookies("token") === undefined ? "" : getCookies("token")
      }`,
    },
  };
  if (!path.startsWith(url())) {
    path = url() + path;
  }
  const response = axios.patch(path, data, requestOptions);
  response.catch((error) => {
    if (error.response === undefined) {
      toast.error(
        "Unable to connect to server. Check your network connection or contact your system administrator."
      );
      deleteUserInfo();
    }
  });
  return response;
};

export const uploadFile = async (path, file) => {
  const formData = new FormData();
  formData.append("file", file);
  const requestOptions = {
    method: "POST",
    headers: {
      //"Content-Type": "multipart/form-data",
      Authorization: `Bearer ${
        getCookies("token") === undefined ? "" : getCookies("token")
      }`,
    },
    body: formData,
  };
  if (!path.startsWith(url())) {
    path = url() + path;
  }
  const response = await fetch(path, requestOptions);
  //const result = await response.json();
  return response;
};

export const setCookies = (k, v) => {
  Cookies.set(k, v);
};
export const getCookies = (k) => {
  return Cookies.get(k);
};
export const removeCookies = (k) => {
  Cookies.remove(k);
};

export const stringToLabel = (string) => {
  try {
    let result = "";
    const items = string.split("_");
    items.forEach((element) => {
      result += element.charAt(0).toUpperCase() + element.slice(1) + " ";
    });
    return result.trim();
  } catch (e) {
    return "";
  }
};

const deleteUserInfo = () => {
  return;
  // removeCookies("auth");
  // removeCookies("username");
  // removeCookies("token");
  // removeCookies("user_id");

  // setCookies("name", "");
  // setCookies("username", "");
  // setCookies("token", "");
  // setCookies("user_id", "");
  // window.location = "/";
};
