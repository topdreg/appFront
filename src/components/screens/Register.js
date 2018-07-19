import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, Button, StyleSheet } from 'react-native';
import config from "../../config";

class Register extends Component {

	constructor(){
		super();
		this.state = {
			credentials: {
				login: "",
				password: ""
			}
		};
	}

	updateText(text, field) {
		let newCredentials = Object.assign(this.state.credentials);
		newCredentials[field] = text;
		this.setState({
			credentials: newCredentials
		});
	}

	register() {
		fetch(config.baseUrl + "signup", {
			  method: 'POST',
			  headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
			  body: JSON.stringify(this.state.credentials) 
		});
		this.props.navigation.navigate("main");
	}

	render() {
		return (
			<View
				style={{
					height: 100+'%', 
					width: 100+'%', 
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: "rgb(252,61,57)"
				}}
			>
				<Text>REGISTER PAGE</Text>
				<TextInput 
					value={this.state.login}
					placeholder="Username" 
					style={styles.input} 
					autoCorrect={false}
					onChangeText={text => this.updateText(text, 'login')}
				/>
				<TextInput 
					value={this.state.password}
					onChangeText={text => this.updateText(text, 'password')}
					secureTextEntry 
					autoCorrect={false}
					placeholder="Password" 
					style={styles.input} 
				/>
				<Button 
					onPress = {() => {
						this.register();
					}}
					title="Signup" 
				/>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: 100 + "%",
		marginHorizontal: 20,
		backgroundColor: "rgb(255,255,255)",
		marginBottom: 10
	}
})

export default Register;
