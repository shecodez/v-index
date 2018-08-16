import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { white, blue, green } from "./../../utils/colors";

import CustomButton from "./../CustomButton";

class DeckView extends React.Component {
	goto = (screen, deck) => {
		this.props.navigation.navigate(screen, {
			entryId: deck
		});
	};

	render() {
		const { deck } = this.props;

		return (
			<View style={styles.container}>
				<Text>{deck.title}</Text>
				<Text>{deck.cards.length} Cards</Text>

				<CustomButton
					styles={styles}
					text={"Add Card"}
					onPress={() => this.goto("NewCard", deck)}
					color={blue}
				/>
				<CustomButton
					styles={styles}
					text={"Start Quiz"}
					onPress={() => this.goto("AddCard", deck)}
					color={green}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	adoBtn: {
		padding: 10,
		borderRadius: 7,
		height: 45,
		margin: 5,
		width: 170
	},
	btnText: {
		color: white,
		fontSize: 20,
		textAlign: "center"
	}
});

function mapStateToProps(state, props) {
	return {
		deck: state.decks[props.navigation.state.params.entryId]
	};
}

export default connect(
	mapStateToProps,
	null
)(DeckView);
