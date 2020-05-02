import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import DefaultLayout from './layouts/DefaultLayout';

// import  {isTokenExpired} from "./services/Util";

import ManageCourse from './pages/course/ManageCourse';
import ManageLesson from './pages/lesson/ManageLesson';
import GiveExam from './pages/exam/GiveExam';
import GivenExamList from './pages/exam/GiveExam';
import Login from './pages/auth/Login';
import Logout from './pages/auth/Logout';
import Register from './pages/auth/Register';

// import Login from './components/Login';
// import Logout from './components/Logout';
// import RedirectTo from './components/RedirectTo';
// import NotFound from './components/NotFound';

const PrivateRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('token');
    return token ? (
        <Route { ...rest } render={ matchProps => (
            <DefaultLayout>
                <Component { ...matchProps } />
            </DefaultLayout>
        ) }/>
    ) : <Redirect to="/login"/>;
};


const PublicRoute = ({component: Component, ...rest}) => {
    const token = localStorage.getItem('token');
    return !token ? (
        <Route { ...rest } render={ matchProps => (
            <Component { ...matchProps } />
        ) }/>
    ) : <Redirect to="/"/>;
};

class Root extends Component {
    render() {
        // const token = JSON.parse(localStorage.getItem('token'));
        return (
            <Router>
                <Switch>
                  <PrivateRoute exact path="/course" component={ ManageCourse }/>
                  <PrivateRoute exact path="/lesson" component={ ManageLesson }/>
                  <PrivateRoute exact path="/exam" component={ GiveExam }/>
                  <PrivateRoute exact path="/previous-exams" component={ GivenExamList }/>
                  <PrivateRoute exact path="/logout" component={ Logout }/>
                  {/*<PublicRoute path="/resource-list/:resourceId" component={ EditResource }/>*/}
                  <PrivateRoute exact path="/" component={ GiveExam }/>
                  <PublicRoute exact path="/login" component={ Login }/>
                  <PublicRoute exact path="/register" component={ Register }/>
                </Switch>
            </Router>
        );
    }
}

export default Root;
