export const setSessionItemWithExpiry = (key, value, ttlInMinutes) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttlInMinutes, // time in milliseconds
  };
  sessionStorage.setItem(key, JSON.stringify(item));
};

export const getSessionItemWithExpiry = (key) => {
  const itemStr = sessionStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // Compare the current time with the expiry time
  if (now.getTime() > item.expiry) {
    sessionStorage.removeItem(key);
    return null;
  }
  return item.value;
};

export const setLocalStorageItemWithExpiry = (key, value, ttlInMinutes) => {
  const now = new Date();
  const item = {
    value: value,
    expiry: now.getTime() + ttlInMinutes, // time in milliseconds
  };
  localStorage.setItem(key, JSON.stringify(item));
};

export const getLocalStorageItemWithExpiry = (key) => {
  const itemStr = localStorage.getItem(key);
  if (!itemStr) {
    return null;
  }
  const item = JSON.parse(itemStr);
  const now = new Date();
  // Compare the current time with the expiry time
  if (now.getTime() > item.expiry) {
    localStorage.removeItem(key);
    return null;
  }
  return item.value;
};