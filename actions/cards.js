import { ADD_CARD } from "../constants/actionTypes";

export function addCard(card) {
	return {
		type: ADD_CARD,
		card
	};
}
