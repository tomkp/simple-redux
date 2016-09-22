const {createStore} = require('redux');

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [...state, action.payload];
        case 'REMOVE':{
            const index = state.indexOf(action.payload);
            return [...state.slice(0, index), ...state.slice(index + 1)];
        }

        default:
            return state
    }
};

const store = createStore(reducer, []);

const render = () => console.log(`render state: ${JSON.stringify(store.getState())}`);

render();
store.subscribe(render);

store.dispatch({type: 'ADD', payload: 'a'});
store.dispatch({type: 'ADD', payload: 'b'});
store.dispatch({type: 'REMOVE', payload: 'a'});
store.dispatch({type: 'ADD', payload: 'c'});
setTimeout(() => {
    store.dispatch({type: 'REMOVE', payload: 'c'});
}, 2000);

