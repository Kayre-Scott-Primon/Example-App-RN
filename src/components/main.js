import React, { Component } from 'react';
import { View, TextInput, Text, TouchableOpacity, Keyboard } from 'react-native';
import api from '../services/api'
import getRealm from '../services/realm'


class Main extends Component{

     constructor({navigation}){
          super()
          this.navigation = navigation     
     }

     state = {
          email: '',
          password: '',
          error: '',
          ok: '',
          user: '',
     }

     componentDidMount (){

     }

     emailChange = (email) => {
          this.setState({email})
     }

     passwordChange = (password) => {
          this.setState({password})
     }

     async salveRealm(user){
          //estabelece a conexão
          const realm = await getRealm()
          realm.write(() => {

               // cria um schema e salva arquivos 
               realm.create('User'/*nome do schema*/, user, 'modified')

               console.log('oi')
               console.log({user})
          })
     }

     login = async () => {
          if(this.state.email.length === 0 || this.state.password === 0 ){
               this.setState({ error: 'Preencha os campos de email e senha para realizar o login'})
          }else{
               try{
                    //const response = await api.get('/user')
                    const response = await api.post('/user/authenticate',{
                         email: this.state.email ,
                         password: this.state.password
                    })
                         this.setState({ok: 'POST na API'})
                    
                    //salvar na sotrage o token
                    this.setState({user: response.data.token})

                    //salvar no realm
                    await this.salveRealm(['',this.state.email,this.state.password
                    ,response.data.token,''])

                    Keyboard.dismiss()

                    //navegar
                    this.navigation.navigate('Second')
         
               }catch (err) {
                    this.setState({ error: 'Houve um problema ao logar, '+ err})
               }
          }
     }

     render(){
          return (
               <View style={{backgroundColor: '#CCC', flex: 1, margin: '3%', padding: '2%', borderRadius: 5}}>
                    <TextInput
                         value={this.state.email}
                         placeholder='email'
                         style={{margin: '2%', borderWidth: 2, padding: '3%'}}
                         onChangeText={this.emailChange}
                    />
                    <TextInput
                         value={this.state.password}
                         placeholder='password'
                         style={{margin: '2%', borderWidth: 2, padding: '3%'}}
                         secureTextEntry //ocultar senha 
                         onChangeText={this.passwordChange}
                    />
                    <TouchableOpacity
                         style={{borderWidth: 5, padding: '2%', alignItems: 'center', backgroundColor: '#9F9', margin: '2%'}}
                         onPress={this.login}
                    >
                         <Text
                              style={{fontSize: 20}}
                         >Entrar</Text>
                    </TouchableOpacity>
                    <Text style={{margin: '2%', fontSize: 18, color: '#00F'}}>Ok: {this.state.ok}</Text>
                    <Text style={{margin: '2%', fontSize: 18, color: '#F00'}}>Error: {this.state.error}</Text>
                    <Text style={{margin: '2%', fontSize: 18, color: '#FF0'}}>User: {this.state.user}</Text>
               </View>
          )
     }
}

export default Main;