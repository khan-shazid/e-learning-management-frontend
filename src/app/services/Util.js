import $ from 'jquery';

const capitalizeFirstLetter = str => str.replace(/\w\S*/g, txt => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase());

const replaceSpace = str => str.split(' ').join('_');

const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const isTokenExpired = (token) => {
    let base64Url = token.split('.')[1];
    if (base64Url === undefined)
        return true;

    console.log('base64Url: ', base64Url);

    let base64 = base64Url.replace('-', '+');
    if (base64 === undefined)
        return true;

    base64 = base64.replace('_', '/');
    if (base64 === undefined)
        return true;

    let json = JSON.parse(window.atob(base64));
    if (json === undefined)
        return true;

    let exp = JSON.parse(window.atob(base64)).exp;
    if (exp === undefined)
        return true;

    exp *= 1000;

    return exp <= new Date().getTime();
};

function convertMmDdYyyyFormat(dateString) {
    if (!dateString)
        return '';
    var parts = dateString.split('/');
    if (parts.length === 1) {
        parts = dateString.split('-');
        var tt = parts[2].split(',');
        dateString = tt[0] + '/' + parts[1] + '/' + parts[0] + ',' + tt[1];
    }
    else {
        dateString = parts[1] + '/' + parts[0] + '/' + parts[2];
    }

    //console.log(dateString);

    return dateString;
}

const getDateTimeFormat = function (val) {
    if (!val)
        return;
    // console.log(val);
    var dt = convertMmDdYyyyFormat(new Date(parseInt(val)).toLocaleString());
    return dt;
};

const getDeviceID = () => {
    const deviceId = JSON.parse(localStorage.getItem('device_id'));
    if (deviceId) {
        return deviceId;
    }

    const nAgt = navigator.userAgent;
    let browserName = navigator.appName;
    let nameOffset, verOffset;

    // In Opera 15+, the true version is after "OPR/"
    if (nAgt.indexOf('OPR/') !== -1) {
        browserName = 'Opera';
    }
    // In older Opera, the true version is after "Opera" or after "Version"
    else if (nAgt.indexOf('Opera') !== -1) {
        browserName = 'Opera';
    }
    // In MSIE, the true version is after "MSIE" in userAgent
    else if (nAgt.indexOf('MSIE') !== -1) {
        browserName = 'InternetExplorer';
    }
    // In Chrome, the true version is after "Chrome"
    else if (nAgt.indexOf('Chrome') !== -1) {
        browserName = 'Chrome';
    }
    // In Safari, the true version is after "Safari" or after "Version"
    else if (nAgt.indexOf('Safari') !== -1) {
        browserName = 'Safari';
    }
    // In Firefox, the true version is after "Firefox"
    else if (nAgt.indexOf('Firefox') !== -1) {
        browserName = 'Firefox';
    }
    // In most other browsers, "name/version" is at the end of userAgent
    else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) < (verOffset = nAgt.lastIndexOf('/'))) {
        browserName = nAgt.substring(nameOffset, verOffset);
        if (browserName.toLowerCase() === browserName.toUpperCase()) {
            browserName = navigator.appName;
        }
    }

    const guid = `browser-${browserName.toLowerCase()}-${navigator.mimeTypes.length}_${nAgt.replace(/\D+/g, '')}_${navigator.plugins.length}_${$(window).height() || ''}_${$(window).width() || ''}`;
    console.log('Util.getDeviceID(): ', guid);
    localStorage.setItem('device_id', JSON.stringify(guid));
    return guid;
};

const getDateFromMillis = (millis) => {

    let date = new Date(millis);
    return (date.getDate() < 10 ? '0' : '') + date.getDate() + '-' + months[date.getMonth()] + '-' + date.getFullYear();
};

const getDateWithHourFromMillis = (millis) => {

    let d = new Date(millis);
    return ('0' + d.getDate()).slice(-2) + '-' + ('0' + (d.getMonth() + 1)).slice(-2) + '-' +
        d.getFullYear() + ' ' + ('0' + d.getHours()).slice(-2) + ':' + ('0' + d.getMinutes()).slice(-2);
};

