export default store => next => action => {
    console.log('Logger: ', action);
    next(action);
};
