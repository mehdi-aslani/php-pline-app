export class Tools {
  static url = () => {
    // return `${window.location.protocol}//${window.location.hostname}:8080`;
    return 'http://192.168.153.48:8080';
  };

  static stringToLabel = (string) => {
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
}

export const ResponseStatus = {
  Error: 0,
  Success: 1,
  Warning: 2,
  Info: 3,
  Danger: 4,
};
