/* eslint-disable @typescript-eslint/no-explicit-any */
export const slugify = (str: string | undefined): string | undefined => {
  return str?.split(" ").join("-").toLowerCase().replace("?", "");
};

export const addToLocalStorage = (name: string, data: any) => {
  localStorage.setItem(name, JSON.stringify(data));
};

export const getFromLocalStorage = (name: string) => {
  const newData: any = localStorage.getItem(name);
  function isJsonString(str: any) {
    try {
      JSON.parse(str);
    } catch (e) {
      return str;
    }
    return JSON.parse(str);
  }
  return isJsonString(newData);
};

export const checkIsFavorited = (type: string, paramId?: any) => {
  let result = false;
  const storage = getFromLocalStorage(type);
  if (storage) {
    result = storage?.some(
      (item: any) => String(item["id"]) === String(paramId)
    );
  }
  return result;
};

export const updateStorage = ({ data, storageName, type, dispatch }: any) => {
  const storage = getFromLocalStorage(storageName);
  const newData = storage ? [...storage] : [];
  newData.push(data);
  dispatch({ type, payload: newData });
  addToLocalStorage(storageName, newData);
};

export const removeFromStorage = ({
  paramId,
  storageName,
  type,
  dispatch,
}: any) => {
  const storage = getFromLocalStorage(storageName);
  if (storage) {
    const newData = storage?.filter((item: any) => {
      return String(item.id) !== String(paramId);
    });
    addToLocalStorage(storageName, newData);
    dispatch({ type, payload: newData });
  }
};
