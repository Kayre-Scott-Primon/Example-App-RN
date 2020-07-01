import { put, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import NetInfo from "@react-native-community/netinfo";
import { OFFLINE, ONLINE } from "redux-offline-queue";
import Reactotron from "reactotron-react-native";

export function* startWatchingNetworkConnectivity() {

     NetInfo.fetch().then(isConnected => {
          Reactotron.log('First, is ' + (isConnected ? 'online' : 'offline'));
        });

  const channel = eventChannel(emitter => {
      NetInfo.addEventListener(
            emitter
          );
        
        return () => NetInfo.addEventListener(
        {}
      );
    })



  try {
    while(true){
      const isConnected = yield take(channel);
      Reactotron.log(isConnected)
      if (isConnected) {
        yield put({ type: ONLINE });
      } else {
        yield put({ type: OFFLINE });
      }
    }
  } finally {
    channel.close();
  }
}