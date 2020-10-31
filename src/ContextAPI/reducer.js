export const initState = {
    user: null
}


export const reducer = (state, action) => {
    switch(action.type) {
        case 'SET_USER':
            return {
                ...state,
                user: action.payload
            }
        
        default:
            return state
    }
}
