import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

let App = require('./src').default;

AppRegistry.registerComponent('ReactiveArena', () => App);
