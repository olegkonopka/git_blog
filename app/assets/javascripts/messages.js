$(document).ready(function(){
  
  var ractive = new Ractive({
  	el: "#container",
  	template: "#messages"
  });

  ractive.on({
  	select_message: function(ev, message){
  		// console.log(message);
  		store.dispatch(view_message(message));
  		this.set(store.getState());
  	},
  	edit_message: function(ev, message){
  		$.ajax({
  			url: "/edit_message",
  			type: "POST",
  			data: {"message": message},
  			success: function(resp){
  				if(resp){
  					store.dispatch(edit_message(resp));
  					ractive.set(store.getState());
  				}
  			}
  		})
  	},
  	delete_message: function(ev, message){
  		$.ajax({
  			url: "/delete",
  			type:  "POST",
  			data: {"id": message.id},
  			success: function(resp){
  				store.dispatch(load_messages(resp));
  			}
  		})
  		ractive.set(store.getState());
  	},
  	add_message: function(ev){
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
  			}
  		})
  	}
  });
	// store.subscribe(ractive.render_messages);

  $('#load_button').on('click', function(){
  	$.ajax({
  		url: "/load_messages",
  		type: 'GET',
  		success: function(resp){
  			store.dispatch(load_messages(resp));
  			ractive.set(store.getState())
  		}
  	})
  });
});