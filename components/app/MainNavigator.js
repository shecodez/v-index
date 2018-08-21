import React from "react";
import { createStackNavigator } from "react-navigation";
//import { NewDeck, NewCard, DeckList, Deck, Review } from "./../index";
import NewDeck from "./../deck/NewDeck";
import NewCard from "./../card/NewCard";
import DeckList from "./../deck/DeckList";
import Deck from "./../deck/Deck";
import Review from "./../quiz/Review";
import MenuButton from "./../cmon/MenuButton";

const MainNavigator = createStackNavigator(
	{
		DeckList: {
			screen: DeckList,
			navigationOptions: ({ navigation, defaultHeader }) => ({
				...defaultHeader,
				title: "Decks",
				headerLeft: <MenuButton navigation={navigation} />
			})
		},
		NewDeck: {
			screen: NewDeck,
			navigationOptions: ({ navigation, defaultHeader }) => ({
				...defaultHeader,
				title: "New Deck",
				headerLeft: <MenuButton navigation={navigation} />
			})
		},
		Deck: {
			screen: Deck,
			navigationOptions: ({ defaultHeader }) => ({
				...defaultHeader,
				drawerLockMode: "locked-closed"
			})
		},
		NewCard: {
			screen: NewCard,
			navigationOptions: ({ defaultHeader }) => ({
				...defaultHeader,
				title: "New Card",
				drawerLockMode: "locked-closed"
			})
		},
		Review: {
			screen: Review,
			navigationOptions: ({ defaultHeader }) => ({
				...defaultHeader,
				title: "Review",
				drawerLockMode: "locked-closed"
			})
		}
	},
	{
		navigationOptions: ({ navigation }) => ({
			headerMode: "screen"
		})
	}
);

export default MainNavigator;
