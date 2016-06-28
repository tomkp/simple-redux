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

const loggerMiddleware = ({getState}) => {
    return (next) => (action) => {
        if (typeof action === 'function') {
            console.log(`logger - dispatching thunk`);
        } else {
            console.log(`logger - dispatching standard action: ${JSON.stringify(action)}`);
        }
        let returnValue = next(action);
        console.log(`logger - new state: ${JSON.stringify(getState())}`);
        return returnValue;
    };
};

const thunkMiddleware = store => next => action =>
    typeof action === 'function' ?
        action(store.dispatch, store.getState) :
        next(action);


const store = createStore(
    reducer,
    initialState,
    applyMiddleware(loggerMiddleware, thunkMiddleware)
);

const render = () => console.log(`render state: ${JSON.stringify(store.getState())}`);

render();
store.subscribe(render);


const increment = {type: 'INCREMENT'};
const decrement = {type: 'DECREMENT'};
const asyncDecrement = (dispatch, getState) => {
    setTimeout(() => {
        dispatch({ type: 'DECREMENT' })
    }, 1000)
};

store.dispatch(asyncDecrement);
store.dispatch(increment);
store.dispatch(increment);
store.dispatch(decrement);



