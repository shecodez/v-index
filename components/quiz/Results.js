import React from "react";
import { NavigationActions } from "react-navigation";
import { StyleSheet, Text, View } from "react-native";
import { white, green, blue, dark } from "./../../utils/colors";

import CardButton from "./../cmon/CardButton";
import CustomButton from "./../cmon/CustomButton";

class Results extends React.Component {
	render() {
		const { right, wrong } = this.props;
		const mastered = (right / (right + wrong)) * 100;

		return (
			<View style={styles.container}>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.cardContents}>
							<View style={styles.block}>
								<View style={styles.progressCircle}>
									<Text
										style={styles.percentText}
									>{`${mastered}%`}</Text>
								</View>
								<Text style={styles.header}>Mastery</Text>
							</View>

							<CardButton
								text={"Back To Deck"}
								onPress={this.props.goBack}
								color={green}
							/>
						</View>
					</View>
				</View>
				<View style={styles.linkContainer}>
					<CustomButton
						styles={styles}
						text={"Review Again"}
						onPress={this.props.reset}
						color={"transparent"}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: blue
	},
	cardContainer: {
		flex: 0.7,
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
		justifyContent: "center"
	},
	block: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	header: {
		textAlign: "center",
		fontSize: 32,
		fontWeight: "600",
		color: dark
	},
	progressCircle: {
		minHeight: 100,
		minWidth: 100,
		borderColor: green,
		borderRadius: 50,
		borderWidth: 6,
		justifyContent: "center",
		alignItems: "center"
	},
	percentText: {
		fontSize: 28,
		textAlign: "center"
	},
	// styled as link
	linkContainer: {
		position: "absolute",
		width: "100%",
		alignItems: "center",
		bottom: 30
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
