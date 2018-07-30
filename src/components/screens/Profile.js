import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import config from '../../config';

class Profile extends Component {

	constructor(){
		super();
		this.state = {
			userId: "5b4e7e857612a9436cfd21c4",
			profilePics: []
		};
	}

	componentDidMount() {
		this._navListener = this.props.navigation.addListener('didFocus', () => {
			console.log(this.props.navigation.state.params);
		});
		fetch(`${config.baseUrl}photo?id=${this.state.userId}`, {
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
			<View 
				style={{
					height: 100+'%', 
					width: 100+'%', 
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center'
				}}
				onPress={()=>{this.login();}}
			>
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
	}
});


export default Profile;
