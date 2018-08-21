import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { dark, white } from "./../../utils/colors";
import CardButton from "./../cmon/CardButton";

// TODO: Add fade in/out animations
class CardFront extends React.Component {
	handleBtnPress = () => {
		this.props.onPress();
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.cardContents}>
							<View style={styles.block}>
								<Text style={styles.text}>
									{this.props.cardFront}
								</Text>
							</View>

							<CardButton
								icon={"autorenew"}
								text="Flip Card"
								color={this.props.btnColor}
								onPress={this.handleBtnPress}
							/>
						</View>
					</View>
				</View>
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
	cardContainer: {
		flex: 0.45,
		paddingLeft: 30,
		paddingRight: 30,
		paddingTop: 30,
		minHeight: 120,
		minWidth: "100%"
	},
	card: {
		flex: 1,
		backgroundColor: white,
		borderRadius: 10,
		elevation: 4
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
	text: {
		fontSize: 25,
		color: dark,
		textAlign: "center"
	}
});

export default CardFront;
