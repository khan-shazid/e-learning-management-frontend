import axios from 'axios';

const headers = {'Content-Type': 'application/json', 'Accept': 'application/json'};

const BASE_URL = "http://localhost:8000/api/";

const routes = {
  login: `${BASE_URL}login`,
  register: `${BASE_URL}register`,
  course: `${BASE_URL}course`,
  question: `${BASE_URL}question`,
  lesson: `${BASE_URL}lesson`,
  lessonByCourse: `${BASE_URL}lesson-by-course/`,
  lessonDetails: `${BASE_URL}lesson-details/`,
  lessonDetailsForExam: `${BASE_URL}lesson-details-exam/`,
  exam: `${BASE_URL}exam`,
  previousExams: `${BASE_URL}previous-exams`
};

// Axios request interceptor
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    config.headers.Authorization =  token ? token : '';
    // console.log("config from request",config)
    return config;
  });

// Axios response interceptor
axios.interceptors.response.use((response) => {
    if (response.config.url.includes('logout')) {
        delete axios.defaults.headers.common['Authorization'];
    }
    return response;
}, (error) => {
    if (401 === error.response.status && localStorage.getItem('token')) {
        setTimeout(() => {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            localStorage.removeItem('name');
            delete axios.defaults.headers.common['Authorization'];
            // store.dispatch({
            //     type: REDIRECT_TO,
            //     payload: {
            //         link: '/login'
            //     }
            // });
        }, 10);
    }
    return Promise.reject(error);
});

const encodeQueryData = data => {
    let ret = [], temp;
    for (let i in data) {
        temp = data[i];
        if (temp !== '' && temp !== null) {
            ret.push(encodeURIComponent(i) + '=' + encodeURIComponent(temp));
        }
    }
    return ret.length ? '?' + ret.join('&') : '';
};

const updateTokenInHeader = async () => {
    // return ;
    let token = await localStorage.getItem('token');
    console.log("token",token);
    if(token){
      // axios.defaults.headers.common['Authorization'] = token;
    }

    // const token = {
    //     local: JSON.parse(localStorage.getItem('token')),
    //     header: axios.defaults.headers.common['Authorization']
    // };
    // if (token.local && (!token.header || token.local !== token.header)) {
    //     axios.defaults.headers.common['Authorization'] = token.local;
    // }
};

const Http = {
    GET: (key, params = '') => {
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios.get(routes[key] + params, headers);
    },
    GET_WITH_ID_PARAM: (key, params = '', id = '') => {
        // updateTokenInHeader();
        console.log("id",id)
        console.log("params",params)
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios.get(routes[key] + id + params, headers);
    },
    POST: (key, params, id = '') => {
        // if(key!=='signup' || key!=='login'){
          // console.log("token header called",key);
        // updateTokenInHeader();
        // }
        // console.log("from post",routes[key] + id, params)
        return axios.post(routes[key] + id, params, headers);
    },
    PUT: (key, params) => {
        // updateTokenInHeader();
        return axios.put(routes[key], params, headers);
    },
    UPLOAD: (key, {name, file}) => {
        // updateTokenInHeader();
        const formData = new FormData();
        formData.append(name, file);

        return axios.post(routes[key], formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
    },
    DOWNLOAD: (key, params = '') => { // Only GET is supported
        // updateTokenInHeader();
        params = typeof params === 'object' ? encodeQueryData(params) : params;
        return axios(routes[key] + params, {
            method: 'GET',
            responseType: 'blob', // Force to receive data in a Blob Format
            header: JSON.parse(localStorage.getItem('token'))
        });
    }
};

export default Http;
