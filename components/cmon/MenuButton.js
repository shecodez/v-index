import React from "react";
import { StyleSheet } from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

class MenuButton extends React.Component {
	render() {
		return (
			<SimpleLineIcons
				style={styles.button}
				name="menu"
				color={"#000"}
				size={24}
				onPress={() => {
					this.props.navigation.navigate("Menu");
				}}
			/>
		);
	}
}

const styles = StyleSheet.create({
	button: {
		marginLeft: 0,
		paddingLeft: 10,
		paddingRight: 10,
		paddingTop: 7,
		paddingBottom: 4
	}
});

export default MenuButton;
