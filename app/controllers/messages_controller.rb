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
  	render json: @message
  end

  def delete
  	id = params[:id]
  	@message = Message.find(id)
  	@message.destroy
  	@messages = Message.all
  	render json: @messages
  end

  def create_message
  	result = params[:message]
  	@message = Message.create!(title: result['title'], description: result['description'])
  	render json: @message
  end

end
