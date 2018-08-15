import React from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { getData } from "./../utils/api";

class DeckList extends React.Component {
	/* goto = deck => {
		this.props.navigation.navigate("DeckView", {
			entryId: deck
		});
    }; */

	render() {
		const decks = getData();

		return (
			<View style={styles.container}>
				{Object.keys(decks).map(deck => {
					const { title, topic, cards } = decks[deck];
					return (
						<View key={deck}>
							<Text>{title}</Text>
							<Text>{topic}</Text>
							<Text>{cards.length} Cards</Text>
							<Button
								onPress={() =>
									this.props.navigation.navigate("DeckView", {
										entryId: deck
									})
								}
								title="View Deck"
							/>
						</View>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	}
});

export default DeckList;
