import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import updateUser from '../store/actions/user'
import { connect } from 'react-redux'
import { NetInfo}  from '@react-native-community/netinfo'

// import { Container } from './styles';

class Details extends Component{

  constructor({dispatch}){
    super()
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
    ok: 0,
}

  render(){
    return(
      <View style={{backgroundColor: '#CCC', flex: 1, margin: '3%', padding: '2%', borderRadius: 5}}>
                    <TouchableOpacity
                         style={{borderWidth: 5, padding: '2%', alignItems: 'center', backgroundColor: '#9F9', margin: '2%'}}
                         onPress={() => this.dispatch(updateUser( this.state.user ))}
                    >
                         <Text
                              style={{fontSize: 20}}
                         >offLine  First</Text>
                    </TouchableOpacity>
                    <Text style={{margin: '2%', fontSize: 18, color: '#00F'}}>Ok: </Text>
                    <Text style={{margin: '2%', fontSize: 18, color: '#F00'}}>Error: </Text>
                    <Text style={{margin: '2%', fontSize: 18, color: '#FF0'}}>User: </Text>
               </View>
    )
  }
}

export default connect(state => ({ user: state.reducer.user }))(Details);