const redux = require( 'redux' );
const reduxLogger = require( 'redux-logger' );

const createStore = redux.legacy_createStore;
const bindActionCreators = redux.bindActionCreators;
const combineReducers = redux.combineReducers;
const applyMiddleware = redux.applyMiddleware;
const logger = reduxLogger.createLogger();

const CAKE_ORDERED = 'CAKE_ORDERED';
const CAKE_RESTOCKED = 'CAKE_RESTOCKED';
const ICE_CREAM_ORDERED = 'ICE_CREAM_ORDERED';
const ICE_CREAM_RESTOCKED = 'ICE_CREAM_RESTOCKED';
const log = console.log;

function orderCake ( qty = 1 ) {
    return {
        type: CAKE_ORDERED,
        payload: qty
    };
}

function restockCake ( qty = 1 ) {
    return {
        type: CAKE_RESTOCKED,
        payload: qty
    };
}

function orderIceCream ( qty = 1 ) {
    return {
        type: ICE_CREAM_ORDERED,
        payload: qty
    };
}

function restockIceCream ( qty = 1 ) {
    return {
        type: ICE_CREAM_RESTOCKED,
        payload: qty
    };
}

// const initialState = {
//     numOfCakes: 10,
//     numOfIceCreams: 20
// };

const initialCakeState = {
    numOfCakes: 10
};

const initialIceCreamState = {
    numOfIceCreams: 20
};

const cakeReducer = ( state = initialCakeState, action ) => {
    switch ( action.type ) {
        case CAKE_ORDERED:
            return {
                ...state,
                numOfCakes: state.numOfCakes - action.payload
            };

        case CAKE_RESTOCKED:
            return {
                ...state,
                numOfCakes: state.numOfCakes + action.payload
            };

        default:
            return state;
    }
};

const iceCreamReducer = ( state = initialIceCreamState, action ) => {
    switch ( action.type ) {
        case ICE_CREAM_ORDERED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams - action.payload
            };

        case ICE_CREAM_RESTOCKED:
            return {
                ...state,
                numOfIceCreams: state.numOfIceCreams + action.payload
            };

        default:
            return state;
    }
};

const rootReducer = combineReducers( {
    cake: cakeReducer,
    iceCream: iceCreamReducer
} );
const store = createStore( rootReducer, applyMiddleware( logger ) );
log( 'Initial state: ', store.getState() );
const unsubscribe = store.subscribe( () => { } );
// store.dispatch( orderCake() );
// store.dispatch( orderCake( 2 ) );
// store.dispatch( orderCake( 3 ) );
// store.dispatch( restockCake( 6 ) );
const actions = bindActionCreators( { orderCake, restockCake, orderIceCream, restockIceCream }, store.dispatch );
actions.orderCake( 3 );
actions.restockCake( 9 );
actions.orderIceCream( 7 );
actions.restockIceCream( 2 );
unsubscribe();
