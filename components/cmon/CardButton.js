import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { darken, green } from "./../../utils/colors";

export default function CardButton({ icon, text, onPress, color = green }) {
	return (
		<TouchableOpacity
			style={[
				styles.btn,
				{ backgroundColor: color, borderColor: darken(color, 40) }
			]}
			onPress={onPress}
		>
			<Text style={[styles.btnText, { color: darken(color, 40) }]}>
				{icon && <MaterialCommunityIcons name={icon} size={24} />}
				{icon && " "}
				{text}
			</Text>
		</TouchableOpacity>
	);
}

const styles = StyleSheet.create({
	btn: {
		flex: 0.3,
		alignItems: "center",
		justifyContent: "center",
		minHeight: 38,
		maxHeight: 60,
		borderBottomLeftRadius: 10,
		borderBottomRightRadius: 10,
		borderBottomWidth: 2
	},

	btnText: {
		fontSize: 20,
		fontWeight: "600",
		justifyContent: "center"
	}
});
