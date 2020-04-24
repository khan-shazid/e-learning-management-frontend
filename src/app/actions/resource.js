import axios from "axios";

export const fetchResources = () => {
	return async dispatch => {
		dispatch({ type: "FECTH_LIST_PENDING" });
		let response = await axios.get("/api/resource");
		dispatch({ type: "FETCH_RESOURCES_RESOLVED", payload: response.data.data });
	};
};
