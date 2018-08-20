import { AsyncStorage } from "react-native";
import uuidV4 from "uuid/v4";
import { toLower } from "lodash";

const STORAGE_KEY = "vindexcards:decks";

// front: can be a image, text, video, sound, or equation
// back: shows answer, info about the question, and notes about the answer

const initData = {
	jlpt5: {
		id: uuidV4(),
		title: "JLPT5",
		description: "",
		cards: [
			{
				front: "一",
				back: "One",
				info: {
					Lesson: "1",
					Strokes: "1",
					Jouyou_Grade: "1",
					JLPT: "5"
				},
				notes: {
					Kanji: "一",
					Constituents: "one",
					Stroke_Diagram: "<gif>",
					Mnemonic: ""
				},
				status: "EASY"
			},
			{
				front: "四",
				back: "Four",
				info: {
					Lesson: "1",
					Strokes: "5",
					Jouyou_Grade: "1",
					JLPT: "5"
				},
				notes: {
					Kanji: "四",
					Constituents: "four, mouth, legs",
					Stroke_Diagram: "<gif>",
					Mnemonic: ""
				},
				status: "GOOD"
			}
		]
	},
	javascript: {
		id: uuidV4(),
		title: "JavaScript",
		description: "",
		cards: [
			{
				front: "What is a variable?",
				back: "Something that stores information",
				status: "EASY"
			},
			{
				front: "What is a closure?",
				back:
					"The combination of a function and the lexical environment within which that function was declared",
				status: "GOOD"
			}
		]
	}
};

export const getData = () => {
	return initData;
};

/* prod getDecks function
export function getDecks() {
	return AsyncStorage.getItem(STORAGE_KEY, (err, result) => {
	  if (result === null) {
		return { decks: {} };
	  }
	  return JSON.parse(result);
	});
} */

// dev getDecks function
export function getDecks() {
	return AsyncStorage.getItem(STORAGE_KEY).then(result => {
		if (result === null) {
			AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(initData));
			return initData;
		} else {
			return JSON.parse(result);
		}
	});
}

export function saveNewDeck(deck) {
	const deckId = toLower(deck.title);
	return AsyncStorage.mergeItem(
		STORAGE_KEY,
		JSON.stringify({
			[deckId]: {
				id: uuidV4(),
				title: deck.title,
				description: deck.description || "",
				cards: []
			}
		})
	);
}

export function saveNewCard(deck, card) {
	const deckId = toLower(deck);
	return AsyncStorage.getItem(STORAGE_KEY).then(result => {
		const data = JSON.parse(result);
		data[deckId].cards.push(card);
		AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
	});
}
