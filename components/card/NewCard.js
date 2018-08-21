import React from "react";
import { connect } from "react-redux";
import { toLower } from "lodash";
import { NavigationActions } from "react-navigation";
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	KeyboardAvoidingView
} from "react-native";
import { saveNewCard } from "./../../utils/api";
import { addCard } from "./../../actions/cards";
import { white, getColorHash } from "../../utils/colors";
import CardButton from "./../cmon/CardButton";

class NewCard extends React.Component {
	state = {
		front: "",
		back: "",
		info: {},
		notes: {}
	};

	submit = () => {
		const { front, back } = this.state;
		const { dispatch, navigation } = this.props;

		if (front === "" || back === "") return;

		const deckId = toLower(navigation.state.params.deckId);
		dispatch(addCard({ deckId, front, back }));
		saveNewCard(deckId, { front, back });

		this.initialState();
		navigation.dispatch(NavigationActions.back({ key: null }));
	};

	initialState = () => {
		this.setState({ front: "", back: "" });
	};

	render() {
		const deck = this.props.navigation.state.params.deckId;
		return (
			<KeyboardAvoidingView
				behavior="padding"
				style={[
					styles.container,
					{ backgroundColor: getColorHash(deck) }
				]}
			>
				<View style={styles.formContainer}>
					<View style={styles.card}>
						<View style={styles.cardContents}>
							<View style={styles.block}>
								<Text style={styles.title}>{deck}</Text>
							</View>

							<View style={styles.inputContainer}>
								<TextInput
									multiLine={true}
									autoGrow={true}
									autoCapitalize="none"
									autoFocus={true}
									style={styles.input}
									placeholder="Front Text"
									onChangeText={front =>
										this.setState({ front })
									}
									value={this.state.front}
								/>
							</View>
							<View style={styles.inputContainer}>
								<TextInput
									multiLine={true}
									autoGrow={true}
									autoCapitalize="none"
									style={styles.input}
									placeholder="Back Text"
									onChangeText={back =>
										this.setState({ back })
									}
									value={this.state.back}
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
		flex: 1
	},
	formContainer: {
		flex: 0.4,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30,
		minHeight: 200
	},
	card: {
		flex: 1,
		backgroundColor: white,
		borderRadius: 10,
		elevation: 4
	},
	cardContents: {
		flex: 4,
		padding: 30
	},
	block: {
		flex: 1,
		justifyContent: "center"
	},
	title: {
		fontSize: 28,
		textAlign: "left",
		fontWeight: "600"
	},
	inputContainer: {
		flex: 1,
		justifyContent: "center"
	},
	input: {
		padding: 5,
		fontSize: 16
	}
});

/*function mapDispatchToProps(dispatch) {
	return {
		addNewCard: (deck, card) => dispatch(addCard(deck, card))
	};
}*/

export default connect()(NewCard);
