import React, { Component } from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";




import { fetchResources } from "../../actions/resource";
import Loader from '../../commonComponents/Loader';
import { Alert } from '../../commonComponents/Alert';
import Title from '../../partials/Title';
import { columns,fixedHeaders, LOADER_STYLE } from '../../constants';

const rowEvents = props => {
  return {
    onClick: (e, row, rowIndex) => {
      console.log('clicked on row with index:',row.name);
      // const history = useHistory();
      // props.history.push('/resource-list/'+row.id)
    }
    // ,
    // onMouseEnter: (e, row, rowIndex) => {
    //   console.log(`enter on row with index: ${rowIndex}`);
    // }
  }
};

class ManageLesson extends Component {

    constructor(props) {
        super(props);
        this.state = {
        };
    }
    render() {
        return (
            <div>
                <Title value="Resource 1"/>
            </div>
        );
    }
}

const mapStateToProps = store => {
	return {
		resources: store.resources.resources
	};
};

const mapDispatchToProps = dispatch => {
	return bindActionCreators(
		{
			fetchResources
		},
		dispatch
	);
};

// export default ResourceList;
export default connect(mapStateToProps, mapDispatchToProps)(ManageLesson);
