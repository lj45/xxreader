/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import store from './src/config/store/config_store';
import {Provider} from 'react-redux';

class MainApp extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    return <Provider store={store}>
      <App/>
    </Provider>
  }
}

AppRegistry.registerComponent(appName, () => MainApp);
