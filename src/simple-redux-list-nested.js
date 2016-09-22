const {createStore} = require('redux');
const update = require('react-addons-update');


const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ORDER': {
            return update(state, {orders: {$push: [action.payload]}})
        }
        case 'REMOVE_ORDER':{
            const index = state.orders.indexOf(action.payload);
            return update(state, {orders: {$splice: [[index, 1]]}})
        }
        default:
            return state
    }
};

const store = createStore(reducer, {orders: [], items: []});

const render = () => console.log(`render state: ${JSON.stringify(store.getState())}`);

render();
store.subscribe(render);

store.dispatch({type: 'ADD_ORDER', payload: 'a'});
store.dispatch({type: 'ADD_ORDER', payload: 'b'});
store.dispatch({type: 'REMOVE_ORDER', payload: 'a'});
store.dispatch({type: 'ADD_ORDER', payload: 'c'});
setTimeout(() => {
    store.dispatch({type: 'REMOVE_ORDER', payload: 'c'});
}, 2000);

