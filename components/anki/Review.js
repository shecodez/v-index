import React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
	StyleSheet,
	Text,
	View,
	Button,
	KeyboardAvoidingView
} from "react-native";
import { white, purple, red, green, blue } from "./../../utils/colors";

import StatusButtons from "./../StatusButtons";
import Results from "./Results";

class Review extends React.Component {
	state = {
		card: 0,
		showBack: false,
		hard: 0,
		good: 0,
		easy: 0
	};

	flipCard = () => {
		this.setState({ showBack: !this.state.showBack });
	};

	gotoNextCard = () => {
		const { card } = this.state;
		const { deck } = this.props;

		this.setState({ card: this.state.card + 1, showBack: false });
	};

	goBack = () => {
		this.props.navigation.dispatch(NavigationActions.back({ key: null }));
	};

	reset = () => {
		this.setState({
			card: 0,
			showBack: false,
			hard: 0,
			good: 0,
			easy: 0
		});
	};

	render() {
		const { deck } = this.props;
		const { card, showBack } = this.state;

		if (card === deck.cards.length) {
			return <Results goBack={this.goBack} reset={this.reset} />;
		} else {
			return (
				<View style={styles.container}>
					<View style={styles.card}>
						<Text style={styles.smallText}>
							{`${card + 1} / ${deck.cards.length}`}
						</Text>

						<Text style={styles.cardText}>
							{showBack
								? deck.cards[card].back
								: deck.cards[card].front}
						</Text>

						<Button
							style={styles.flipBtn}
							onPress={this.flipCard}
							title="flip"
						/>
					</View>

					{showBack && <StatusButtons nextCard={this.gotoNextCard} />}
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	smallText: {
		position: "absolute",
		top: 5
		//alignSelf: "flex-start"
	},
	card: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: white,
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
	cardText: {
		fontSize: 28,
		marginBottom: 32,
		textAlign: "center"
	},
	flipBtn: {
		fontSize: 20
		//position: "absolute",
		//bottom: 0
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
)(Review);
