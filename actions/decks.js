import { ADD_DECK, RECEIVE_DECKS } from "./types";

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
