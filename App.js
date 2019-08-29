import React from "react";
import {AppContainer} from "./src/config/init";
import NavigationService from "./src/utils/navigation_service"

export default class App extends React.Component {

  handleNavigationChange = (prevState, newState, action)=>{
    console.log("%c =====start====","color:#00ff22");
    console.log("%c action:","color:green", action);
    console.log("%c prevState:","color:green",prevState);
    console.log("%c newState:","color:green",newState);
    console.log("%c =====end====","color:#00ff22");
  };

  render() {
    return <AppContainer onNavigationStateChange={this.handleNavigationChange}
                         ref={navigatorRef=>{
                           NavigationService.setTopLevelNavigator(navigatorRef);
                         }}/>;
  }
}

