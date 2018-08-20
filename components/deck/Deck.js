import React from "react";
import { connect } from "react-redux";
import { StyleSheet, Text, View } from "react-native";
import {
	white,
	dark,
	grey,
	blue,
	green,
	getColorHash,
	darken
} from "./../../utils/colors";
import { pluralize } from "./../../utils/helpers";

import CardButton from "./../cmon/CardButton";
import CustomButton from "./../cmon/CustomButton";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

class Deck extends React.Component {
	goto = (screen, deck) => {
		this.props.navigation.navigate(screen, {
			deckId: deck.title
		});
	};

	render() {
		const { deck } = this.props;

		return (
			<View
				style={[
					styles.container,
					{ backgroundColor: getColorHash(deck.title) }
				]}
			>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.cardContents}>
							<View style={styles.block}>
								<Text style={styles.header}>{deck.title}</Text>

								{deck.cards.length === 0 ? (
									<Text style={styles.subHeader}>
										Deck is Empty
									</Text>
								) : (
									<Text style={styles.subHeader}>
										{pluralize(deck.cards.length, "Card")}
									</Text>
								)}
							</View>
							{deck.cards.length > 0 && (
								<CardButton
									text={"Start Review"}
									color={green}
									onPress={() => this.goto("Review", deck)}
								/>
							)}
						</View>
					</View>
				</View>
				<View style={styles.fabContainer}>
					<CustomButton
						styles={styles}
						text={<MaterialCommunityIcons name="plus" size={36} />}
						onPress={() => this.goto("NewCard", deck)}
						color={blue}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	cardContainer: {
		flex: 0.7,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30,
		minHeight: 120
	},
	card: {
		flex: 1,
		backgroundColor: white,
		borderRadius: 10
	},
	cardContents: {
		flex: 4,
		justifyContent: "center"
	},
	block: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	header: {
		textAlign: "center",
		fontSize: 30,
		fontWeight: "600",
		color: dark
	},
	subHeader: {
		fontSize: 20,
		color: grey
	},
	// styled as a fab
	fabContainer: {
		position: "absolute",
		right: 25,
		bottom: 25
	},
	adoBtn: {
		padding: 10,
		margin: 0,
		borderRadius: 50,
		height: 64,
		width: 64,
		borderColor: darken(blue, 40),
		borderBottomWidth: 3,
		borderLeftWidth: 1,
		borderRightWidth: 2
	},
	btnText: {
		color: white,
		fontSize: 20,
		textAlign: "center"
	}
});

function mapStateToProps(state, props) {
	return {
		deck: state.decks[props.navigation.state.params.deckId]
	};
}

export default connect(
	mapStateToProps,
	null
)(Deck);
