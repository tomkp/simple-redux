const {createStore, applyMiddleware} = require('redux');
const thunk = require('redux-thunk').default;


const add = (data) => (dispatch, getState) => {
    setTimeout(() => {
        dispatch({type: 'ADD', payload: { data: data}})
    }, 1000)
};
const edit = (index, data) => (dispatch, getState) => {
    setTimeout(() => {
        dispatch({type: 'EDIT', payload: { data: data, index: index}})
    }, 1000)
};
const remove = (index) => (dispatch, getState) => {
    setTimeout(() => {
        dispatch({type: 'REMOVE', payload: { index: index}})
    }, 1000)
};


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

const store = createStore(reducer, initialState, applyMiddleware(thunk));

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


