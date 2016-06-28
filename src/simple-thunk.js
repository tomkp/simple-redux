const {createStore, applyMiddleware} = require('redux');
const thunk = require('redux-thunk').default;

const reducer = (state, action) => {
    if (typeof state === 'undefined') {
        return 0
    }
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state
    }
};
const store = createStore(reducer, applyMiddleware(thunk));

const render = () => console.log(`render state: ${JSON.stringify(store.getState())}`);

render();
store.subscribe(render);

store.dispatch({ type: 'INCREMENT' });

store.dispatch((dispatch, getState) => {

    console.log(`state: ${JSON.stringify(getState())}`);

    dispatch({ type: 'INCREMENT' });
    dispatch({ type: 'INCREMENT' });
    dispatch({ type: 'INCREMENT' });
    setTimeout(() => {
        dispatch({ type: 'DECREMENT' })
    }, 1000)
});
