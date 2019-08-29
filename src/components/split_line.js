"use strict";

import React from "react";
import {View,StyleSheet,Dimensions} from "react-native";
import PropTypes from "prop-types";

const {width} = Dimensions.get('window');
export default class SplitLine extends React.Component{

  static defaultProps={
    color:'#eee',
    height:StyleSheet.hairlineWidth,
  };

  static propTypes={
    color:PropTypes.string,
    height:PropTypes.number,
    style:PropTypes.object,
  };

  render(){
    console.log("cur split line:",this.props.color,this.props);
    return (<View style={[{width:width,
      backgroundColor:'#eee',
      height:this.props.height},this.props.style]}/>);
  }

}
