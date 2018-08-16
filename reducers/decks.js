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
				[action.deck]: {
					title: action.deck,
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
				[deck]: {
					...state[deck],
					cards: [...state[deck].cards, { id, front, back, status }]
				}
			};
		default:
			return state;
	}
}
