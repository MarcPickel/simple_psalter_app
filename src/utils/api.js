class Api {
  constructor({ baseUrl, headers, translation, reference }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._translation = translation;
    this._number = reference;
  }

  _checkResponse(res) {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  }

  getRandomPsalm() {
    let randomPsalmNumber = Math.floor(Math.random() * 150) + 1;
    return fetch(
      `${this._baseUrl}/psalm%20${randomPsalmNumber}?translation=kjv`
    ).then(this._checkResponse);
  }

  changeTranslation({ reference, translation }) {
    // Extract psalm number from reference (e.g., "Psalm 23" -> "23")
    const psalmNumber = reference.match(/\d+/)?.[0] || reference;
    return fetch(
      `${this._baseUrl}/psalm%20${psalmNumber}?translation=${translation}`
    ).then(this._checkResponse);
  }
}

export default Api;
