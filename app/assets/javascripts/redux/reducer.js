var LOAD_MESSAGES = 'LOAD_MESSAGES';
var EDIT_MESSAGE = 'EDIT_MESSAGE';
var DELETE_MESSAGE = 'DELETE_MESSAGE';

function load_messages(data){
	return {
		type: LOAD_MESSAGES,
		payload: data
	}
}

function edit(id){
	return {
		type: EDIT_MESSAGE,
		payload: id
	}
}

function delete_message(id){
	return {
		type: DELETE_MESSAGE,
		payload: id
	}
}

var initialState = {
	messages: []
}

function reducer(state, action){
	if(typeof state === 'undefined'){
		return initialState
	}
	switch(action.type){
		case LOAD_MESSAGES:
			var new_state = $.extend(true, {}, state);
			new_state.messages = action.payload
			return new_state
		case EDIT_MESSAGE:
			state.messages.map((message, id) => {
				if(id === action.id){
					return $.extend(true, {
						id: action.id,
						title: action.title,
						description: action.description
					}, state)
				}
				return message
			})
		case DELETE_MESSAGE:
			var message_id = action.message;
			return store.getState().messages.filter(message => message.id !== message_id)
		default:
			return state
	}
}

var store = Redux.createStore(reducer);


