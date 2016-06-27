const {createStore, applyMiddleware, combineReducers} = require('redux');
const thunk = require('redux-thunk').default;
const effects = require('redux-effects').default;
const multi = require('redux-multi').default;
const {bind} = require('redux-effects');

const {createAction} = require('redux-actions');

const start = createAction('START');
const end = createAction('END');
const addData = createAction('ADD');
const editData = createAction('EDIT');
const removeData = createAction('REMOVE');

const add = (data) => [start('add'), addData(data), end('add')];
const edit = (data) => [start('edit'), editData(data), end('edit')];
const remove = (data) => [start('remove'), removeData(data), end('remove')];


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

const notifications = (state = '', action) => {
    switch (action.type) {
        case 'START':
            return `start ${action.payload}`;
        case 'END':
            return `end ${action.payload}`;
        default:
            return state
    }
};

const reducer = combineReducers({
    notifications,
    items
});

const store = createStore(reducer, applyMiddleware(effects, thunk, multi));

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

