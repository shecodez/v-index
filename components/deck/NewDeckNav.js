import React from "react";
import { createStackNavigator } from "react-navigation";
import NewDeck from "./../deck/NewDeck";

import MenuButton from "./../cmon/MenuButton";

const NewDeckNavigator = createStackNavigator(
	{
		NewDeck: {
			screen: NewDeck,
			navigationOptions: ({ navigation, defaultHeader }) => ({
				...defaultHeader,
				title: "New Deck",
				headerLeft: <MenuButton navigation={navigation} />
			})
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerMode: "screen"
		})
	}
);

export default NewDeckNavigator;
