// como se fosse uma tabela do sql

export default class RepositorySchema{
     static schema = {
          name: 'User',
          primaryKey: 'id',
          properties: {
               // campos do schema
               id: 'string',
               email: 'string',
               password: 'string',
               token: 'string',
               createAt: 'string'
          }
     }
}