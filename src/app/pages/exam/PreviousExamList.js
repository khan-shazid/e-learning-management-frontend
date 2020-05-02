import React, { Component } from 'react';

import Http from '../../services/Http';
import Title from '../../partials/Title';
import { toastSuccess,toastError } from '../../commonComponents/Toast';

import { columns, fixedHeaders, BASE_URL, LOADER_STYLE, DIMEN } from '../../constants';

class PreviousExamList extends Component {

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
      Http.GET('previousExams')
          .then(({data}) => {
            console.log('courseList SUCCESS: ', data);

            if(data.success){
              this.setState({
                data : data.data
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
              <Title value="Previous Exam List"/>
              <table className="table table-hover">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Exam Id</th>
                  <th scope="col">Course Title</th>
                  <th scope="col">Lesson Title</th>
                  <th scope="col">Mark Obtained</th>
                </tr>
              </thead>
              <tbody>
              {
                data.map((item,i) => {
                  return(
                    <tr key={i}>
                      <th scope="row">{item.id}</th>
                      <td>{item.course.title}</td>
                      <td>{item.lesson.title}</td>
                      <td>{item.mark_obtained}</td>
                    </tr>
                  )
                })
              }
              </tbody>
            </table>


            </>
        );
    }
}

export default PreviousExamList;
