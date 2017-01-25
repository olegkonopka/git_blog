var LOAD_MESSAGES = 'LOAD_MESSAGES';
var EDIT_MESSAGE = 'EDIT_MESSAGE';
var DELETE_MESSAGE = 'DELETE_MESSAGE';
var VIEW_MESSAGE = 'VIEW_MESSAGE';
var ADD_MESSAGE = 'ADD_MESSAGE';
var CREATE_MESSAGE = "CREATE_MESSAGE"

function load_messages(data){
	return {
		type: LOAD_MESSAGES,
		payload: data
	}
}

function view_message(data){
	return{
		type: VIEW_MESSAGE,
		payload: data
	}
}

function edit_message(data){
	return {
		type: EDIT_MESSAGE,
		payload: data
	}
}

function delete_message(id){
	return {
		type: DELETE_MESSAGE,
		payload: id
	}
}

function add_message(data){
	return{
		type: ADD_MESSAGE,
		payload: data
	}
}

function create_message(data){
	return{
		type: CREATE_MESSAGE,
		payload: data
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
		case VIEW_MESSAGE:
			var new_state = $.extend(true, {}, state);
			new_state.message = action.payload
			return new_state		
		case EDIT_MESSAGE:
			var new_state = $.extend(true, {}, state);
			new_state.messages.map((message, index) => {
				if(new_state.messages[index].id === action.payload.id){
					new_state.messages[index] = {
						id: action.payload.id,
						title: action.payload.title,
						description: action.payload.description
					};
				}
			})
			return new_state.messages
		case DELETE_MESSAGE:
			var message_id = action.message;
			return store.getState().messages.filter(message => message.id !== message_id)
		case ADD_MESSAGE:
			var new_state = $.extend(true,{},{});
			new_state.message = action.payload
			return new_state
		case CREATE_MESSAGE:
			var new_state = $.extend(true, {}, state);
			new_state.message = action.payload
		default:
			return state
	}
}

var store = Redux.createStore(reducer);


