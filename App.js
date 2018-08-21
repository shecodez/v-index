import React from "react";
import { Provider } from "react-redux";
import { View } from "react-native";
//import { AppLoading } from 'expo'
import { MainNavigation } from "./components";
import { setLocalNotification } from "./utils/notifs";

import configureStore from "./store/configureStore";
const store = configureStore();

export default class App extends React.Component {
	state = {
		appLoaded: false
	};

	componentDidMount() {
		setLocalNotification();
	}

	render() {
		/* if (!this.state.appLoaded) {
			return (
			  <AppLoading
				startAsync={cachedAsyncResources}
				onFinish={() => this.setState({ appLoaded: true })}
			  />
			)
		} */
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<MainNavigation />
				</View>
			</Provider>
		);
	}
}
/* Design credits: 
https://www.youtube.com/watch?v=j71n1whTuFk && 
https://dribbble.com/shots/3304392-Flashcard-App */
