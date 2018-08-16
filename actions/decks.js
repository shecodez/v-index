import { ADD_DECK, RECEIVE_DECKS, ADD_CARD } from "../constants/actionTypes";

export function addDeck(deck) {
	return {
		type: ADD_DECK,
		deck
	};
}

export function receiveDecks(decks) {
	return {
		type: RECEIVE_DECKS,
		decks
	};
}

export function addCard(card) {
	return {
		type: ADD_CARD,
		card
	};
}
