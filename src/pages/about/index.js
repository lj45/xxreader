import React from "react";
import {View, Text,Image, StyleSheet, Button, Dimensions} from "react-native";
import NavBar from "../../components/nav_bar";


const {width} = Dimensions.get('window');

export default class About extends React.Component {

  constructor(props) {
    super(props);

  }

  render(){
    return (<View style={{flex:1,flexDirection:'column'}}>
      <NavBar {...this.props} dataSource={{leftTypeOrView:'GO_BACK'}}/>
      <Text>v1.0.0</Text>
    </View>);
  }
}
