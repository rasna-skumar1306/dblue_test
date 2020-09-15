const initialState = {
	currentPage: "add",
};

const pageReducer = (state = initialState, action) => {
	switch (action.type) {
		case "SET_PAGE":
			return {
				...state,
				currentUser: action.payload,
			};

		default:
			return state;
	}
};

export default pageReducer;
