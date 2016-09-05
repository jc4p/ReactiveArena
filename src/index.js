import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  ActivityIndicator,
  Dimensions
} from 'react-native';
import ArenaAPI from './api';

class ChannelGallery extends Component {
  constructor(props) {
    super(props);
    
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(props.blocks)
    };
  }
  
  renderRow(rowData) {
    return (
        <Image style={styles.blockImage} source={rowData.image.display} />
    )
  }
  
  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={(rowData) => this.renderRow(rowData)}
        style={styles.listContainer}
        contentContainerStyle={styles.listItemsContainer}
      />
    )
  }
}

export default class ReactiveArena extends Component {
  constructor(props) {
    super(props)
    
    this.state = {
      loaded: false,
      metadata: {},
      blocks: []
    }
    
    this.api = new ArenaAPI();
    this.componentDidMount = () => this.loadChannel();
  }
  
  loadChannel() {
    this.api.getChannel('communist-memes').then((res) => {
      // #TODO: move this object creation into api.js, then give this (metadata, blocks)
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
        description: res.metadata.description
      }
      metadata.user = {
        id: res.user.id,
        slug: res.user.slug,
        username: res.user.username,
        full_name: res.user.full_name,
        avatar: res.user.avatar,
        avatar_full: res.user.avatar_image.display
      }
      
      blocks = res.contents;
      // #TODO: AHHHH we're parsing the dates every comparison check.
      // These need to be parsed from JSON --> sane JS in the API level
      blocks.sort((a, b) => {
        a_connected_at = new Date(a.connected_at);
        b_connected_at = new Date(b.connected_at);
        if (a_connected_at > b_connected_at) 
          return -1;
        if (a_connected_at < b_connected_at)
          return 1;
        return 0;
      });
      this.setState({loaded: true, metadata: metadata, blocks: blocks});
    })
    .done();
  }
  
  render() {
    if (!this.state.loaded) {
      return (
        <ActivityIndicator
          style={[styles.centered, {flex: 1}]}
          size="large"
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <Text style={styles.title}>
            Are.na / {this.state.metadata.user.full_name} / {this.state.metadata.title}
          </Text>
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              {this.state.metadata.description}
            </Text>
            {/* #TODO: Add collaborators here.. "With A, B, C..." */}
          </View>
          <ChannelGallery style={styles.blocksContainer}
            blocks={this.state.blocks} />
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#EFEFEF',
    paddingTop: 24,
  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    marginTop: 0
  },
  descriptionContainer: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  blocksContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  listContainer: {
    alignSelf: 'stretch',
  },
  listItemsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginLeft: 10,
    marginRight: 10,
  },
  blockImage: {
    width: 100,
    height: 100,
    margin: 5,
    backgroundColor: '#FF0000',
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
});
