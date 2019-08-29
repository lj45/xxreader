import React from "react";
import {View, Text, Platform, StatusBar, TouchableOpacity} from "react-native";
import NavBar from "../../components/nav_bar";
import http from '../../utils/http';

export default class DetailsScreen extends React.Component {

  constructor(props){
    super(props);

  }

  _setCurStatusBar = (s)=>{
    StatusBar.setBarStyle(s,false);
  }

  componentDidMount(){

    http.get("http://localhost:3000/get_income")
      .then(res => {
        if (res.code === 200) {
          let data = res.data;
          this.setState({income:data});
        }

      });
  }

  render() {
    return (
      <View style={{ flex: 1, flexDirection:'column' }}>
        <NavBar {...this.props} dataSource={{leftTypeOrView:'GO_BACK'}}/>
        <TouchableOpacity onPress={()=>{
          let v = StatusBar._defaultProps.barStyle.value;
          if(v === 'light-content'){
            console.log('curState:','dark-content');
            StatusBar.setBarStyle('dark-content',false);
            if(Platform.OS === 'android'){
              StatusBar.setBackgroundColor('#ffffff');
              StatusBar.setTranslucent(true);
            }


          }else{
            console.log('curState:','light-content');
            StatusBar.setBarStyle('light-content',false);
            if(Platform.OS === 'android'){
              StatusBar.setBackgroundColor('#000000');
              StatusBar.setTranslucent(true);
            }

          }
        }}>
          <Text>this is liujie!!!!!!Details</Text>
        </TouchableOpacity>

      </View>
    );
  }
}
