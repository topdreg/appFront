'use strict';
import React, { Component } from 'react';
import {
	  AppRegistry,
	  Dimensions,
	  StyleSheet,
	  Text,
	  TouchableOpacity,
	  View
} from 'react-native';
import { RNCamera } from 'react-native-camera';
import config from "../../config";

class Camera extends Component {

	constructor(props) {
		super(props);
	}

	//Largely taken from RNCamera docs
	render() {
		return (
			<View style={styles.container}>
				<RNCamera 
					ref={ref => {
						this.camera = ref;
					}}
					style = {styles.preview}
					type={RNCamera.Constants.Type.back}
					flashMode={RNCamera.Constants.FlashMode.on}
					permissionDialogTitle={'Permission to use camera'}
					permissionDialogMessage={'We need your permission to use your camera phone'}
				/>
				<View style={{flex: 0, flexDirection: 'row', justifyContent: 'center'}}>
					<TouchableOpacity
						onPress={this.takePicture.bind(this)}
						style={styles.capture}
					>
						<Text style={{fontSize: 14}}> SNAP </Text>
					</TouchableOpacity>	
				</View>
			</View>
		);
	}

	//function to take picture and then pass to appBack
	takePicture = async function() {
		if (this.camera) {
			const options = { quality: 0.5, base64: true};
			const imageData = await this.camera.takePictureAsync(options)
			const response = await fetch(
				config.baseUrl + "/users/" + this.state.userId + "/photo", {
					method: 'POST',
					headers: {
						Accept: 'application/json',
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(imageData) 
			});
			const myjson = await response.json();
			const { data } = myjson;
			this.props.navigation.navigate("profile", {
				newPic: data
			});
		}
	};
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'column',
		backgroundColor: 'black'
	},
	preview: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center'
	},
	capture: {
		flex: 0,
		backgroundColor: '#fff',
		borderRadius: 5,
		padding: 15,
		paddingHorizontal: 20,
		alignSelf: 'center',
		margin: 20
	}
});

export default Camera;
