
const initialState = {
    uid: null,
    userType: null,
    teacher: {
        selectedGrade: '0',
        selectedSubject: '0',
        selectedTopic: '0'
    }
    
};

const reducer = (state = initialState, action) => {
    switch (action.type ) {
        case 'LOGIN':
            localStorage.setItem('uid',action.value.token );
            localStorage.setItem('userType',action.value.userType );
            return {
                ...state,
                uid: action.value.token,
                userType: action.value.userType
            }
        case 'CHECKLOCAL':
            const uid = localStorage.getItem('uid');
            if(uid) {
                const userType = localStorage.getItem('userType');
                return {
                    ...state,
                    uid: uid,
                    userType: userType
                }
            }
            else {
                return {
                    ...state,
                    uid: null,
                    userType: null
                }
            }
        case 'LOGOUT':
            localStorage.removeItem('uid');
            localStorage.removeItem('userType');
            return {
                uid: null,
                userType: null
            }
        case 'SET_GRADE_SUBJECT':
            return {
                ...state,
                teacher: {
                    ...state.teacher,
                    selectedGrade: action.value.grade,
                    selectedSubject: action.value.subject
                }
            }
        case 'SET_TOPIC':
            return {
                ...state,
                teacher: {
                    ...state.teacher,
                    selectedTopic: action.value.topic
                }
            }

        default:
            return state
    }
};

export default reducer;