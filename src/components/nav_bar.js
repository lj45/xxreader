"use strict";

import React from "react";
import {View, Dimensions, TouchableOpacity,StyleSheet,Image} from "react-native";
import {getStatusBarHeight} from "../utils/utils";
import SplitLine from "./split_line";
import NavigationService from "../utils/navigation_service";

const {width,height} = Dimensions.get('window');
const styles = StyleSheet.create({
  goBackStyle:{
    width:40,
    justifyContent : 'center',
    paddingLeft:12,
  }
});
const buttonsMap = {
  "GO_BACK" :<View style={styles.goBackStyle}><Image source={require('../assets/images/top_back.png')} style={{width:10,height:20,resizeMode:'contain'}}/></View>,
  "GO_BACK_WHITE" :<View style={styles.goBackStyle}><Image source={require('../assets/images/top_back_white.png')} style={{width:10,height:20,resizeMode:'contain'}}/></View>,
};

export default class NavBar extends React.Component{

  static defaultProps={
    dataSource:{},
  };

  constructor(props){
    super(props);
    console.log("this.props:",this.props);
    this._goBack = this._goBack.bind(this);
  }

  _goBack(){
    NavigationService.goBack();
  }

  _getElement({typeOrView,action,style}){
    if(!typeOrView){
      return null;
    }

    if(action === false){
      return <View style={[{height:55,flexDirection:'row',alignItems:'center'},style]}>
        {buttonsMap[typeOrView] || typeOrView}
      </View>
    } else {
      return <TouchableOpacity style={[{height:55,flexDirection:'row',alignItems:'center'},style]}
                               onPress={action || this._goBack}>
        {buttonsMap[typeOrView] || typeOrView}
      </TouchableOpacity>
    }

  }

  render(){
    let {
      leftTypeOrView, leftAction, leftStyle,
      rightTypeOrView, rightAction, rightStyle,
      showSplitLine = false
    } = this.props.dataSource;
    return(<View style={[{backgroundColor:'white',width:width},this.props.style]}>
      {this.props.hideStatusbar ? null : <View style={{height:getStatusBarHeight()}}/>}
      {this.props.statusBarOnly ? null
        :<View style={{flexDirection:'row',justifyContent:'space-between',height:44,alignItems:'center'}}>
          {this._getElement({typeOrView:leftTypeOrView,action:leftAction,style:leftStyle})}
          {this._getElement({typeOrView:rightTypeOrView,action:rightAction,style:rightStyle})}
        </View>
      }
      {showSplitLine && <SplitLine style={{width:width,color:'#eee'}}/>}
    </View>);
  }

}
