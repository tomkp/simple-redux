/*
http://stackoverflow.com/questions/34930735/pros-cons-of-using-redux-saga-with-es6-generators-vs-redux-thunk-with-es7-async/34933395#34933395
http://jsbin.com/sodowa/edit?js,console
*/

const {
    createStore,
    combineReducers,
    applyMiddleware,
    bindActionCreators
} = require('redux');

const reduxSaga = require('redux-saga');
const effects = reduxSaga.effects;
const sagaMiddleware = reduxSaga.default();


let store = createStore(
    (state => state || {}),
    applyMiddleware(sagaMiddleware)
);

const countdown = (secs) => {
    console.log('countdown', secs);
    return reduxSaga.eventChannel(listener => {
            const iv = setInterval(() => {
                secs -= 1;
                console.log('countdown', secs);
                if(secs > 0)
                    listener(secs);
                else {
                    listener(reduxSaga.END);
                    clearInterval(iv);
                    console.log('countdown terminated')
                }
            }, 1000);
            return () => {
                clearInterval(iv);
                console.log('countdown cancelled')
            }
        }
    )
};

function* incrementAsync(value) {
    const chan = yield effects.call(countdown, value);
    try {
        while(true) {
            let seconds = yield effects.take(chan);
            yield effects.put({type: 'INCREMENT_ASYNC', value: seconds})
        }
    } finally {
        console.log(`incrementAsync terminating`);
        if(!(yield effects.cancelled())) {
            yield effects.put(action('INCREMENT'));
            yield effects.put(action('COUNTDOWN_TERMINATED'))
        }
        chan.close()
    }
}

function* watchIncrementAsync() {
    try {
        const action = yield effects.take('INCREMENT_ASYNC');
        yield effects.race([
            effects.call(incrementAsync, action.value),
            effects.take('CANCEL_INCREMENT_ASYNC')
        ])
    } finally {
        console.log(`watchIncrementAsync terminating`)
    }
}

sagaMiddleware.run(function*() {
    yield effects.fork(watchIncrementAsync);
    yield effects.put({type: 'INCREMENT_ASYNC', value: 5});
    yield reduxSaga.delay(3000);
    console.log(`Canceling`);
    yield effects.put({type: 'CANCEL_INCREMENT_ASYNC'})
});