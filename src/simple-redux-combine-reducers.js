const {createStore, combineReducers} = require('redux');

const orders = (state = [], action) => {
    console.log(`orderReducer`, state, action);
    switch (action.type) {
        case 'CREATE_ORDER':
            return [...state, {id: action.payload.id, value: action.payload.value}];
        case 'REMOVE_ORDER':
            return state.filter(order => action.payload.id !== order.id);
        case 'UPDATE_ORDER':{
            return state.map(order => {
                if (order.id === action.payload.id) {
                    return action.payload;
                }
                return order;
            });
        }
        default:
            return state
    }
};


const items = (state = [], action) => {
    console.log(`itemReducer`, state, action);
    switch (action.type) {
        case 'CREATE_ITEM':
            return [...state, {id: action.payload.id, order: action.payload.order, value: action.payload.value}];
        case 'REMOVE_ITEM':
            return state.filter(item => action.payload.id !== item.id);
        case 'REMOVE_ORDER':
            return state.filter(item => action.payload.id !== item.order);
        case 'UPDATE_ITEM':{
            return state.map(item => {
                if (item.id === action.payload.id) {
                    return action.payload;
                }
                return item;
            });
        }
        default:
            return state
    }
};


const reducers = combineReducers({
    orders,
    items
});


const store = createStore(reducers, {orders: [], items: []});

const render = () => console.log(`render state: ${JSON.stringify(store.getState())}`);

render();
store.subscribe(render);
//
store.dispatch({type: 'CREATE_ORDER', payload: {id: 'x', value: 'xx'}});
store.dispatch({type: 'CREATE_ORDER', payload: {id: 'y', value: 'yy'}});
store.dispatch({type: 'CREATE_ORDER', payload: {id: 'z', value: 'zz'}});
store.dispatch({type: 'REMOVE_ORDER', payload: {id: 'z'}});
store.dispatch({type: 'UPDATE_ORDER', payload: {id: 'y', value: 'yyy'}});
setTimeout(() => {
    store.dispatch({type: 'REMOVE_ORDER', payload: {id: 'x'}});
}, 1000);

store.dispatch({type: 'CREATE_ITEM', payload: {id: 'a', order: 'y', value: 'aa'}});
store.dispatch({type: 'UPDATE_ITEM', payload: {id: 'a', order: 'y', value: 'aaa'}});
store.dispatch({type: 'CREATE_ITEM', payload: {id: 'b', order: 'y', value: 'bb'}});

store.dispatch({type: 'REMOVE_ORDER', payload: {id: 'y'}});

