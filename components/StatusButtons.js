import React from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { red, white, blue, green } from "./../utils/colors";

const reviewStatus = [
	{ label: "AGAIN", color: "#333" },
	{ label: "HARD", color: red },
	{ label: "GOOD", color: blue },
	{ label: "EASY", color: green }
];

class StatusButtons extends React.Component {
	setStatus = status => {
		console.log("Deck > Card > status: ", status);
		this.props.nextCard();
	};

	render() {
		return (
			<View style={styles.container}>
				{reviewStatus.map(status => {
					return (
						<TouchableOpacity
							key={status.label}
							style={[
								styles.statusBtn,
								{ backgroundColor: status.color }
							]}
							onPress={() => this.setStatus(status.label)}
						>
							<Text style={styles.btnText}>{status.label}</Text>
						</TouchableOpacity>
					);
				})}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flexWrap: "wrap",
		alignItems: "flex-start",
		flexDirection: "row",
		position: "absolute",
		bottom: 0
	},
	statusBtn: {
		flex: 1,
		height: 56,
		alignItems: "center",
		justifyContent: "center",
		opacity: 0.7
	},
	btnText: {
		color: white
	}
});

export default StatusButtons;
