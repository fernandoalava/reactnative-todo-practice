/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry ,View,Text} from 'react-native';
import { createStore } from 'redux'
import { Provider } from 'react-redux'


import  { TodoList }   from './app/components';
import todoApp from './app/reducers';

const store = createStore(todoApp)


export default class App extends Component {
  render(){
    return (
      <Provider store={store}>
        <TodoList />
      </Provider>
    );
  }
}


AppRegistry.registerComponent('ToDo', () => App);
