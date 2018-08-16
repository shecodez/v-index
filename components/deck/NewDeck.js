import React from "react";
import { connect } from "react-redux";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { saveDeck } from "./../../utils/api";
import { addDeck } from "./../../actions/decks";

class NewDeck extends React.Component {
	state = {
		title: "",
		topic: ""
	};

	submit = () => {
		const { title, topic } = this.state;

		saveDeck({ title, topic });
		this.props.addNewDeck({ title, topic });
		this.props.navigation.navigate("DeckView", { entryId: title });
		this.setState({ title: "", topic: " " });
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.heading}>NEW DECK</Text>

				<Text style={styles.label}>Title:</Text>
				<TextInput
					style={styles.input}
					onChangeText={title => this.setState({ title })}
					value={this.state.title}
				/>

				<Text style={styles.label}>Topic:</Text>
				<TextInput
					style={styles.input}
					onChangeText={topic => this.setState({ topic })}
					value={this.state.topic}
				/>

				<Button onPress={this.submit} title="Submit" />
			</View>
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
		width: 200,
		padding: 8,
		marginBottom: 24
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
