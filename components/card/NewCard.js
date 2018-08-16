import React from "react";
import { connect } from "react-redux";
import { NavigationActions } from "react-navigation";
import {
	StyleSheet,
	View,
	KeyboardAvoidingView,
	Text,
	Button,
	TextInput
} from "react-native";
import { saveCardToDeck } from "./../../utils/api";
import { addCard } from "./../../actions/cards";

class NewCard extends React.Component {
	state = {
		front: "",
		back: "",
		info: {},
		notes: {}
	};

	submit = () => {
		const deck = this.props.navigation.state.params.entryId;
		const { front, back } = this.state;

		this.props.dispatch(addCard({ deck: deck.title, front, back }));
		saveCardToDeck(deck.title, { front, back });

		this.setState({ front: "", back: "" });

		this.props.navigation.dispatch(NavigationActions.back({ key: null }));
	};

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.container}>
					<Text style={styles.heading}>V-INDEX CARD</Text>

					<Text style={styles.label}>Front</Text>
					<TextInput
						style={styles.input}
						onChangeText={front => this.setState({ front })}
						value={this.state.front}
					/>

					<Text style={styles.label}>Back</Text>
					<TextInput
						style={styles.input}
						onChangeText={back => this.setState({ back })}
						value={this.state.back}
					/>

					<Button onPress={this.submit} title="Submit" />
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center"
	},
	heading: {
		fontSize: 30,
		marginBottom: 28
	},
	label: {
		color: "#333"
	},
	input: {
		width: 250,
		padding: 8,
		marginBottom: 24
	}
});

/*function mapDispatchToProps(dispatch) {
	return {
		addNewCard: (deck, card) => dispatch(addCard(deck, card))
	};
}*/

export default connect()(NewCard);
