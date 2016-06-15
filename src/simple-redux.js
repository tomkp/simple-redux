const {createStore} = require('redux');

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
const store = createStore(reducer);

const render = () => {
    console.log(`render state: ${JSON.stringify(store.getState())}`)
};

render();
store.subscribe(render);

store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'INCREMENT'});
store.dispatch({type: 'DECREMENT'});
store.dispatch({type: 'INCREMENT'});
setTimeout(() => {
    store.dispatch({type: 'DECREMENT'});
}, 2000);

