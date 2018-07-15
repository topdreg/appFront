import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, TouchableOpacity } from 'react-native';
import config from './config';

class Post extends Component {
	constructor() {
		super();
		this.state = {
			liked: false,
			screenWidth: Dimensions.get("window").width
		};
	}

	likeToggled() {
		this.setState({
			liked: !this.state.liked
		})
	}

	render() {
		const imageHeight = Math.floor(this.state.screenWidth * 1.1);
		const imageUri = "https://lh3.googleusercontent.com/SudjtPeGjqIyJoFxFCCBhf8_2JUfGcxHTMhPvePzwVh8WiTc5UgV4Q8wwSEp1ZZpxjuypmezRSgSLJ-nKIfsf5NaZu8" + "=s" + imageHeight + "-c";

		const heartIconColor = this.state.liked ? "rgb(252,61,57)" : null;
		return(
			<View>
				<View style={styles.userBar}>
					<View style={{ flexDirection: "row", alignItems: "center" }}>
						<Image 
							style={styles.userPic}
							source={{ uri: "https://lh3.googleusercontent.com/HQ9EHTmd2Uie-1nZ24e5i2ObTDPHOyYI9XRY2UJVqfJTG_5kJhMkOVi0V5IyWQpOHgkL6LjbYITiyikao3yGDOiwTSI" 
							}}
						/>
						<Text style={{ marginLeft: 10 }}>Aaron Percival</Text>
					</View>
					<View />
					<View style={{alignItems: 'center' }}>
						<Text style={{ fontSize: 30 }}>...</Text>
					</View>
				</View>
				<TouchableOpacity
					activeOpacity={0.7}
					onPress={() => {
						this.likeToggled()
					}}
				>
					<Image 
						style={{ width: this.state.screenWidth, height: 400}}
						source={{
						uri: imageUri 
						}} 
					/>
				</TouchableOpacity>
				<View style={styles.iconBar}>
					<Image
						style={[styles.icon, { height: 40, width: 40, tintColor: heartIconColor }]}
						source={config.images.heartIcon}
					/>
					<Image
						style={[styles.icon, { height: 36, width: 36 }]}
						source={config.images.bubbleIcon}
					/>
					<Image
						resizeMode="stretch"
						style={[styles.icon, { height: 50, width: 40 }]}
						source={config.images.arrowIcon}
					/>
				</View>
				<View style={styles.iconBar}>
					<Image
						style={[styles.icon, { height: 30, width: 30 }]}
						source={config.images.heartIcon}
					/>
					<Text>128 Likes</Text>
				</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	tempNav: { 
		width: 100 + "%", 
		height: 56, 
		backgroundColor:'rgb(250,250,250)',
		borderBottomColor: 'rgb(233,33,233)',
		borderBottomWidth: StyleSheet.hairlineWidth,
		justifyContent: "center",
		alignItems: "center"
	},

	userBar: {
		width: 100 + "%",
		height: config.styleConstants.rowHeight,
		backgroundColor: "rgb(255,255,255)",
		flexDirection: "row",
		paddingHorizontal: 10,
		justifyContent: "space-between"
	},

	userPic: {
		height: 40,
		width: 40,
		borderRadius: 20
	},

	iconBar: {
		height: config.styleConstants.rowHeight,
		width: 100 + "%",
		borderColor: 'rgb(233,233,233)',
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: "row",
		alignItems: "center"
	},
	icon: {
		marginLeft: 5
	},
});

export default Post;
