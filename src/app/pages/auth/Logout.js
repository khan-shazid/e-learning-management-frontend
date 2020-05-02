import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import { Redirect } from "react-router-dom";

import Http from '../../services/Http';
import { toastSuccess,toastError } from '../../commonComponents/Toast';
import {ButtonWithLoader as BWL} from '../../commonComponents/ButtonWithLoader';
import { columns, fixedHeaders, BASE_URL, LOADER_STYLE, DIMEN } from '../../constants';

class Logout extends Component {

    constructor(props) {
        super(props);
        this.state = {
            flag : false
        };
    }

    componentDidMount = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      this.setState({
        flag : true
      })
    }

    render() {
        let { flag } = this.state;
        if(flag){
          return <Redirect to='/login'  />
        }
        return (
            <div>
            </div>
        );
    }
}

export default Logout;
