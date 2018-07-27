import { Dimensions } from "react-native";

export default {
	images: {
		heartIcon: require('../../assets/heart.png'),
		bubbleIcon: require('../../assets/bubble.png'),
		arrowIcon: require('../../assets/arrow.png')
	},
	styleConstants: {
		rowHeight: 50,
		oneThirdWidth: Dimensions.get("window").width / 3
	},
	baseUrl: "http://10.0.2.2:3000/api/"
};
