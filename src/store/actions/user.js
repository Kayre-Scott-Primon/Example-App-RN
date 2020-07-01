import { markActionsOffline } from 'redux-offline-queue'
import Reactotron from 'reactotron-react-native'


export default function updateUser(user){
     
     Reactotron.log('Action: '+user)

     return{
          type: 'UPDATE_USER',
          user
     }
}

const Creators = {
     updateUser, // using object literal shorthand
   }
   
   markActionsOffline(Creators, ['updateUser'])
   