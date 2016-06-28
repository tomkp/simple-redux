const {createStore, applyMiddleware} = require('redux');
const thunkMiddleware = require('redux-thunk').default;
const multiMiddleware = require('redux-multi').default;
const effectsMiddleware = require('redux-effects').default;
const fetchMiddleware = require('redux-effects-fetch').default;
const {bind} = require('redux-effects');
const {fetch} = require('redux-effects-fetch');
const {createAction} = require('redux-actions');
const loggerMiddleware = require('./logger-middleware');

const started = createAction('STARTED');
const succeeded = createAction('SUCCEEDED');
const failed = createAction('FAILED');
const fetchStockQuote = ({symbol}) => [
    started(),
    bind(fetch(`http://query.yahooapis.com/v1/public/yql?q=select+*+from+yahoo.finance.quotes+where+symbol+in+("${symbol}")&format=json&env=store:%2F%2Fdatatables.org%2Falltableswithkeys`),
        (x) => succeeded(x),
        (value) => failed(value)
    )
];

const reducer = (state = {}, action) => {
    switch (action.type) {
        case 'STARTED':
            return Object.assign({}, state, {
                status: action.type
            });
        case 'SUCCEEDED':
            return Object.assign({}, state, {
                status: action.type,
                askPrice: action.payload.value.query.results.quote.Ask
            });
        case 'FAILED':
            return Object.assign({}, state, {
                status: action.type,
                message: action.payload.message
            });
        default:
            return state;
    }
};

const store = createStore(reducer, applyMiddleware(loggerMiddleware, thunkMiddleware, multiMiddleware, effectsMiddleware, fetchMiddleware));

const render = () => console.log(`\t\trender state: ${JSON.stringify(store.getState())}`);

store.subscribe(render);
store.dispatch(fetchStockQuote({symbol: 'TSCO.L'}));

