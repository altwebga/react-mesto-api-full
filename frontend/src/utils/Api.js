class Api {
  constructor(options) {
    this.url = options.url;
    this.headers = options.headers;
  }

  _getResponseData(res) {
    if (!res.ok) {
      return Promise.reject(`Ошибка: ${res.status}`);
    }
    return res.json();
  }

  getUserInfo() {
    return fetch(`${this.url}/users/me`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  getInitialCards() {
    return fetch(`${this.url}/cards`, {
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  sendProfileInfo(setName, setAbout) {
    return fetch(`${this.url}/users/me`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        name: setName,
        about: setAbout,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  sendProfilePhoto(setPhoto) {
    return fetch(`${this.url}/users/me/avatar`, {
      method: 'PATCH',
      headers: this.headers,
      body: JSON.stringify({
        avatar: setPhoto,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  postNewCard({ name, link }) {
    return fetch(`${this.url}/cards`, {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteCard(id) {
    return fetch(`${this.url}/cards/${id}`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  likeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'PUT',
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  deleteLikeCard(id) {
    return fetch(`${this.url}/cards/${id}/likes`, {
      method: 'DELETE',
      headers: this.headers,
    }).then((res) => {
      return this._getResponseData(res);
    });
  }

  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.likeCard(id);
    } else {
      return this.deleteLikeCard(id);
    }
  }
}

const api = new Api({
  url: "https://backend.mesto44.nomoredomains.icu",
  headers: {
       "Content-Type": "application/json",
  },
});

export default api;
