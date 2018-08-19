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

import CustomButton from "./../CustomButton";

class Results extends React.Component {
	render() {
		const { right, wrong } = this.props;

		return (
			<View style={styles.container}>
				<Text style={styles.header}>Assessment</Text>

				<Text>{`Correct: ${right}`}</Text>
				<Text>{`Incorrect: ${wrong}`}</Text>

				<Text>{`${(right / (right + wrong)) * 100}% Mastered`}</Text>

				<CustomButton
					styles={styles}
					text={"Review Again"}
					onPress={this.props.reset}
					color={blue}
				/>
				<CustomButton
					styles={styles}
					text={"Back"}
					onPress={this.props.goBack}
					color={green}
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center"
	},
	header: {
		textAlign: "center",
		fontSize: 40,
		marginBottom: 50
	},
	adoBtn: {
		padding: 10,
		borderRadius: 7,
		height: 45,
		margin: 5,
		width: 170
	},
	btnText: {
		color: white,
		fontSize: 20,
		textAlign: "center"
	}
});

export default Results;
