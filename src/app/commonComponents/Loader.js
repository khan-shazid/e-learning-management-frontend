import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from 'react-loader-spinner';
import React, { Component } from 'react';

export default class CustomLoader extends React.Component {
//other logic
  render() {
   return(
    <Loader
       type={this.props.type}
       visible={this.props.visible}
       color="#00BFFF"
       height={this.props.height}
       width={this.props.width}
    />
   );
  }
}
