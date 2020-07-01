//https://www.youtube.com/watch?v=y5Hv7pMA1uo

import Realm from 'realm'
import RepositorySchema from '../schema/RepositorySchema'

export default function getRealm(){
     return Realm.open({
          schema: [RepositorySchema]
     })
}