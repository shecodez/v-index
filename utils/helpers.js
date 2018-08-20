import React from "react";
import { Text } from "react-native";

export const pluralize = (len, word) => {
	if (len === 0) {
		return <Text>{`No ${word}s`}</Text>;
	} else if (len > 1) {
		return <Text>{`${len} ${word}s`}</Text>;
	} else {
		return <Text>{`1 ${word}`}</Text>;
	}
};
