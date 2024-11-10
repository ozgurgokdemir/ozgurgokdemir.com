function getItem<T>(key: string) {
  const value = sessionStorage.getItem(key);
  return value ? (JSON.parse(value) as T) : null;
}

function setItem(key: string, value: unknown) {
  sessionStorage.setItem(key, JSON.stringify(value));
}

export default { getItem, setItem };
