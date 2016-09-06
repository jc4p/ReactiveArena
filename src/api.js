export default class ArenaAPI {
  constructor() {
    this.BASE_URL = 'https://arena-api.herokuapp.com/v2/';
  }
  getChannel(channel_name) {
    return fetch(this.BASE_URL + 'channels/' + channel_name)
      .then((response) => response.json())
      .catch((error) => {
          console.error(error);
      });
  }
}