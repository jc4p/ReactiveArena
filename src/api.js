export default class ArenaAPI {
  constructor() {
    this.BASE_URL = 'https://arena-api.herokuapp.com/v2/';
  }
  getChannel(channel_name) {
    return fetch(this.BASE_URL + 'channels/' + channel_name)
      .then((response) => response.json())
      .then((res) => {
        metadata = {
          id: res.id,
          title: res.title,
          created_at: new Date(res.created_at),
          updated_at: new Date(res.updated_at),
          published: res.published,
          open: res.open,
          collaboration: res.collaboration,
          slug: res.slug,
          length: res.length,
          status: res.status,
          user_id: res.user_id,
          follower_count: res.follower_count,
        }
        if (res.metadata !== null && res.metadata.description !== null) {
          metadata.description = res.metadata.description
        }

        metadata.user = {
          id: res.user.id,
          slug: res.user.slug,
          username: res.user.username,
          full_name: res.user.full_name,
          avatar: res.user.avatar,
          avatar_full: res.user.avatar_image.display
        }

        blocks = [];
        res.contents.forEach((item) => {
          block = {
            id: item.id,
            title: item.title,
            created_at: new Date(item.created_at),
            updated_at: new Date(item.updated_at),
            position: item.position
          }
          if (item.source != null) {
            block.source_url = item.source.url;
          }
          if (item.image != null) {
            block.image = {
              thumb: item.image.thumb.url,
              display: item.image.display.url,
              original: item.image.original.url
            }
          }
          blocks.push(block);
        });

        blocks.sort((a, b) => {
          if (a.position < b.position)
            return 1;
          else if (a.position > b.position)
            return -1;
          return 0;
        });

        return { metadata, blocks }
      })
      .catch((error) => {
          console.error(error);
      });
  }
}