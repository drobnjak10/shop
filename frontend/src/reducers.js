export const userReducer = (state, action) => {
    switch(action.type) {
        case 'USER_LOGIN':
            const user = action.payload
            return {
                ...state, user: user
            }
        case 'USER_INFO':
            const userInfo = action.payload;
            return {
                ...state, user: userInfo
            }
        default:
            return state;
    }
}

export const productReducer = (state = { loading: true, product: {}, error: false }, action) => {
    switch(action.type) {
        case 'ADD_NEW_PRODUCT':
            const product = action.payload;
            return {
                loading: false, product: action.payload
            };
        case 'ADD_PRODUCT_FAIL':
            return {
                loading: false, error: action.payload
            };
        case 'GET_PRODUCTS':
            return {
                products: action.payload, loading: false
            }
        case 'REMOVE_ITEM':
            return {
                message: action.payload
            }
        default:
            return state;
    }
}

export const cartReducer = (state, action) => {
    switch(action.type) {
        case "CART_ADD_ITEM":
            const item = action.payload;
            const existItem = state.cart.find(x => x.productId === item.productId);
            if (existItem) {
                return {
                    ...state,
                    cart: state.cart.map(x => x.productId === existItem.productId ? item : x)
                }
            } else {
                return { ...state, cart: [...state.cart, item] };
            }
        case "CART_REMOVE_ITEM":
            return {
                ...state,
                cart: state.cart.filter(item => item.productId !== action.payload)
            };
        case "SAVE_SHIPPING_ADDRESS":
            return {
                ...state,
                shippingAddress: action.payload
            };
        case "SAVE_PAYMENT_METHOD":
            return {
                ...state,
                paymentMethod: action.payload
            };
        case "CREATE_ORDER": {
            return {
                ...state, message: action.payload
            }
        }
        case "CART_RESET_ALL":
            return { cart: [], paymentMethod: null, shippingAddress: {} };
        default:
            return state;
    }
}