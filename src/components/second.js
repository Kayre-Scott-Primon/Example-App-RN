import React, { Component } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import api from '../services/api'
import Realm from 'realm'
import { connect } from 'react-redux'
import getRealm from '../services/realm'
import updateUser from '../store/actions/user'


 
 class Second extends Component {

     
     constructor({navigation, user, dispatch}){
          super()
          this.navigation = navigation,
          this.user = user,
          this.dispatch = dispatch
     }

     state = {
          user: {
               email: 'teste@',
               password: '1234',
               id: '4321',
               token: ''
          },
          user2: '',
          error: '',
          ok: '',
     }

     userChange = (user) => {
          this.setState({user})
     }

      async GetApi() {

               try{
                    const response = await api.get('/user/5eea1ef48e834a178035b853')
                    console.log(JSON.stringify(response))
                    //revisar o modo de apresentar o array!!!!!


               }catch (err) {
                    this.setState({error: 'Houve um problema: '})
               }
          
     }

     async getrealm(){

          const user = {}

          //deu certo , UFAA!
          await Realm.open({}).then(realm => {
               console.log("Realm is located at: " + realm.path);
               console.log(JSON.stringify(realm.objects('User')))
               //user = JSON.stringify(realm.objects('User'))
               //userChange(realm.objects('User'))
               //ainda nao consigo pegar para salvar no estado, esse metodo da erro que é so para leitura
           });

           //this.setState({user: user})
           //da erro 'setState'
           //this.setState({ok: 'Pegou do realm'})

     }

     render(){
       return (
               <View style={{backgroundColor: '#CCC', flex: 1, margin: '3%', padding: '2%', borderRadius: 5}}>
                    <TouchableOpacity
                         style={{borderWidth: 5, padding: '2%', alignItems: 'center', backgroundColor: '#9F9', margin: '2%'}}
                         onPress={ this.getrealm /*this.loadRepositories*/}
                    >
                         <Text
                              style={{fontSize: 20}}
                         >User</Text>
                    </TouchableOpacity>
                    <Text style={{margin: '2%', fontSize: 18, color: '#00F'}}>Ok: {this.state.ok}</Text>
                    <Text style={{margin: '2%', fontSize: 18, color: '#F00'}}>error: {this.state.error}</Text>
                    <Text style={{margin: '2%', fontSize: 18, color: '#FF0'}}>User: {/*this.user.map(user => (user.id))*/}</Text>
                    <TouchableOpacity
                         style={{borderWidth: 5, padding: '2%', alignItems: 'center', backgroundColor: '#F60', margin: '2%'}}
                         onPress={() => this.dispatch(updateUser( this.state.user ))}
                    >
                         <Text
                              style={{fontSize: 20}}
                         >UpDate User
                         </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                         style={{borderWidth: 5, padding: '2%', alignItems: 'center', backgroundColor: '#F55', margin: '2%'}}
                         //onPress={this.navigation.navigate('Details')}
                    >
                         <Text
                              style={{fontSize: 20}}
                         >Details
                         </Text>
                    </TouchableOpacity>
                    <FlatList
                         data={this.state.user2}
                         renderItem={({ item }) => <Item title={item.title} />}
                         keyExtractor={item => item.id}
                    />
               </View>
     );
     }
}

export default connect(state => ({ user: state.reducer.user }))(Second);

