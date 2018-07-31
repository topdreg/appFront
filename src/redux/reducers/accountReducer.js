import constants from '../constants'

var initialState = {
	user: {
		name: "testUser",
		id: "5b4e7e857612a9436cfd21c4"
	}
}

export default(state= initialState, action) => {
	switch(action.type) {
		case constants.USER_RECEIVED:
			console.log(action);
			return state;
		default:
			return state;
	}
}
