const {createStore, applyMiddleware} = require('redux');
const thunk = require('redux-thunk').default;
const fetch = require('isomorphic-fetch');

const fetchRequest = () => {
    return {
        type: 'FETCH_REQUEST'
    }
};

const fetchSuccess = (body) => {
    return {
        type: 'FETCH_SUCCESS',
        body
    }
};

const fetchFailure = (ex) => {
    return {
        type: 'FETCH_FAILURE',
        ex
    }
};

const fetchQuote = (symbol) => {
    return dispatch => {
        dispatch(fetchRequest());
        return fetch(`http://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.quotes+where+symbol+in+("${symbol}")&format=json&env=store:%2F%2Fdatatables.org%2Falltableswithkeys`)
            .then(res => res.json())
            .then(json => dispatch(fetchSuccess(json)))
            .catch(ex => dispatch(fetchFailure(ex)))
    }
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_REQUEST':
            return Object.assign({}, state, {
                status: action.type
            });
        case 'FETCH_SUCCESS':
            return Object.assign({}, state, {
                status: action.type,
                quote: action.body.query.results.quote.Ask,
                error: undefined
            });
        case 'FETCH_FAILURE':
            return Object.assign({}, state, {
                status: action.type,
                quote: undefined,
                error: action.ex.message
            });
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(() => console.log(`render state: ${JSON.stringify(store.getState())}`));
store.dispatch(fetchQuote('TSCO.L'));
store.dispatch(fetchQuote('XXX&'));