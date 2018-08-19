import { ADD_CARD } from "./types";

export function addCard(card) {
	return {
		type: ADD_CARD,
		card
	};
}
