import Cookies from "js-cookie";
 
export default class PlineCookies {
  static setCookies = (k, v) => {
    Cookies.set(k, v);
  };
  static getCookies = (k) => {
    return Cookies.get(k);
  };
  static removeCookies = (k) => {
    Cookies.remove(k);
  };
}
