import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

import Title from '../../partials/Title';
import Loader from '../../commonComponents/Loader';
import { Alert } from '../../commonComponents/Alert';
import {ButtonWithLoader as BWL} from './components/ButtonWithLoader';

import { columns, fixedHeaders, BASE_URL, LOADER_STYLE } from '../../constants';

const rowEvents = {
  onClick: (e, row, rowIndex) => {
    console.log(`clicked on row with index: ${rowIndex}`);
  }
  // ,
  // onMouseEnter: (e, row, rowIndex) => {
  //   console.log(`enter on row with index: ${rowIndex}`);
  // }
};

class ManageCourse extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data:[]
        };
    }
    render() {
      const { loader, alert } = this.state;
      const dimen = 20;
        return (
            <div>
            </div>
        );
    }
}

export default ManageCourse;