const doCommaSeparationWithIntegers = (amount) => {

    if (amount === null || amount === undefined)
        return '-';

    amount = amount.toString();

    if (amount.length <= 3) {
        return amount;
    }

    let formattedAmount = '';

    for (let i = amount.length - 1, p = 0; i >= 0; i--, p++) {
        if (p >= 3 && (p - 3) % 2 === 0)
            formattedAmount = ','.concat(formattedAmount);
        formattedAmount = amount[i].concat(formattedAmount);
    }

    console.log('formattedAmount: ', formattedAmount);
    return formattedAmount;
};

const convertToISODate = (dateObj) => {
    console.log('convert function, dateObj: ' + dateObj + 'full year: ' + dateObj.getFullYear() + ' month: ' + dateObj.getMonth()
        + ' day: ' + dateObj.getDate());
    let date = dateObj.getFullYear();
    date += '-';
    if (dateObj.getMonth() < 9)
        date += '0' + (dateObj.getMonth() + 1) + '-';
    else
        date += (dateObj.getMonth() + 1) + '-';
    if (dateObj.getDate() < 10)
        date += '0';
    date += dateObj.getDate();
    return date;
};

const getOneWeekAgoMillis = () => {
    let start = new Date();
    start.setHours(0, 0, 0, 0);
    return start.getTime() - 7 * 24 * 60 * 60 * 1000;
};

/**
 * Shuffles array in place. ES6 version
 * @param {Array} a items An array containing the items.
 */
const shuffle = a => {
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
};

const convertToSelectOptions = obj => {
    let array = [];
    for (let i in obj) {
        array.push({value: parseInt(i, 10), label: obj[i]});
    }
    return array;
};

const doCommaSeparationWithDecimals = (amount) => {
    if (amount === null || amount === undefined)
        return '-';

    amount = amount.toString();
    let minusFound = false;
    if (amount.startsWith('-')) {
        minusFound = true;
        amount = amount.substr(1);
    }
    amount = parseFloat(amount).toFixed(2);

    let lastIndex = amount.lastIndexOf('.');
    let formattedAmount = amount.substring(lastIndex);

    for (let i = lastIndex - 1, p = 0; i >= 0; i--, p++) {
        if (p >= 3 && (p - 3) % 2 === 0)
            formattedAmount = ','.concat(formattedAmount);
        formattedAmount = amount[i].concat(formattedAmount);
    }

    if (minusFound)
        formattedAmount = '-' + formattedAmount;
    return formattedAmount;
};

const convertToDateFromMiliSeconds = (input) => {
    return new Date(input).toLocaleDateString('en-GB');
};

const convertToDateTimeFromMiliSeconds = (input) => {
    return new Date(input).toLocaleString('en-GB');
};

const validate = (e, pass = '') => {
  if(e.target.name == 'email'){
    let re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if(!re.test(e.target.value)){
      return {
        name: 'emailError',
        value: 'Invalid Email Format!'
      }
    }else{
      return {
        name: 'emailError',
        value: ''
      }
    }
  }
  if(e.target.name == 'password'){
    // if(e.target.value.length<6){
    if(e.target.value.length<0){
      return {
        name: 'passwordError',
        // value: 'Password must be 6 digit!'
        value: 'Password must not be null!'
      }
    }else{
      return {
        name: 'passwordError',
        value: ''
      }
    }
  }
  if(e.target.name == 'passwordRe'){
    if(e.target.value != pass){
      return {
        name: 'passwordReError',
        value: 'Passwords didn\'t match!'
      }
    }else{
      return {
        name: 'passwordReError',
        value: ''
      }
    }
  }
}

export {
    capitalizeFirstLetter, replaceSpace, getDeviceID, shuffle, convertToDateTimeFromMiliSeconds, convertToDateFromMiliSeconds,
    convertToSelectOptions, isTokenExpired, convertToISODate, getOneWeekAgoMillis,
    getDateFromMillis, doCommaSeparationWithDecimals, doCommaSeparationWithIntegers, getDateWithHourFromMillis, validate
};
