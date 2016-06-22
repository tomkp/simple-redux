const {createStore} = require('redux');

const add = (data) => {return {type: 'ADD', payload: { data: data}}};
const remove = (index) => {return {type: 'REMOVE', payload: { index: index}}};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                action.payload.data
            ];
        case 'REMOVE':
            return [
                ...state.slice(0, action.payload.index),
                ...state.slice(action.payload.index + 1)
            ];
        default:
            return state
    }
};

const initialState = [];

const store = createStore(reducer, initialState);

const render = () => {
    console.log(`render state: ${JSON.stringify(store.getState())}`)
};

render();
store.subscribe(render);

store.dispatch(add(3));
store.dispatch(add(5));
store.dispatch(add(7));
store.dispatch(remove(2));
store.dispatch(remove(0));

