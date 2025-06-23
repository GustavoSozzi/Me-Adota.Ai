export const API_URL = 'http://localhost:8080';

export function FOTO_GET(fotoNome) {
  return `${API_URL}/uploads/${fotoNome}`;
}

export function ANIMAIS_GET_ID(id) {
  return {
    url: `${API_URL}/animais/${id}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function ANIMAIS_GET_TUTOR() {
  return {
    url: `${API_URL}/animais`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  };
}

export function ANIMAIS_GET({ page = 1, total = 3, user = 0 } = {}) {
  return {
    url: `${API_URL}/animais?_page=${page}&_total=${total}=${total}&_user=${user}`,
    options: {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
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

export function PETS_REGISTER(formData) {
  return {
    url: `${API_URL}/pets`,
    options: {
      method: 'POST',
      body: formData,
    },
  };
}

export function ABRIGO_REGISTER(body) {
  return {
    url: `${API_URL}/abrigos`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}

export function SEND_PAYMENT({ valor, email }) {
  return {
    url: `${API_URL}/criar-pagamento`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    },
    body: JSON.stringify({ valor, email }),
  };
}

export function SEND_MAIL(body) {
  return {
    url: `${API_URL}/api/send`,
    options: {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    },
  };
}
