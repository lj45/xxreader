import React from 'react';
import {Image, View, Dimensions, TouchableOpacity, Text} from "react-native";
import {connect} from "react-redux";
import NavigationService from '../../utils/navigation_service';

const {height, width} = Dimensions.get('window');

class Splash extends React.Component{

  constructor(props){
    super(props);
    this.state={
      timeout:4
    };
    this.timer=null;
  }

  componentDidMount(){
    this.setTimeOut();
  }

  componentWillUnmount(){
    this.timer && clearInterval(this.timer);
  }

  setTimeOut = ()=>{
    this.timer = setInterval(()=>{
      if(this.state.timeout === 0){
        clearInterval(this.timer);
        this.jumpHome();
        return;
      }
      this.setState((prevState) => ({
        timeout: prevState.timeout - 1
      }));
    },1000)
  };

  jumpHome = ()=>{
    NavigationService.goBack();
  };

  render(){
    return (<View style={{flex:1}}>
      <Image
        style={{width: width, height: height}}
        source={{uri: 'http://img.tupianzj.com/uploads/allimg/160905/9-160Z5204247.jpg'}}
      />
      <TouchableOpacity style={{position:'absolute',top:30,right:15,backgroundColor:'rgba(0,0,0,0.3)',width:70,height:30,borderRadius:15,justifyContent:'center',alignItems:'center'}}
                        onPress={()=>{this.jumpHome();}}>
        <Text style={{fontSize:13,color:'white'}}>跳过{this.state.timeout}s</Text>
      </TouchableOpacity>
    </View>);
  }
}

export default connect(
  ({
     app
   }) => ({
    app
  })
)(Splash)


