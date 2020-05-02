import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

import Http from '../../services/Http';
import Title from '../../partials/Title';
import { toastSuccess,toastError } from '../../commonComponents/Toast';
import {ButtonWithLoader as BWL} from './components/ButtonWithLoader';

import { columns, fixedHeaders, BASE_URL, LOADER_STYLE, DIMEN } from '../../constants';

class GiveExam extends Component {

    constructor(props) {
        super(props);
        this.state = {
            data : [],
            title : '',
            loading : false,
            courseList : [],
            lessonList : [],
            selectedCourse : '',
            selectedLesson : '',
            data : [],
            answers : {}
        };
    }

    componentDidMount = () => {
      this.fetchCourse()
    }

    fetchCourse = async() => {
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
      if(e.target.name=='selectedLesson' && e.target.value){
        this.fetchLessonDetails(e.target.value);
      }
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

    fetchLessonDetails = (lessonId) => {
      Http.GET('lessonDetails',lessonId)
          .then(({data}) => {
            console.log('lessonList SUCCESS: ', data);

            if(data.success){
              this.setState({
                data : data.data
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

    onOptionSelect = (e,questionId)=>{
      let { answers } = this.state;
      answers[questionId] = e.target.value;
      this.setState({
        answers
      });
    }

    submit = () => {
      console.log("asnwers",this.state.answers)
    }

    render() {
      const { loading, courseList, lessonList, selectedCourse, selectedLesson, data } = this.state;
        return (
            <>
              <div className="all-details">
                <div className="row">
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Select Course</label>
                      <select className="browser-default custom-select" name="selectedCourse" value={selectedCourse} onChange={this.onChange}>
                        <option value="">Select Course</option>
                        {
                          courseList.map((item,i)=>
                            (<option key={i} value={item.id}>{item.title}</option>)
                          )
                        }
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="form-group">
                      <label htmlFor="exampleInputEmail1">Select Lesson</label>
                      <select className="browser-default custom-select" name="selectedLesson" value={selectedLesson} onChange={this.onChange}>
                        <option value="">Select Course</option>
                        {
                          lessonList.map((item,i)=>
                            (<option key={i} value={item.id}>{item.title}</option>)
                          )
                        }
                      </select>
                    </div>
                  </div>
                </div>
                {
                  data.map((item,i)=>{
                    let options = item.options.map((item2,j)=>{
                      return(
                        <div className="custom-control custom-radio" key={j+100}>
                          <input type="radio" className="custom-control-input" id={i+'_'+j} value={item2.id} onChange={(e)=>this.onOptionSelect(e,item.id)} name={'question_'+i}/>
                          <label className="custom-control-label" htmlFor={i+'_'+j}>{item2.text}</label>
                        </div>
                      )
                    })
                    return(
                      <div style={{background:'rgb(199, 199, 186)',margin:20,padding:20}} key={i}>
                        <h4>{item.text}</h4>
                        {options}
                      </div>
                    )

                  })
                }
                {data.length ? <button className="btn btn-primary" onClick={this.submit}>Save</button> : ''}
              </div>
            </>
        );
    }
}

export default GiveExam;
