
export const get = async (url) => {
  const response = await fetch(url);
  const jsonData = await response.json();
  const total = response.headers.has('X-Total-Count')
    ? +response.headers.get('X-Total-Count')
    : jsonData.length;
  return {
    data: jsonData,
    total,
  }
}

export const save = async (url, data, method = 'POST') => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  });
  return await response.json();
}

export const update = (...p) => save(...p, 'PUT');

export const remove = async (url) => {
  return await fetch(url, {
    method: 'DELETE',
  });
}

export const encodeData = (data) => {
  return Object.keys(data).map(function (key) {
    return [key, data[key]].map(encodeURIComponent).join("=");
  }).join("&");
}