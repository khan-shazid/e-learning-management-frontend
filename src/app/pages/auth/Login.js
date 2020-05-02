import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Http from '../../services/Http';
import { toastSuccess,toastError } from '../../commonComponents/Toast';
import {ButtonWithLoader as BWL} from '../../commonComponents/ButtonWithLoader';
import { columns, fixedHeaders, BASE_URL, LOADER_STYLE, DIMEN } from '../../constants';

class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email:'',
            password:'',
            loading:false
        };
    }

    onChange = (e) => {
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    submit = async() => {
      let { email, password } = this.state;
      if(email && password){
        let body = {
          email,
          password
        }
        this.setState({
          loading:true
        })
        await Http.POST('login',body)
          .then(({data}) => {
            this.setState({
              loading:false
            })
            if(data.success){
            console.log('login SUCCESS: ', JSON.stringify(data));
              toastSuccess(data.message);
              localStorage.setItem('token',data.data);
              localStorage.setItem('role',data.role);
              this.props.history.push('/');
            }else{
              toastError(data.message);
            }

          })
          .catch(response => {
              this.setState({
                loading:false
              })
              console.log('login Error: ', JSON.stringify(response));
              toastError("Something went wrong! Please try again.");
          });
      }else{
        toastError("Insert all credentials");
      }
    }

    render() {
        let { email, password, loading } = this.state;
        return (
            <div style={{marginLeft:500,marginRight:500,marginTop:200,padding:20,background:'#e4e4e4'}}>
              <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" className="form-control" name="email" value={email} onChange={this.onChange} placeholder="Enter email"/>
                <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
              </div>
              <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" className="form-control" name="password" value={password} onChange={this.onChange} placeholder="Password"/>
              </div>
              <BWL
                title="Login"
                loader={loading}
                buttonStyle="primary"
                loaderStyle={LOADER_STYLE}
                dimen={DIMEN}
                onClick={this.submit} />
            </div>
        );
    }
}

export default Login;
