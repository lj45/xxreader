import React from "react";
import {View, Text, Image, StyleSheet, Button, Dimensions, TouchableOpacity} from "react-native";
import {bindActionCreators} from 'redux';
import ActionCreators from '../../actions';
import {connect} from 'react-redux';
import http from '../../utils/http';
import store, {loadStore} from '../../config/store/config_store';
import SplitLine from "../../components/split_line";

const {width} = Dimensions.get('window');

class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.Actions = bindActionCreators(ActionCreators, this.props.dispatch);
    this.state = {
      imageUrl: '',
    };
    console.log('get init state:', store.getState());

    setTimeout(() => {
      this.Actions.isFirstLaunched();
    }, 300)

  }

  componentDidMount() {

    this.quotes = [];
    http.get("http://localhost:3000/banners")
      .then(res => {
        console.log("liujie first data:", res);
        if (res.code === 200) {
          let imageUrl = res.data && res.data.length > 0 && res.data[0].image && res.data[0].image.url || '';
          this.setState({imageUrl});
        }

      });

  }

  render() {
    console.log("curColor:", global.color_ff);
    let imageUrl = this.state.imageUrl || 'http://b-ssl.duitang.com/uploads/blog/201412/27/20141227174553_auCHe.jpeg';
    return (<View style={{flex: 1}}>

      {
        imageUrl
          ?
          <View style={{width: width, height: 200}}>
            <Image style={{width: width, height: 200, resizeMode: 'cover', position: 'absolute', top: 0, left: 0}}
                   source={{uri: imageUrl}}/>
          </View> : null
      }
      <View style={styles.titleContainer}>
        <Text style={styles.title}>常用知识点</Text>
      </View>
      <SplitLine style={{width:width - 30,marginHorizontal:15}}/>

      <TouchableOpacity style={[styles.contentContainer,{marginLeft:20}]}>
        <View style={{width:20,height:20,backgroundColor:'black',marginRight:20}}>
          <Image style={{width: 20, height: 20, resizeMode: 'cover'}}
                 source={require('../../assets/images/rn_logo.png')}/>
        </View>
        <Text style={styles.content}>React Native</Text>
      </TouchableOpacity>
      <SplitLine style={{width:width - 60,marginHorizontal:30}}/>

      <TouchableOpacity style={[styles.contentContainer,{marginLeft:20}]}>
        <View style={{width:20,height:20,backgroundColor:'black',marginRight:20}}>
          <Image style={{width: 20, height: 20, resizeMode: 'cover'}}
                 source={require('../../assets/images/router_logo.png')}/>
        </View>
        <Text style={styles.content}>React Navigation</Text>
      </TouchableOpacity>
      <SplitLine style={{width:width - 60,marginHorizontal:30}}/>
    </View>);
  }
}

let styles = StyleSheet.create(Object.assign({}, {
  top: {
    height: 40,
    backgroundColor: 'white',
    flexDirection: 'row',
    width: width,
  },
  titleContainer: {
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 15,
  },
  title: {
    fontSize: 16,
    color: global.color_272727,
    fontWeight: 'bold'
  },
  contentContainer:{
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  content:{
    fontSize: 15,
    color: global.color_272727,
  }
}));

export default connect(
  ({app}) => {
    return {app}
  }
)(HomeScreen);
