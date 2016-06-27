const {createStore, applyMiddleware} = require('redux');

const thunkMiddleware = require('redux-thunk').default;
const effectsMiddleware = require('redux-effects').default;
const multiMiddleware = require('redux-multi').default;
const fetchMiddleware = require('redux-effects-fetch').default;

const {bind} = require('redux-effects');
const {fetch} = require('redux-effects-fetch');

const chalk = require('chalk');

const {createAction} = require('redux-actions');

const started = createAction('STARTED');
const succeeded = createAction('SUCCEEDED');
const failed = createAction('FAILED');

const search = ({query}) => [
    started(),
    bind(fetch(`https://www.google.co.uk/?q=${query}`),
        ({statusCode}) => succeeded(value),
        (value) => failed(value)
    )
];

const reducer = (state = {}, action) => {
    //console.log(`reduce ${JSON.stringify(action)}`)
    switch (action.type) {

        case 'STARTED':
            return Object.assign({}, state, {
                status: action.type
            });
        
        case 'SUCCEEDED':
            return Object.assign({}, state, {
                status: action.type
            });

        case 'FAILED':
            return Object.assign({}, state, {
                status: action.type
            });
        default:
            return state;
    }
};


const loggerMiddleware = ({getState}) => {
    return (next) => (action) => {
        console.log(`${chalk.red.bold('dispatching')} ${JSON.stringify(action)}`);
        console.log(`\t${chalk.blue.bold('prev state')} ${JSON.stringify(getState())}`);
        let returnValue = next(action);
        console.log(`\t${chalk.green.bold('next state')} ${JSON.stringify(getState())}`);
        return returnValue;
    };
};


const store = createStore(reducer,
    applyMiddleware(
        loggerMiddleware,
        thunkMiddleware, multiMiddleware, effectsMiddleware, fetchMiddleware
    )
);

const render = () => {
    console.log(`\t\t${chalk.inverse('render state')} ${JSON.stringify(store.getState())}`);
};

render();
store.subscribe(render);


store.dispatch(search({query: 'humans'}));


setTimeout(() => {}, 10000);

