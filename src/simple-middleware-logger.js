const {createStore, applyMiddleware} = require('redux');

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

const logger = ({getState}) => {
    return (next) => (action) => {
        console.log(`logger - dispatching: ${JSON.stringify(action)}`);
        let returnValue = next(action);
        console.log(`logger - new state: ${JSON.stringify(getState())}`);
        return returnValue;
    };
};

const store = createStore(
    reducer,
    initialState,
    applyMiddleware(logger)
);

const render = () => {
    console.log(`render state: ${JSON.stringify(store.getState())}`)
};

render();
store.subscribe(render);

store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
store.dispatch({type: 'INCREMENT'});

