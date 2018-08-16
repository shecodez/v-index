import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import { white, blue, green, orange } from "./../../utils/colors";

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
				<View style={styles.card}>
					<Text style={styles.header}>{deck.title}</Text>
					<Text style={styles.subHeader}>
						{deck.cards.length} Cards
					</Text>

					<CustomButton
						styles={styles}
						text={"Add Card"}
						onPress={() => this.goto("NewCard", deck)}
						color={blue}
					/>
					<CustomButton
						styles={styles}
						text={"Begin Review"}
						onPress={() => this.goto("AddCard", deck)}
						color={green}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: white
	},
	card: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: orange,
		margin: 20,
		padding: 10,
		alignSelf: "stretch",
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
		textAlign: "center",
		fontSize: 40,
		color: white
	},
	subHeader: {
		fontSize: 32,
		color: white,
		marginBottom: 160
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
