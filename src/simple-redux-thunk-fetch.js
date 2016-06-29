const {createStore, applyMiddleware} = require('redux');
const thunk = require('redux-thunk').default;
const fetch = require('isomorphic-fetch');

const fetchTodosRequest = () => {
    return {
        type: 'FETCH_TODOS_REQUEST'
    }
};

const fetchTodosSuccess = (body) => {
    return {
        type: 'FETCH_TODOS_SUCCESS',
        body
    }
};

const fetchTodosFailure = (ex) => {
    return {
        type: 'FETCH_TODOS_FAILURE',
        ex
    }
};

const fetchTodos = (symbol) => {
    return dispatch => {
        dispatch(fetchTodosRequest());
        return fetch(`http://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.quotes+where+symbol+in+("${symbol}")&format=json&env=store:%2F%2Fdatatables.org%2Falltableswithkeys`)
            .then(res => res.json())
            .then(json => dispatch(fetchTodosSuccess(json.body)))
            .catch(ex => dispatch(fetchTodosFailure(ex)))
    }
};

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'FETCH_TODOS_REQUEST':
        case 'FETCH_TODOS_SUCCESS':
        case 'FETCH_TODOS_FAILURE': return Object.assign({}, state, {
            status: action.type
        });
        default: return state;
    }
};
const store = createStore(reducer, applyMiddleware(thunk));

store.subscribe(() => console.log(`render state: ${JSON.stringify(store.getState())}`));


store.dispatch(fetchTodos('TSCO.L'));