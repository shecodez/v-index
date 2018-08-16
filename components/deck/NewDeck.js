import React from "react";
import { StyleSheet, View, Text, Button, TextInput } from "react-native";
import { saveDeck } from "./../../utils/api";
// import { addDeck } from './../../actions';

class NewDeck extends React.Component {
	state = {
		title: "",
		topic: ""
	};

	submit = () => {
		const { title, topic } = this.state;

		saveDeck({ title, topic });
		// this.props.dispatch(addDeck({ title, topic }));
		// this.props.navigation.navigate('DeckView', { })
	};

	render() {
		return (
			<View style={styles.container}>
				<Text>NEW DECK</Text>

				<Text>Title:</Text>
				<TextInput
					onChangeText={text => this.setState({ title: text })}
					value={this.state.title}
				/>

				<Text>Topic:</Text>
				<TextInput
					onChangeText={text => this.setState({ topic: text })}
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
	}
});

export default NewDeck;
