const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Номер ошибки: ${res.status}`);
}

export default checkResponse;