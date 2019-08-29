"use strict";

import store from '../config/store/config_store';

const domains = {API_DOMAIN:"http://localhost:3000"};

let get = async function (url,params) {
  return fetchData(url,{method:"GET",params});
};

let post = async function (url,params) {
  return fetchData(url,{method:"POST",params});
};

let fetchData = async function (url,{method="GET",params={},}) {
  if(!url){
    console.warn('url is empty!');
    return ;
  }

  if(!/^http/.test(url)){
    url = domains.API_DOMAIN + url;
  }

  let {user} = store.getState();
  let token = user && user.token || '';
  let options = {
    method:method,
    headers:{
      'Accept':'application/json',
      'Content-Type':'application/json',
      'Authorization':token || ''
    }
  };

  if(method === "POST" || method === "PATCH" || method === "DELETE"){
    options.body = JSON.stringify(params);
  }else if(method === "GET"){
    params._time = Date.now();
    url = addParams(url,params);
  }

  let json = {};
  try{
    let startTime = new Date();
    let response = await fetch(url,options);

    let requestTime = new Date() - startTime;

    json = await  response.json();

    console.log('params:',JSON.stringify(params));
    console.log(json,'requestTime(ms):',requestTime,url,options);
  }catch (e) {
    console.warn('http fetch err:',url,e,options);
  }

  return json;

};

let addParams = function (url,obj) {
  let result = [];
  let [main,search] = url.split('?');
  let params = search && search.split('&');
  params && params.forEach((item)=>{
    let arr = item.split('=');
    result[arr[0]] = arr[1]
  });
  for(let key in obj){
    result[key] = encodeURIComponent(obj[key]);
  }

  let resultParams = [];
  for(let key in result){
    resultParams.push(key + '=' + result[key]);
  }

  url = main + '?' + resultParams.join('&');
  return url;
};

export default {get,post,fetchData};
