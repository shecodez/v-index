import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, Button } from "react-native";
import { getData, getDecks } from "../../utils/api";
import { receiveDecks } from "../../actions/decks";

class DeckList extends React.Component {
	goto = deck => {
		this.props.navigation.navigate("DeckView", {
			entryId: deck
		});
	};

	componentDidMount() {
		getDecks().then(decks => this.props.receiveAllDecks(decks));
	}

	render() {
		const { decks } = this.props;

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
								onPress={() => this.goto(deck)}
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

function mapStateToProps(state) {
	return {
		decks: state.decks
	};
}

function mapDispatchToProps(dispatch) {
	return {
		receiveAllDecks: decks => dispatch(receiveDecks(decks))
	};
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(DeckList);
