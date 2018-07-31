import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import config from '../../config';

class Profile extends Component {

	constructor(){
		super();
		this.state = {
			profilePics: []
		};
	}

	componentDidMount() {
		this._navListener = this.props.navigation.addListener('didFocus', () => {
			if (this.props.navigation.state.params) {
				let newPics = Object.assign([], this.state.profilePics);
				newPics.push(this.props.navigation.state.params.newPic);
				this.setState({
					profilePics: newPics
				});
			}
		});
		fetch(`${config.baseUrl}photo?id=${this.props.user.id}`, {
			  method: 'GET',
			  headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				}
		}).then((response) => response.json())
			.then((responseJson) => {
				this.setState({profilePics: responseJson.data})
			});
	}

	componentWillUnmount() {
		this._navListener.remove();
	}


	login() {
		this.props.navigation.navigate('main');
	}

	render() {
		const third = Dimensions.get("window").width / 3;
		return (
			<ScrollView>
				<View 
					style={{
						height: 100+'%', 
						width: 100+'%', 
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center'
					}}
				>
				<View style={styles.profileInfo}>
					<View style={{flexDirection: "row", width: 100+"%"}}>
						<View style={{ 
							flex: 3, 
							height: 100, 
							justifyContent: "center", 
							alignItems: "center" 
						}}>
							<Image 
								style={styles.userPic}
								source={{ uri: "https://lh3.googleusercontent.com/HQ9EHTmd2Uie-1nZ24e5i2ObTDPHOyYI9XRY2UJVqfJTG_5kJhMkOVi0V5IyWQpOHgkL6LjbYITiyikao3yGDOiwTSI" 
								}}
						/>
						</View>
						<View style={{ flex: 7, height: 100 }}>
							<View style={{flexDirection:"row", flex: 1}}>
								<View style={styles.statCol}>
									<Text>128</Text>
									<Text>Posts</Text>
								</View>
								<View style={styles.statCol}>
									<Text>265</Text>
									<Text>Followers</Text>
								</View>
								<View style={styles.statCol}>
									<Text>184</Text>
									<Text>Following</Text>
								</View>
							</View>
							<View style={{
								flexDirection:"row", 
								width: 100 + "%", 
								flex: 1,
								justifyContent:"center",
								alignItems: "center",
								backgroundColor: 'rgb(239, 239, 239)'
							}}>
								<Text>Edit Profile</Text>
							</View>
						</View>
					</View>
					<View style={{flexDirection: "column", width: 100+"%"}}>
						<Text style={styles.fontBold}>Aaron Percival</Text>
						<Text style={styles.fontSm}>A React Native Developer Struggling to Spell</Text>
					</View>
				</View>
				<View style={styles.topBar}>
					<View style={styles.topBarIcon}></View>
					<View style={styles.topBarIcon}></View>
					<View style={styles.topBarIcon}></View>
					<View style={styles.topBarIcon}></View>
					<View style={styles.topBarIcon}></View>
				</View>
					<View style={styles.profilePicContainer}>
						{this.state.profilePics.map((pic, i)=> {
							return (
								<Image
									key={pic.id}
									style={styles.profilePicThumb}
									source={{ uri: "data:image/jpg;base64, " + pic.img }}
								/>
							);
						})}
					</View>
				</View>
			</ScrollView>
		)
	}
}

const styles = StyleSheet.create({
	profilePicContainer: {
		width: 100 + "%",
		flexDirection: "row",
		flexWrap: "wrap"
	},
	profilePicThumb: {
		width: config.styleConstants.oneThirdWidth,
		height: config.styleConstants.oneThirdWidth	
	},
	profileInfo: {
		width: 100 + "%",
		height: 180,
		display: 'flex',
		flexDirection: 'column',
		paddingVertical: 20
	},
	fontSm: {
		fontSize: 16
	},
	fontBold: {
		fontSize: 16,
		fontWeight: 'bold'
	},
	userPic: {
		height: 80,
		borderRadius: 40,
		width: 80
	},
	statCol: {
		flexDirection: "column", 
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
	topBar: {
		height: config.styleConstants.rowHeight, 
		width: 100 + "%",
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flexDirection: 'row'
	},
	topBarIcon: {
		borderTopWidth: StyleSheet.hairlineWidth,
		borderBottomWidth: StyleSheet.hairlineWidth,
		flex: 1
	}
});

const stateToProps = state => {
	return {
		user: state.account.user
	}
}

const dispatchToProps = dispatch => {
	return {
	}
}


export default connect(stateToProps, dispatchToProps)(Profile);
