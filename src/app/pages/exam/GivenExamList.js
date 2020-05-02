import React, { Component } from 'react';

import Http from '../../services/Http';
import Title from '../../partials/Title';
import { toastSuccess,toastError } from '../../commonComponents/Toast';

import { columns, fixedHeaders, BASE_URL, LOADER_STYLE, DIMEN } from '../../constants';

class GiveExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : []
        };
    }

    componentDidMount = () => {
      this.fetchExamsList()
    }

    fetchExamsList = async() => {
      Http.GET('course')
          .then(({data}) => {
            console.log('courseList SUCCESS: ', data);

            if(data.success){
              this.setState({
                courseList : data.data
              })
            }else{
              toastError("Request wasn't successsful.");
            }
          })
          .catch(response => {
              console.log('courseList ERROR: ', JSON.stringify(response));
              toastError("Something went wrong! Please try again.");
          });
    }

    render() {
      const { data } = this.state;
        return (
            <>
              <Title value="Given Exam List"/>

            </>
        );
    }
}

export default GiveExam;
