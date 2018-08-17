import React from "react";
import { View, StatusBar } from "react-native";
import {
	createBottomTabNavigator,
	createStackNavigator
} from "react-navigation";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { Constants } from "expo";
import { purple, white } from "./utils/colors";
import { Provider } from "react-redux";
import { setLocalNotification } from "./utils/helpers";

import configureStore from "./store/configureStore";
const store = configureStore();

import NewDeck from "./components/deck/NewDeck";
import DeckList from "./components/deck/DeckList";
import DeckView from "./components/deck/DeckView";

import NewCard from "./components/card/NewCard";

import Review from "./components/anki/Review";

function CustomStatusBar({ backgroundColor, ...props }) {
	return (
		<View style={{ backgroundColor, height: Constants.statusBarHeight }}>
			<StatusBar
				translucent
				backgroundColor={backgroundColor}
				{...props}
			/>
		</View>
	);
}

const Tabs = createBottomTabNavigator(
	{
		DeckList: {
			screen: DeckList,
			navigationOptions: {
				tabBarLabel: "Decks",
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons
						name="cards"
						size={30}
						color={tintColor}
					/>
				)
			}
		},
		NewDeck: {
			screen: NewDeck,
			navigationOptions: {
				tabBarLabel: "New Deck",
				tabBarIcon: ({ tintColor }) => (
					<FontAwesome
						name="plus-square"
						size={30}
						color={tintColor}
					/>
				)
			}
		}
		// Browse: {<MaterialCommunityIcons name="folder-search" size={30} color={tintColor} />}
		// account: { <FontAwesome name="user" size={30} color={tintColor} /> }
	},
	{
		tabBarOptions: {
			activeTintColor: purple,
			style: {
				height: 56,
				backgroundColor: white
			}
		}
	}
);

const MainNavigator = createStackNavigator({
	Home: {
		screen: Tabs,
		navigationOptions: {
			header: null
		}
	},
	DeckView: {
		screen: DeckView,
		navigationOptions: {
			title: "Deck Info",
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	},
	NewCard: {
		screen: NewCard,
		navigationOptions: {
			title: "New Card",
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
		}
	},
	Review: {
		screen: Review,
		navigationOptions: {
			title: "Review",
			headerTintColor: white,
			headerStyle: {
				backgroundColor: purple
			}
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
					<CustomStatusBar
						backgroundColor={purple}
						barStyle="light-content"
					/>
					<MainNavigator />
				</View>
			</Provider>
		);
	}
}
