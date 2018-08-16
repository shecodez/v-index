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
				id: "1",
				front: "一",
				back: {
					answer: "One",
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
					}
				},
				status: "EASY"
			},
			{
				id: "34",
				front: "四",
				back: {
					answer: "Four",
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
					}
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
				id: "1",
				front: "What is a variable?",
				back: {
					answer: "Something that stores information",
					info: {},
					notes: {}
				},
				status: "EASY"
			},
			{
				id: "2",
				front: "What is a closure?",
				back: {
					answer:
						"The combination of a function and the lexical environment within which that function was declared",
					info: {},
					notes: {}
				},
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
	return AsyncStorage.getItem(
		VINDEXCARDS_STORAGE_KEY,
		JSON.stringify({
			[deck.title]: {
				// id: uuid,
				title: deck.title,
				topic: deck.topic,
				cards: []
			}
		})
	);
}
