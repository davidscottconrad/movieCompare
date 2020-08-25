const debounce = (func, setDelay = 1000) => {
    let timeoutId;
    return (...args) => {
        if(timeoutId){
            clearTimeout(timeoutId);
        }
        timeoutID = setTimeout(() => {
            func.apply(null, args);
        }, setDelay);
    };
};