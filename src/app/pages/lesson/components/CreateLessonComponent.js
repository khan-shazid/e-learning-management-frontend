import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';

import {ButtonWithLoader as BWL} from './ButtonWithLoader';
import { columns,fixedHeaders, LOADER_STYLE, DIMEN } from '../../../constants';
import Http from '../../../services/Http';
import { toastSuccess,toastError } from '../../../commonComponents/Toast';

class CreateLessonComponent extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedCourse:'',
            title : '',
            loading : false
        };
    }

    onChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
    }

    submit = async() => {
      let { title, selectedCourse } = this.state;
      let body = {
        title : title,
        course_id : selectedCourse
      }
      this.setState({loading:true})

      await Http.POST('lesson',body)
        .then(({data}) => {
          this.setState({
            loading:false
          })
          if(data.success){
          console.log('lesson SUCCESS: ', JSON.stringify(data));
            toastSuccess(data.message);
            this.setState({
              title : '',
              selectedCourse : ''
            })
          }else{
            toastError(data.message);
          }

        })
        .catch(response => {
            this.setState({
              loading:false
            })
            console.log('lesson Error: ', JSON.stringify(response));
            toastError(response.message);
        });
    }

    render() {
        let { title, selectedCourse, loading } = this.state;
        return (
            <>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label for="exampleInputEmail1">Lesson Title</label>
                    <input type="email" className="form-control" name="title" onChange={this.onChange} value={title} placeholder="Enter Lesson Title"/>
                  </div>
                </div>
                <div className="col-md-6">
                  <label for="exampleInputEmail1">Parent Course</label>
                  <select className="browser-default custom-select" name="selectedCourse" value={selectedCourse} onChange={this.onChange}>
                    <option value="">Select Course</option>
                    {
                      this.props.courseList.map((item,i)=>
                        (<option key={i} value={item.id}>{item.title}</option>)
                      )
                    }
                  </select>
                </div>
              </div>
              <BWL
                title="Submit"
                loader={loading}
                buttonStyle="primary"
                loaderStyle={LOADER_STYLE}
                dimen={DIMEN}
                onClick={this.submit} />
            </>
        );
    }
}

export default CreateLessonComponent;
