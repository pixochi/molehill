// builds a string of url query parameters
export const buildUrlQuery = (dataObj: {[queryName: string]: any}): string => {
  return Object.keys(dataObj).map((key) => {
      return [key, dataObj[key]].map(encodeURIComponent).join('=');
  }).join('&');
};
