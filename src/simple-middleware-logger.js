const {createStore, applyMiddleware} = require('redux');
const chalk = require('chalk');

const initialState = 7;

const reducer = (state, action) => {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
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

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(loggerMiddleware)
);

const render = () => console.log(`render state: ${JSON.stringify(store.getState())}`);

render();
store.subscribe(render);

store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
store.dispatch({type: 'INCREMENT'});

