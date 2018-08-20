import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

export default function CustomButton({
	text,
	onPress,
	styles,
	color,
	disabled = false
}) {
	return (
		<TouchableOpacity
			style={[
				disabled ? styles.adoBtnDisabled : styles.adoBtn,
				{ backgroundColor: color }
			]}
			onPress={onPress}
			disabled={disabled}
		>
			<Text style={styles.btnText}>{text}</Text>
		</TouchableOpacity>
	);
}
