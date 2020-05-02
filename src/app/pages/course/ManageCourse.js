import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Redirect } from "react-router-dom";

import Http from '../../services/Http';
import Title from '../../partials/Title';
import { toastSuccess,toastError } from '../../commonComponents/Toast';
import {ButtonWithLoader as BWL} from './components/ButtonWithLoader';
import ShowDetailsComponent from './components/ShowAllDetailsComponent';
import { columns, fixedHeaders, BASE_URL, LOADER_STYLE, DIMEN } from '../../constants';

class ManageCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            role : localStorage.getItem('role'),
            data : [],
            title : '',
            loading : false
        };
    }
    onChange = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
    }
    submit = async() => {
      let body = {
        title : this.state.title
      }
      this.setState({
        loading:true
      })
      await Http.POST('course',body)
        .then(({data}) => {
          this.setState({
            loading:false
          })
          if(data.success){
          console.log('course SUCCESS: ', JSON.stringify(data));
            toastSuccess(data.message);
            this.setState({
              title:''
            })
          }else{
            toastError(data.message);
          }

        })
        .catch(response => {
            this.setState({
              loading:false
            })
            console.log('course Error: ', JSON.stringify(response));
            toastError("Something went wrong! Please try again.");
        });
    }
    render() {
      const { loading, alert, title, role } = this.state;
        if(role!='admin'){
            return <Redirect to='/'  />
        }
        return (
            <div>
              <Title value="Manage Course"/>
              <div className="form-group">
                <label htmlFor="exampleInputEmail1">Course Title</label>
                <input type="text" className="form-control" name="title" value={title} onChange={this.onChange} placeholder="Enter Course Title"/>
              </div>
              <BWL
                title="Save"
                loader={loading}
                buttonStyle="primary"
                loaderStyle={LOADER_STYLE}
                dimen={DIMEN}
                onClick={this.submit} />
              <Title value="Show All Details"/>
              <ShowDetailsComponent />
            </div>
        );
    }
}

export default ManageCourse;
