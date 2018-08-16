import {
	ADD_DECK,
	//GET_DECKS,
	RECEIVE_DECKS,
	ADD_CARD
	//REMOVE_DECK
} from "../constants/actionTypes";

export default function(state = {}, action) {
	switch (action.type) {
		case ADD_DECK:
			const newDeck = {
				[action.deck.title]: {
					title: action.deck.title,
					topic: action.deck.topic,
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
				[action.card.deck]: {
					...state[action.card.deck],
					cards: [
						...state[action.card.deck].cards,
						{ front: action.card.front, back: action.card.back }
					]
				}
			};
		default:
			return state;
	}
}
