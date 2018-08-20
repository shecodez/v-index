import React from "react";
import { connect } from "react-redux";
import { toLower } from "lodash";
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	FlatList,
	TouchableOpacity
} from "react-native";
import { getColorHash, dark, grey, white } from "./../../utils/colors";
import { getDecks } from "../../utils/api";
import { receiveDecks } from "../../actions/decks";
import { pluralize } from "./../../utils/helpers";

class DeckList extends React.Component {
	async componentDidMount() {
		const { dispatch } = this.props;
		const data = await getDecks();
		dispatch(receiveDecks(data));
	}

	goto = deck => {
		const deckId = toLower(deck);
		this.props.navigation.navigate("Deck", { deckId });
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
					data={Object.values(decks)}
					renderItem={({ item: { id, title, cards } }) => {
						return (
							<TouchableOpacity
								style={[
									styles.deckLiContainer,
									{ borderColor: getColorHash(title) }
								]}
								onPress={() => this.goto(title)}
							>
								<Text style={styles.btnTitle}>{title}</Text>
								<Text style={styles.btnText}>
									{pluralize(cards.length, "Card")}
								</Text>
							</TouchableOpacity>
						);
					}}
					keyExtractor={item => item.id}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		margin: 15
	},
	deckLiContainer: {
		flex: 1,
		alignItems: "flex-start",
		justifyContent: "center",
		marginVertical: 8,
		padding: 15,
		borderRadius: 10,
		height: 96,
		borderLeftWidth: 10,
		backgroundColor: white
	},
	btnTitle: {
		fontSize: 25,
		color: dark
	},
	btnText: {
		fontSize: 18,
		color: grey
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
