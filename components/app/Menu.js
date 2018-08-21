import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Linking,
	TouchableOpacity,
	StatusBar
} from "react-native";
import { grey, blue, white } from "./../../utils/colors";
import { Constants } from "expo";
import { DrawerItems } from "react-navigation";

class Menu extends React.Component {
	render() {
		return (
			<View style={styles.container}>
				<StatusBar barStyle="light-content" />
				<View style={styles.header}>
					<Text style={styles.logo}>VIndeX CardZ</Text>
				</View>
				<DrawerItems {...this.props} />
				<TouchableOpacity
					style={styles.footerLink}
					onPress={() =>
						Linking.openURL(
							"mailto:me@shecodez.com?subject=vindexcards"
						)
					}
				>
					<Text style={{ color: grey }}>SheCodeZ | NJN 2018</Text>
				</TouchableOpacity>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	header: {
		paddingTop: Constants.statusBarHeight,
		height: 150,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: blue
	},
	logo: {
		textShadowColor: "#666",
		textShadowOffset: {
			width: 0,
			height: 1
		},
		textShadowRadius: 2,
		backgroundColor: "transparent",
		color: white,
		fontSize: 35
	},
	footerLink: {
		position: "absolute",
		bottom: 20,
		left: 20
	}
});

export default Menu;
