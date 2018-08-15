import React from "react";
import { StyleSheet, Text, View } from "react-native";
import {
	createBottomTabNavigator,
	createStackNavigator
} from "react-navigation";
import { FontAwesome, MaterialCommunityIcons } from "@expo/vector-icons";
import { purple, white } from "./utils/colors";

import NewDeck from "./components/NewDeck";
import DeckList from "./components/DeckList";
import DeckView from "./components/DeckView";

// TODO: ADD share button to each deck
const Tabs = createBottomTabNavigator(
	{
		DeckList: {
			screen: DeckList,
			navigationOptions: {
				tabBarLabel: "Decks",
				tabBarIcon: ({ tintColor }) => (
					<MaterialCommunityIcons
						name="cards"
						size={28}
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
						size={28}
						color={tintColor}
					/>
				)
			}
		}
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
	}
});

export default class App extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<MainNavigator />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});
