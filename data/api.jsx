export const API_URL = "http://localhost:8080";


export function FOTO_GET(fotoNome) {
  return `${API_URL}/uploads/${fotoNome}`;
}

export function ANIMAIS_GET_ID(id){
  return {
    url: `${API_URL}/animais/${id}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function ANIMAIS_GET({page = 1, total = 3, user = 0} = {}){
  return {
    url: `${API_URL}/animais?_page=${page}&_total=${total}=${total}&_user=${user}`,
    options: {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    },
  };
}

export function ABRIGO_LOGIN(body) {
  return {
    url: `${API_URL}/login/abrigo`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
