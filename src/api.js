export default class ArenaAPI {
  getChannel(channelName) {
    return fetch('https://arena-api.herokuapp.com/v2/channels/communist-memes')
      .then((response) => response.json())
      .catch((error) => {
          console.error(error);
      });
  }
}