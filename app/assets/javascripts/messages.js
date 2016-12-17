$(document).ready(function(){
  
  var ractive = new Ractive({
  	el: "#container",
  	template: "#messages"
  });

  ractive.on({
  	select_message: function(ev, id){
  		for(var key in store.getState().messages){
  			// if(store.getState().messages[key].id == id){
  			// 	this.set('message', store.getState().messages[key]);
  			// }
  		}
  	},
  	edit_message: function(ev, id){
  		store.dispatch(edit(id));
  		ractive.set("messages", store.getState().messages);
  		//$('#edit').hide();
  	},
  	delete_message: function(ev, id){
  		store.dispatch(delete_message(id));
  		//ractive.set("messages", store.getState().messages);
  	}
  });

  $('#load_button').on('click', function(){
  	$.ajax({
  		url: "/load_messages",
  		type: 'GET',
  		success: function(resp){
  			store.dispatch(load_messages(resp));
  			ractive.set("messages", store.getState().messages)
  		}
  	})
  });
});