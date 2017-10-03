class PagesController < ApplicationController
  def home
    @first_quote_id = Quote.first
  end
end
