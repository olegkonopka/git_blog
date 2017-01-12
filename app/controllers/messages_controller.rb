class MessagesController < ApplicationController
  def index
  end

  def load_messages
  	@messages = Message.all
  	render json: @messages
  end

  def edit_message
  	mess_id = params[:message]
  	p mess_id
  	@message = Message.find(mess_id['id'])
  	@message.update_attributes(id: mess_id['id'], title: mess_id['title'], description: mess_id['description'])
  	redirect_to :action => :index
  end
end
