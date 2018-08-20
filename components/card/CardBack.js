import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { dark, white, darken } from "./../../utils/colors";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

// TODO: Add fade in/out animations
class CardBack extends React.Component {
	handleBtnPress = () => {
		this.props.onPress();
	};

	render() {
		return (
			<View style={styles.container}>
				<View style={styles.cardContainer}>
					<View style={styles.card}>
						<View style={styles.cardContents}>
							<TouchableOpacity
								style={styles.cardTopBtn}
								onPress={this.handleBtnPress}
							>
								<Text style={styles.btnText}>
									Flip Card{" "}
									<MaterialCommunityIcons
										name="autorenew"
										size={22}
									/>
								</Text>
							</TouchableOpacity>

							<View style={styles.block}>
								<Text style={styles.text}>
									{this.props.cardBack}
								</Text>
							</View>
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
	text: {
		fontSize: 25,
		color: dark,
		textAlign: "center"
	},
	cardTopBtn: {
		flex: 0.22,
		alignItems: "flex-end",
		paddingRight: 24,
		justifyContent: "center",
		minHeight: 28,
		maxHeight: 40,
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: white,
		borderColor: darken(white, 40),
		borderTopWidth: 2
	},
	btnText: {
		fontSize: 18,
		fontWeight: "600",
		color: darken(white, 40),
		lineHeight: 22
	}
});

export default CardBack;
