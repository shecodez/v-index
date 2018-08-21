import React from "react";
import { connect } from "react-redux";
import { toLower } from "lodash";
import { StyleSheet, Text, View } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
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

class Deck extends React.Component {
	static navigationOptions = ({ navigation }) => {
		const { title } = navigation.state.params;
		return {
			title: title
		};
	};

	goto = (screen, deck) => {
		const deckId = toLower(deck.title);
		this.props.navigation.navigate(screen, {
			deckId,
			title: deck.title
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
				<View style={styles.deckContainer}>
					<View style={styles.deck}>
						<View style={styles.deckContents}>
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
						text={<MaterialCommunityIcons name="plus" size={38} />}
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
	deckContainer: {
		flex: 0.7,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 50,
		minHeight: 120
	},
	deck: {
		flex: 1,
		backgroundColor: white,
		borderRadius: 10,
		elevation: 4
	},
	deckContents: {
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
		fontSize: 35,
		fontWeight: "600",
		color: dark
	},
	subHeader: {
		color: grey
	},
	// styled as a fab
	fabContainer: {
		position: "absolute",
		right: 15,
		bottom: 15
	},
	adoBtn: {
		padding: 10,
		margin: 0,
		borderRadius: 30,
		height: 60,
		width: 60,
		elevation: 6
	},
	btnText: {
		color: white,
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
