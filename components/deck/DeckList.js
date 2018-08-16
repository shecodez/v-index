import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View, ScrollView, Button } from "react-native";
import { orange, white } from "./../../utils/colors";
import { getDecks } from "../../utils/api";
import { receiveDecks } from "../../actions/decks";

class DeckList extends React.Component {
	componentDidMount() {
		getDecks().then(decks => this.props.receiveAllDecks(decks));
	}

	goto = deck => {
		this.props.navigation.navigate("DeckView", {
			entryId: deck
		});
	};

	render() {
		const { decks } = this.props;

		return (
			<ScrollView style={styles.container}>
				{Object.keys(decks).map(deck => {
					const { title, topic, cards } = decks[deck];
					return (
						<View key={deck} style={styles.card}>
							<Text style={styles.header}>{title}</Text>
							<Text style={styles.subHeader}>{topic}</Text>
							<Text style={styles.deckLength}>
								{cards.length} Cards
							</Text>

							<Button
								onPress={() => this.goto(deck)}
								title="View Deck"
							/>
						</View>
					);
				})}
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignSelf: "stretch",
		padding: 5
	},
	card: {
		//flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: orange,
		margin: 8,
		height: 234,
		borderRadius: 10,
		shadowColor: "rgba(0,0,0,0.34)",
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 4,
		shadowOpacity: 1
	},
	header: {
		fontSize: 30,
		color: white
	},
	subHeader: {
		fontSize: 18,
		color: white,
		marginBottom: 10
	},
	deckLength: {
		color: white,
		marginBottom: 8
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
