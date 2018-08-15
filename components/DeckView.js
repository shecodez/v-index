import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { getData } from "./../utils/api";

class DeckView extends React.Component {
	render() {
		const index = this.props.navigation.state.params.entryId;
		const decks = getData();
		return (
			<View style={styles.container}>
				<Text>{decks[index].title}</Text>
				<Text>{decks[index].cards.length}</Text>
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

export default DeckView;
