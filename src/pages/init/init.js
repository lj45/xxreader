"use strict";

import React from "react";
import {loadStore} from "../../config/store/config_store";
import {NavigationActions,StackActions} from "react-navigation";

export default class Init extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.loadPersisStore().then(newState => {
        console.log("new State+++000:", newState);
        this.resetRouter(newState)
      }
    );
  }

  loadPersisStore = async () => {
    return await loadStore();
  };

  resetRouter = async (state)=>{
    if(1){
      console.log("加载splash screen......");
      this.props.navigation.reset([
        NavigationActions.navigate({ routeName: 'bottomNavigator' }),
        NavigationActions.navigate({ routeName: 'Splash' }),
      ], 1)
    }
  };

  render(){
    return null;
  }
}
