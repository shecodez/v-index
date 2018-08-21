import React from "react";
import { createDrawerNavigator } from "react-navigation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Menu from "./Menu";
import NewDeckNavigator from "./../deck/NewDeckNav";
import DeckListNavigator from "./../deck/DeckListNav";
//import MainNavigator from "./MainNavigator";

const MainNavigation = createDrawerNavigator(
	{
		DeckList: {
			screen: DeckListNavigator,
			navigationOptions: {
				title: "Decks",
				drawerIcon: ({ tintColor }) => (
					<MaterialCommunityIcons
						name={"cards"}
						color={tintColor}
						size={25}
					/>
				)
			}
		},
		NewDeck: {
			screen: NewDeckNavigator,
			navigationOptions: {
				title: "New Deck",
				drawerIcon: ({ tintColor }) => (
					<MaterialCommunityIcons
						name={"plus"}
						color={tintColor}
						size={25}
					/>
				)
			}
		}
	},
	{ contentComponent: props => <Menu {...props} /> }
);

export default MainNavigation;
