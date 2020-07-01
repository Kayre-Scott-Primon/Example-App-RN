import React from 'react';
import Routes from './routes'
import "./config/reactotron";
import { Provider } from 'react-redux'
import store from './store/index'

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    )
  }
}