"use strict";
import {createStackNavigator, createAppContainer,
  createBottomTabNavigator,BottomTabBar} from "react-navigation";
import {View, Text,Image, StyleSheet, Button, Dimensions} from "react-native";
import HomeScreen from "../pages/home";
import MineScreen from "../pages/mine";
import DetailsScreen from "../pages/details";
import React from 'react';
import About from "../pages/about";
import Init from "../pages/init/init";
import Splash from "../pages/splash/index";
import Ionicons from "react-native-vector-icons/Ionicons";//https://www.iconfont.cn
// import theme from "./theme";

const TabBarComponent = (props) => {
  console.log("TabBarComponent",props);
  return <BottomTabBar {...props} />
};

const bottomNavigator = createBottomTabNavigator(
  {
    TabHome: {
      screen:HomeScreen,
      navigationOptions:{
        title: "首页",
        tabBarIcon:({ focused, horizontal, tintColor })=>{
          return <Ionicons name={'ios-home'} size={25} style={{color:tintColor}}/>
        },
      },

    },
    TabMine:{
      screen:MineScreen,
      navigationOptions:{
        title: "我的",
        tabBarIcon:({ focused, horizontal, tintColor })=>{
          return <Ionicons name={'ios-heart'} size={25} style={{color:tintColor}}/>
        },
      },
    }
  },
  {
    initialRouteName: 'TabHome',
    tabBarOptions:{activeTintColor:"green"},
    tabBarComponent:(props) =>
      (<TabBarComponent
        {...props}
        style={{ borderTopColor: '#605F60' }}
      />),
  },

);


const homeNavigator = createStackNavigator(
  {
    Init:Init,
    bottomNavigator:bottomNavigator,
    Details: DetailsScreen,
    About:About,
    Splash:Splash,
  },
  {
    headerMode:'none',
    initialRouteName:"Init",
    // transitionConfig:theme.transitionConfig,//覆盖动画行为
  }
);

module.exports= {
  AppContainer:createAppContainer(homeNavigator),
  homeNavigator,
  bottomNavigator,
};
