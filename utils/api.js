import uuidV4 from "uuid/v4";
import { AsyncStorage } from "react-native";

const VINDEXCARDS_STORAGE_KEY = "vindexcards: decks";

// front: can be a image, text, video, sound, or equation
// back: shows answer, info about the question, and notes about the answer

const initData = {
	Japanese: {
		id: "1",
		title: "JLPT5",
		topic: "LANGUAGE",
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
	JavaScript: {
		id: "2",
		title: "JavaScript",
		topic: "PROGRAMMING",
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

export function getDecks(deck) {
	return AsyncStorage.getItem(VINDEXCARDS_STORAGE_KEY).then(results => {
		if (results === null) {
			AsyncStorage.setItem(
				VINDEXCARDS_STORAGE_KEY,
				JSON.stringify(initData)
			);
			return initData;
		} else {
			return JSON.parse(results);
		}
	});
}

export function saveDeck(deck) {
	return AsyncStorage.mergeItem(
		VINDEXCARDS_STORAGE_KEY,
		JSON.stringify({
			[deck.title]: {
				id: uuidV4(),
				title: deck.title,
				topic: deck.topic,
				cards: []
			}
		})
	);
}

export function saveCardToDeck(deck, card) {
	return AsyncStorage.getItem(VINDEXCARDS_STORAGE_KEY)
		.then(results => JSON.parse(results))
		.then(results => {
			results[deck].cards.push(card);
			AsyncStorage.setItem(
				VINDEXCARDS_STORAGE_KEY,
				JSON.stringify(results)
			);
			return results;
		});
}
