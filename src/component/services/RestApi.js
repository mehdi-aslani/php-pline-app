import PlineCookies from "./PlineCookies";
import { Tools } from "./Tools";
import axios from "axios";
import { toast } from "react-toastify";

export default class RestApi {
  static getRequest = (path) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          PlineCookies.getCookies("token") === undefined
            ? ""
            : PlineCookies.getCookies("token")
        }`,
      },
    };
    if (!path.startsWith(Tools.url())) {
      path = Tools.url() + path;
    }
    const response = axios.get(path, requestOptions);
    response.catch((error) => {
      if (error.response === undefined) {
        toast.error(
          "Unable to connect to server. Check your network connection or contact your system administrator."
        );
        Tools.deleteUserInfo();
      }
    });
    return response;
  };
  static postRequest = (path, data) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          PlineCookies.getCookies("token") === undefined
            ? ""
            : PlineCookies.getCookies("token")
        }`,
      },
    };
    if (!path.startsWith(Tools.url())) {
      path = Tools.url() + path;
    }
    const response = axios.post(path, data, requestOptions);
    response.catch((error) => {
      if (error.response === undefined) {
        toast.error(
          "Unable to connect to server. Check your network connection or contact your system administrator."
        );
        Tools.deleteUserInfo();
      }
    });
    return response;
  };
  static deleteRequest = (path) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          PlineCookies.getCookies("token") === undefined
            ? ""
            : PlineCookies.getCookies("token")
        }`,
      },
    };
    if (!path.startsWith(Tools.url())) {
      path = Tools.url() + path;
    }
    const response = axios.delete(path, requestOptions);
    response.catch((error) => {
      if (error.response === undefined) {
        toast.error(
          "Unable to connect to server. Check your network connection or contact your system administrator."
        );
        Tools.deleteUserInfo();
      }
    });
    return response;
  };
  static patchRequest = (path, data) => {
    const requestOptions = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          PlineCookies.getCookies("token") === undefined
            ? ""
            : PlineCookies.getCookies("token")
        }`,
      },
    };
    if (!path.startsWith(Tools.url())) {
      path = Tools.url() + path;
    }
    const response = axios.patch(path, data, requestOptions);
    response.catch((error) => {
      if (error.response === undefined) {
        toast.error(
          "Unable to connect to server. Check your network connection or contact your system administrator."
        );
        Tools.deleteUserInfo();
      }
    });
    return response;
  };
  static uploadFile = async (path, file) => {
    const formData = new FormData();
    formData.append("file", file);
    const requestOptions = {
      method: "POST",
      headers: {
        //"Content-Type": "multipart/form-data",
        Authorization: `Bearer ${
          PlineCookies.getCookies("token") === undefined
            ? ""
            : PlineCookies.getCookies("token")
        }`,
      },
      body: formData,
    };
    if (!path.startsWith(Tools.url())) {
      path = Tools.url() + path;
    }
    const response = await fetch(path, requestOptions);
    //const result = await response.json();
    return response;
  };
}
