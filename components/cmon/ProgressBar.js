import React from "react";
import { StyleSheet, View } from "react-native";

export default function ProgressBar({ i, max }) {
	return (
		<View style={styles.container}>
			<View style={styles.background} />
			<View style={[styles.progress, { width: `${(i / max) * 100}%` }]} />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		position: "absolute",
		bottom: 25,
		left: 25,
		right: 25,
		height: 13
	},
	background: {
		position: "absolute",
		backgroundColor: "rgba(0,0,0,0.1)",
		height: 13,
		width: "100%",
		borderRadius: 10
	},
	progress: {
		position: "absolute",
		backgroundColor: "white",
		height: 13,
		borderRadius: 10,
		alignSelf: "flex-start"
	}
});
