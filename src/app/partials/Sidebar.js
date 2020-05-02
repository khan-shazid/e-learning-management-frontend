import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { toggle } from '../actions/sidebar';

class Sidebar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            activeTab: window.location.pathname,
            parentTab: '',
            role: '',
            name: ''
        };
    }

    componentDidMount = () =>{
      let role = localStorage.getItem('role');
      let name = localStorage.getItem('name');
      this.setState({
        role,
        name
      })
      console.log("route",this.state.activeTab)
    }

    render() {
        let { role, name } = this.state;
        return (
          <nav id="sidebar">
              <div className="sidebar-header">
                  <h3>E-Learning</h3>
              </div>

              <ul className="list-unstyled components">
                  <p>{name}</p>
                  {
                    role=='admin' &&
                    <li className={ (this.state.activeTab === '/course') ? 'active' : '' }>
                          <Link to='/course'
                                onClick={ (e) => {
                                    this.setState({
                                        activeTab: '/course'
                                    });
                                } }>
                              Course
                          </Link>
                    </li>
                  }
                  {
                    role=='admin' &&
                    <li className={ (this.state.activeTab.includes('/lesson')) ? 'active' : '' }>
                      <Link to='/lesson'
                            onClick={ (e) => {
                                this.setState({
                                    activeTab: '/lesson'
                                });
                            } }>
                          Lesson
                      </Link>
                    </li>
                  }
                  <li className={ (this.state.activeTab === '/' || this.state.activeTab.includes('/exam')) ? 'active' : '' }>
                    <Link to='/exam'
                          onClick={ (e) => {
                              this.setState({
                                  activeTab: '/exam'
                              });
                          } }>
                        Exam
                    </Link>
                  </li>
                  <li className={ (this.state.activeTab.includes('/previous-exams')) ? 'active' : '' }>
                    <Link to='/previous-exams'
                          onClick={ (e) => {
                              this.setState({
                                  activeTab: '/previous-exams'
                              });
                          } }>
                        Previous Exams
                    </Link>
                  </li>
                  <li>
                    <Link to='/logout'>
                        Logout
                    </Link>
                  </li>
              </ul>
          </nav>
        );
    }
}

Sidebar.propTypes = {
    toggle: PropTypes.func.isRequired,
    isCollapsed: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
    isCollapsed: state.sidebar.isCollapsed
});

export default connect(mapStateToProps, {toggle})(Sidebar);
