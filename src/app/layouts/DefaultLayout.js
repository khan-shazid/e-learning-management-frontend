import React from 'react';

import Sidebar from '../partials/Sidebar';

const DefaultLayout = ({children, ...rest}) => {
    return (
        <div className="wrapper">
            <Sidebar/>

            <div id="content">


                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">

                        <button type="button" id="sidebarCollapse" className="btn btn-info">
                            <i className="fas fa-align-left"></i>
                            <span>Toggle Sidebar</span>
                        </button>
                    </div>
                </nav>
                { children }
            </div>
        </div>
    );
};

export default DefaultLayout;
