import React from "react";
import {
	createBottomTabNavigator,
	createStackNavigator
} from "react-navigation";
import { View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Provider } from "react-redux";
import { NewDeck, NewCard, DeckList, Deck, Review } from "./components";
import { setLocalNotification } from "./utils/notifs";

import configureStore from "./store/configureStore";
const store = configureStore();

const Tabs = createBottomTabNavigator({
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			title: "Decks",
			tabBarLabel: "Decks",
			tabBarIcon: () => <MaterialCommunityIcons name="cards" size={30} />
		}
	},
	NewDeck: {
		screen: NewDeck,
		navigationOptions: {
			title: "New Deck",
			tabBarLabel: "New Deck",
			tabBarIcon: () => (
				<MaterialCommunityIcons name="cards-outline" size={30} />
			)
		}
	}
});

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs
	},
	DeckList: {
		screen: DeckList,
		navigationOptions: {
			title: "Decks"
		}
	},
	Deck: {
		screen: Deck,
		navigationOptions: {
			title: "Title"
		}
	},
	NewCard: {
		screen: NewCard,
		navigationOptions: {
			title: "New Card"
		}
	},
	Review: {
		screen: Review,
		navigationOptions: {
			title: "Review"
		}
	}
});

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification();
	}

	render() {
		return (
			<Provider store={store}>
				<View style={{ flex: 1 }}>
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}
/* Design credits: 
https://www.youtube.com/watch?v=j71n1whTuFk && 
https://dribbble.com/shots/3304392-Flashcard-App */
