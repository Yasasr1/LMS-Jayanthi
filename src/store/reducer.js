
const initialState = {
    uid: null,
    userType: null
    
};

const reducer = (state = initialState, action) => {
    switch (action.type ) {
        case 'LOGIN':
            return {
                uid: action.value.token,
                userType: action.value.userType
            }

        default:
            return state
    }
};

export default reducer;