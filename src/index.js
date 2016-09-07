import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  Dimensions,
  Linking
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
  
  onItemClick(rowData) {
    // #TODO: better URL handling
    var url = rowData.source_url != null ? rowData.source_url : rowData.image.original;
    Linking.openURL(url);
  }

  renderRow(rowData) {
    return (
      <TouchableHighlight onPress={() => {this.onItemClick(rowData) }} style={styles.blockImageContainer}>
        <Image style={styles.blockImage} source={{uri: rowData.image.thumb}} />
      </TouchableHighlight>
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
      this.setState({loaded: true, metadata: res.metadata, blocks: res.blocks});
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
  blockImageContainer: {
    width: 100,
    height: 100,
    margin: 5
  },
  blockImage: {
    width: 100,
    height: 100
  },
  centered: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
  },
});
