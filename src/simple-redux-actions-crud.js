const {createStore, combineReducers} = require('redux');
const {createAction} = require('redux-actions');

const add = createAction('ADD');
const edit = createAction('EDIT');
const remove = createAction('REMOVE');

const items = (state = [], action) => {
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

const reducer = combineReducers({
    items
});

const store = createStore(reducer);

const render = () => {
    console.log(`render state: ${JSON.stringify(store.getState())}`)
};

render();
store.subscribe(render);

store.dispatch(add({data: 'TOM'}));
store.dispatch(add({data: 'DICK'}));
store.dispatch(add({data: 'HARRY'}));
store.dispatch(edit({index: 1, data: 'RICHARD'}));
store.dispatch(remove({index: 2}));
store.dispatch(remove({index: 0}));


