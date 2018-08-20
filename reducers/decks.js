import {
	ADD_DECK,
	//GET_DECKS,
	RECEIVE_DECKS,
	ADD_CARD
	//REMOVE_DECK
} from "../actions/types";

export default function(state = {}, action) {
	switch (action.type) {
		case ADD_DECK:
			const newDeck = {
				[action.deck.title]: {
					title: action.deck.title,
					description: action.deck.description,
					cards: []
				}
			};
			return {
				...state,
				...newDeck
			};
		case RECEIVE_DECKS:
			return {
				...state,
				...action.decks
			};
		case ADD_CARD:
			return {
				...state,
				[action.card.deckId]: {
					...state[action.card.deckId],
					cards: [
						...state[action.card.deckId].cards,
						{ front: action.card.front, back: action.card.back }
					]
				}
			};
		default:
			return state;
	}
}
