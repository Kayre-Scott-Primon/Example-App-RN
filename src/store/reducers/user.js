const INITIAL_STATE=[{          
     email: 'oi',
     password: '',
     id: '',
     token: '',
}]

export default function reducer(state = INITIAL_STATE, action){
     console.log(action)
     if(action.type === 'UPDATE_USER'){
          return { ...state , email: action.email, password: action.password}
     }
     return state
}