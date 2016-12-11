class MessagesController < ApplicationController
  def index
  end

  def load_messages
  	@messages = Message.all
  	render json: @messages
  end
end
