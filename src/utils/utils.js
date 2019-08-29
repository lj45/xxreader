"use strict";
import { Platform,StatusBar,Dimensions } from "react-native";

/**
 * //iphone 序列机型的屏幕高宽
 * //XSM SCREEN_HEIGHTL = 896.000000,SCREEN_WIDTHL = 414.000000 2.1642512077
 //XS SCREEN_HEIGHTL = 812.000000,SCREEN_WIDTHL = 375.000000 2.1653333333
 //XR SCREEN_HEIGHTL = 896.000000,SCREEN_WIDTHL = 414.000000 2.1642512077
 //X SCREEN_HEIGHTL = 812.000000,SCREEN_WIDTHL = 375.000000 2.1653333333
 */
const {height} = Dimensions.get('window');
const X_width = 375;
const X_height = 812;
const isIPhoneX = Platform.OS === 'ios'
  && ( (height === X_height && width ===X_width) || (height === X_width && width ===X_height) );

const isIPhoneXPaddingTop = function(number) {
  number = isNaN(+number) ? 0 : +number;
  return number + (isIPhoneX ? 44 : 20)
};

const isIPhoneXPaddingFooter =  function(number){
  number = isNaN(+number) ? 0 : +number;
  return number + (isIPhoneX ? 34 : 0 )
};

const getStatusBarHeight = function(){
  return Platform.select({
    ios:isIPhoneXPaddingTop(),
    android:StatusBar.currentHeight,
  });
};

module.exports = {
  isIPhoneXPaddingTop,
  isIPhoneXPaddingFooter,
  getStatusBarHeight,
};
