$(document).ready(function(){
  
  var ractive_messages = new Ractive({
  	el: "#container",
  	template: "#messages"
  });
  window.ractive = ractive_messages;

  var ractive_message = new Ractive({
  	el: "#message",
  	template: "#js_message"
  });
  ractive_message.on({
  	save_message: function(ev, message){
  		$.ajax({
  			url: "/edit_message",
  			type: "POST",
  			data: {"message": message},
  			success: function(resp){
  				if(resp){
  					store.dispatch(edit_message(resp));
  					ractive_messages.set(store.getState());
  				}
  			}
  		})
  		
  	},
  	add_message: function(ev){
  		$('#add_message').hide();
  		$('#create_message').show();
  		store.dispatch(add_message({id: "", title: "", description: ""}));
  		this.set(store.getState());
  	},
  	create_message: function(ev, message){
  		$.ajax({
  			url: "/create_message",
  			type: "POST",
  			data: {"message": message},
  			success: function(resp){
  				console.log(resp);
  				ractive_messages.set(store.getState());
  			}
  		})
  	}
  });

  ractive_messages.on({
  	select_message: function(ev, message){
  		console.log(message);
  		store.dispatch(view_message(message));
  		ractive_message.set("message", store.getState().message);
  		ractive_message.set("titles", ['title1', 'title2', 'title3']);
  	},
  	edit_message: function(ev, message){
  	},
  	delete_message: function(ev, message){
  		$.ajax({
  			url: "/delete",
  			type:  "POST",
  			data: {"id": message.id},
  			success: function(resp){
  				store.dispatch(load_messages(resp));
  				ractive_messages.set(store.getState());
  			}
  		})
  		ractive_messages.set(store.getState());
  	}
  });
	// store.subscribe(ractive_messages.render_messages);

  $('#load_button').on('click', function(){
  	$.ajax({
  		url: "/load_messages",
  		type: 'GET',
  		success: function(resp){
  			store.dispatch(load_messages(resp));
  			ractive_messages.set(store.getState())
  		}
  	})
  });
});