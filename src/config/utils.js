export const setStore = (name, content, remember) => {
  if (typeof content !== 'string') content = JSON.stringify(content);
  const storage = remember ? localStorage : sessionStorage;
  return storage.setItem(name, content);
};

export const getStore = name => {
  return JSON.parse(sessionStorage.getItem(name) || localStorage.getItem(name));
};

export const removeItem = name => {
  return localStorage.removeItem(name);
};

export const isValidEmail = value => {
  return value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,64}$/i.test(value)
    ? false
    : true;
};
