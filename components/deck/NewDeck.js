import React from "react";
import { connect } from "react-redux";
import { toLower } from "lodash";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	KeyboardAvoidingView
} from "react-native";
import { saveNewDeck } from "./../../utils/api";
import { addDeck } from "./../../actions/decks";
import { blue, white } from "./../../utils/colors";
import CardButton from "./../cmon/CardButton";

class NewDeck extends React.Component {
	state = {
		title: "",
		description: ""
	};

	submit = () => {
		const { title, description } = this.state;
		const { addNewDeck, navigation } = this.props;

		if (title === "") return;

		const deckId = toLower(title);
		saveNewDeck({ title, description });
		addNewDeck({ title, description });

		this.initialState();
		navigation.navigate("Deck", { deckId, title });
	};

	initialState = () => {
		this.setState({ title: "", description: "" });
	};

	render() {
		return (
			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<View style={styles.formContainer}>
					<View style={styles.card}>
						<View style={styles.cardContents}>
							<View style={styles.block}>
								<Text style={styles.title}>
									What is the title of your new deck?
								</Text>
							</View>

							<View style={styles.inputContainer}>
								<TextInput
									style={styles.input}
									placeholder="Deck Title"
									onChangeText={title =>
										this.setState({ title })
									}
									value={this.state.title}
								/>
							</View>
						</View>
						<CardButton onPress={this.submit} text="Submit" />
					</View>
				</View>
			</KeyboardAvoidingView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: blue
	},
	formContainer: {
		flex: 0.4,
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
		paddingTop: 30,
		paddingLeft: 30,
		paddingRight: 30
	},
	block: {
		flex: 1,
		justifyContent: "center"
	},
	title: {
		fontSize: 30,
		lineHeight: 30,
		textAlign: "left",
		fontWeight: "600",
		marginVertical: 24
	},
	inputContainer: {
		flex: 1,
		justifyContent: "center"
	},
	input: {
		padding: 5,
		fontSize: 16,
		paddingVertical: 15
	}
});

function mapDispatchToProps(dispatch) {
	return {
		addNewDeck: deck => dispatch(addDeck(deck))
	};
}

export default connect(
	null,
	mapDispatchToProps
)(NewDeck);
