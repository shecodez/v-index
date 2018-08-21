import React from "react";
import { connect } from "react-redux";
import { toLower } from "lodash";
import {
	StyleSheet,
	Text,
	View,
	FlatList,
	TouchableOpacity
} from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { getColorHash, grey, white, blue } from "./../../utils/colors";
import { getDecks } from "../../utils/api";
import { receiveDecks } from "../../actions/decks";
import { pluralize } from "./../../utils/helpers";
import CustomButton from "./../cmon/CustomButton";

class DeckList extends React.Component {
	async componentDidMount() {
		const { dispatch } = this.props;
		const data = await getDecks();
		dispatch(receiveDecks(data));
	}

	goto = deck => {
		const deckId = toLower(deck);
		this.props.navigation.navigate("Deck", { deckId, title: deck });
	};

	render() {
		const { decks } = this.props;

		// In case there are no decks, we give some info.
		if (decks === null) {
			return (
				<View style={styles.container}>
					<Text>There are currently no decks in your app.</Text>
					<Text>
						Add a new deck by pressing the floating plus button
						below.
					</Text>
				</View>
			);
		}
		return (
			<View style={styles.container}>
				<FlatList
					style={styles.deckList}
					data={Object.values(decks)}
					renderItem={({ item: { title, cards } }) => {
						return (
							<TouchableOpacity
								style={[
									styles.deckLiContainer,
									{ backgroundColor: getColorHash(title) }
								]}
								onPress={() => this.goto(title)}
							>
								<View style={styles.block}>
									<Text style={styles.itemTitle}>
										{title}
									</Text>
									<Text style={styles.itemCardLen}>
										{pluralize(cards.length, "Card")}
									</Text>
								</View>
							</TouchableOpacity>
						);
					}}
					keyExtractor={item => item.id}
				/>
				<View style={styles.fabContainer}>
					<CustomButton
						styles={styles}
						text={<MaterialCommunityIcons name="plus" size={38} />}
						onPress={() =>
							this.props.navigation.navigate("NewDeck")
						}
						color={blue}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: grey
	},
	deckList: {
		flex: 1
	},
	deckLiContainer: {
		flex: 1,
		minHeight: 120,
		paddingTop: 30,
		paddingBottom: 20,
		paddingLeft: 20,
		paddingRight: 20
	},
	block: {
		flex: 1,
		alignItems: "center"
	},
	itemTitle: {
		textAlign: "left",
		textShadowColor: "#666",
		textShadowOffset: {
			width: 0,
			height: 1
		},
		textShadowRadius: 2,
		backgroundColor: "transparent",
		color: white,
		fontSize: 35,
		marginBottom: -8,
		marginTop: 0
	},
	itemCardLen: {
		color: white
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

function mapStateToProps(state) {
	return {
		decks: state.decks
	};
}

export default connect(
	mapStateToProps,
	null
)(DeckList);
