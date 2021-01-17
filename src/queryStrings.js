import qs from "query-string";

export const setQueryStringWithoutPageReload = (qsValue) => {
  const newurl =
    window.location.protocol +
    "//" +
    window.location.host +
    window.location.pathname +
    qsValue;
  window.history.pushState({ path: newurl }, "", newurl);
};

export const getIDSfromQuery = (key, queryString = window.location.search) => {
  const obj = qs.parse(queryString);
  return (obj[key] && obj[key].split(",")) || [];
};

export const addIDtoQuery = (key, value) => {
  const values = getIDSfromQuery(key);
  values.push(value);
  const newQsValue = qs.stringify({
    [key]: values.join(","),
  });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};

export const removeIDfromQuery = (key, value) => {
  const values = getIDSfromQuery(key);
  const newQsValue = qs.stringify({
    [key]: values.filter((id) => id !== value).join(","),
  });
  setQueryStringWithoutPageReload(`?${newQsValue}`);
};