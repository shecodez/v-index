import React from "react";
import { createBottomTabNavigator } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { DeckList, NewDeck } from "./../index";

export const Tabs = createBottomTabNavigator({
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
