const {createStore} = require('redux');

const add = (data) => {return {type: 'ADD', payload: { data: data}}};
const edit = (index, data) => {return {type: 'EDIT', payload: { data: data, index: index}}};
const remove = (index) => {return {type: 'REMOVE', payload: { index: index}}};

const reducer = (state, action) => {
    switch (action.type) {
        case 'ADD':
            return [
                ...state,
                action.payload.data
            ];
        case 'EDIT':
            return [
                ...state.slice(0, action.payload.index),
                action.payload.data,
                ...state.slice(action.payload.index + 1)
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

store.dispatch(add('TOM'));
store.dispatch(add('DICK'));
store.dispatch(add('HARRY'));
store.dispatch(edit(1, 'RICHARD'));
store.dispatch(remove(2));
store.dispatch(remove(0));


