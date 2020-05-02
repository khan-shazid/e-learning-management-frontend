import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";

import Http from '../../services/Http';
import Title from '../../partials/Title';
import { toastSuccess,toastError } from '../../commonComponents/Toast';
import {ButtonWithLoader as BWL} from './components/ButtonWithLoader';
import CreateLessonComponent from './components/CreateLessonComponent';

import { columns,fixedHeaders, LOADER_STYLE, DIMEN } from '../../constants';

class ManageLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
          role : localStorage.getItem('role'),
          courseList : [],
          lessonList : [],
          loading : false,
          selectedCourseForLesson : '',
          selectedCourse : '',
          selectedLesson : '',
          questionText : '',
          options : [
            "","","",""
          ],
          mark : undefined,
          questionTextError : '',
          selectedCourseError : '',
          selectedLessonError : '',
          optionsError : [
            '','','',''
          ],
          loading : false
        };
    }

    componentDidMount = () => {
      // const token = JSON.parse(localStorage.getItem('role'));

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

    onChange=(e)=>{
      this.setState({
        [e.target.name]:e.target.value
      })
      if(e.target.name=='selectedCourse' && e.target.value){
        this.fetchLessons(e.target.value);
      }
    }

    onOptionChange = (e,i) => {
      let { options } = this.state;
      options[i] = e.target.value;
      this.setState({options})
    }

    mark = (mark) => {
      this.setState({
        mark
      })
    }

    fetchLessons = (courseId) => {
      Http.GET('lessonByCourse',courseId)
          .then(({data}) => {
            console.log('lessonList SUCCESS: ', data);

            if(data.success){
              this.setState({
                lessonList : data.data
              })
            }else{
              toastError("Request wasn't successsful.");
            }
          })
          .catch(response => {
              console.log('lessonList ERROR: ', JSON.stringify(response));
              toastError("Something went wrong! Please try again.");
          });
    }

    submit = async() => {
      let { selectedCourse, selectedLesson, options, questionText, mark, optionsError } = this.state;
      if(this.validate()){
        this.setState({loading:true})
        let body = {
          lesson_id : selectedLesson,
          data : {
            question_text : questionText,
            options : options,
            answer : mark
          }
        };
        await Http.POST('question',body)
          .then(({data}) => {
            this.setState({
              loading:false
            })
            if(data.success){
            console.log('question SUCCESS: ', JSON.stringify(data));
              toastSuccess(data.message);
              this.setState({
                options : ['','','',''],
                mark : undefined
              })
            }else{
              toastError(data.message);
            }

          })
          .catch(response => {
              this.setState({
                loading:false
              })
              console.log('question Error: ', JSON.stringify(response));
              toastError("Something went wrong! Please try again.");
          });
      }
    }

    validate = () => {
      let { selectedCourse, selectedLesson, options, questionText, mark, optionsError } = this.state;
      let flag = true;
      if(selectedCourse==''){
        flag = false;
        this.setState({
          selectedCourseError : 'Required'
        })
      }else{
        this.setState({
          selectedCourseError : ''
        })
      }
      if(selectedLesson==''){
        flag = false;
        this.setState({
          selectedLessonError : 'Required'
        })
      }else{
        this.setState({
          selectedLessonError : ''
        })
      }
      if(questionText==''){
        flag = false;
        this.setState({
          questionTextError : 'Required'
        })
      }else{
        this.setState({
          questionTextError : ''
        })
      }
      options.map((item,i)=>{
        if(item){
          optionsError[i]='';
        }else{
          flag = false;
          optionsError[i]='Required';
        }
      })
      this.setState({
        optionsError
      })
      if(mark==undefined){
        flag=false;
        toastError("Please mark an option as answer");
      }
      return flag;
    }

    render() {
        let { courseList, selectedCourse, selectedLesson, selectedCourseForLesson, options, lessonList, questionText, mark, optionsError, selectedCourseError, selectedLessonError, questionTextError, loading, role } = this.state;
        if(role!='admin'){
            return <Redirect to='/'  />
        }
        return (
            <div>
                <Title value="Add Lesson"/>
                <CreateLessonComponent courseList={courseList} />
                <hr/>
                <Title value="Add Question Panel"/>
                <div className="question-panel" style={{padding:20,background:'#c7c7ba'}}>
                  <label htmlFor="exampleInputEmail1">Select Course</label>
                  <select className="browser-default custom-select" name="selectedCourse" value={selectedCourse} onChange={this.onChange}>
                    <option value="">Select Course</option>
                    {
                      courseList.map((item,i)=>
                        (<option key={i} value={item.id}>{item.title}</option>)
                      )
                    }
                  </select>
                  {
                    selectedCourseError ? <span style={{color:'red'}}>{selectedCourseError}</span> : ''
                  }
                  <br/>
                  <br/>
                  <label htmlFor="exampleInputEmail1">Select Lesson</label>
                  <select className="browser-default custom-select" name="selectedLesson" value={selectedLesson} onChange={this.onChange}>
                    <option value="">Select Course</option>
                    {
                      lessonList.map((item,i)=>
                        (<option key={i} value={item.id}>{item.title}</option>)
                      )
                    }
                  </select>
                  {
                    selectedLessonError ? <span style={{color:'red'}}>{selectedLessonError}</span> : ''
                  }
                  <br/>
                  <br/>
                  <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Question Text</label>
                    <input type="text" className="form-control" name="questionText" value={questionText} onChange={this.onChange} placeholder="Enter Question Text"/>
                    {
                      questionTextError ? <span style={{color:'red'}}>{questionTextError}</span> : ''
                    }
                  </div>
                  <div className="options" style={{padding:20,background:'white',marginBottom:20}}>
                  {
                    options.map((item,i)=>{
                      return(
                        <div className="form-group" key={i}>
                          <label>Option {i+1}</label>
                          <div className="row">
                            <div className="col-md-8">
                              <input type="text" className="form-control" value={item} name="option" onChange={(e) => this.onOptionChange(e,i)} placeholder="Enter Question Text"/>
                              {
                                optionsError[i] ? <span style={{color:'red'}}>{optionsError[i]}</span> : ''
                              }
                            </div>
                            <div className="col-md-4">
                              <button className={"btn btn-"+(mark==i ? 'success':'warning')} onClick={()=>this.mark(i)}>{mark==i ? 'Marked' : 'Mark as answer'}</button>
                            </div>
                          </div>
                        </div>
                      )
                    })
                  }
                  </div>
                  <BWL
                    title="Submit"
                    loader={loading}
                    buttonStyle="primary"
                    loaderStyle={LOADER_STYLE}
                    dimen={DIMEN}
                    onClick={this.submit} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = store => {
	return {
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
		},
		dispatch
	);
};

// export default ResourceList;
export default connect(mapStateToProps, mapDispatchToProps)(ManageLesson);
