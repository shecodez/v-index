import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function CustomButton({ text, onPress, styles, color }) {
	return (
		<TouchableOpacity
			style={[styles.adoBtn, { backgroundColor: color }]}
			onPress={onPress}
		>
			<Text style={styles.btnText}>{text}</Text>
		</TouchableOpacity>
	);
}
