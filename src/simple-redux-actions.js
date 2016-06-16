const {createStore} = require('redux');
const {createAction} = require('redux-actions');

const increment = createAction('INCREMENT');
const decrement = createAction('DECREMENT');

const reducer = (state, action) => {
    console.log(`reducer ${JSON.stringify(action)}`);
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
};

const initialState = 7;

const store = createStore(reducer, initialState);

const render = () => {
    console.log(`render state: ${JSON.stringify(store.getState())}`)
};

render();
store.subscribe(render);

store.dispatch(increment());
store.dispatch(increment());
store.dispatch(decrement());
setTimeout(() => {
    store.dispatch(decrement());
}, 2000);

