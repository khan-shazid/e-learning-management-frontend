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
            parentTab: ''
        };
    }

    componentDidMount = () =>{
      console.log("route",this.state.activeTab)
    }

    render() {
        return (
          <nav id="sidebar">
              <div className="sidebar-header">
                  <h3>E-Learning</h3>
              </div>

              <ul className="list-unstyled components">
                  <p>Obydul Islam Khan</p>
                  {/*<li className={ (this.state.activeTab === '/') ? 'active' : '' }>
                      <a href="#homeSubmenu" data-toggle="collapse" aria-expanded="false" className="dropdown-toggle">Home</a>
                      <ul className="collapse list-unstyled" id="homeSubmenu">
                          <li>
                              <a href="#">Home 1</a>
                          </li>
                          <li>
                              <a href="#">Home 2</a>
                          </li>
                          <li>
                              <a href="#">Home 3</a>
                          </li>
                      </ul>
                  </li>*/}
                  <li className={ (this.state.activeTab === '/' || this.state.activeTab === '/course') ? 'active' : '' }>
                        <Link to='/course'
                              onClick={ (e) => {
                                  this.setState({
                                      activeTab: '/course'
                                  });
                              } }>
                            Course
                        </Link>
                  </li>
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
                  <li>
                      <a href="#">Contact</a>
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
