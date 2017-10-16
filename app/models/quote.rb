class Quote < ApplicationRecord
  def next_id
      self.class.where('id > ?', self.id).pluck(:id).first
    end

    def previous_id
      self.class.where('id < ?', self.id).pluck(:id).last
    end

    def last_id
      self.class.pluck(:id).last
    end
end
