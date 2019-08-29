import React from "react";
import {View, Text,TouchableOpacity} from "react-native";
import NavigationService from "../../utils/navigation_service";
import http from "../../utils/http";
import {connect} from "react-redux";

class MineScreen extends React.Component {

  constructor(props){
    super(props);
    this._signin = this._signin.bind(this);
  }

  _signin(){
    http.post("http://localhost:3000/signin",{user_name:"liujie",pwd:"liujie"})
      .then(res => {
        if(res.code === 200){
          let data = res.data;
          let token = data && data.token;
          this.props.dispatch({
            type:'UPDATE_TOKEN',
            token
          })
        }
      });
  }

  render() {
    return (
      <View style={{ flex: 1,flexDirection:'column'}}>

      </View>
    );
  }
}

export default connect(({user})=>({user}))(MineScreen);
