module FromBase64

  def self.decode(base64)
    regexp = /\Adata:([-\w]+\/[-\w\+\.]+)?;base64,(.*)/m
    type_and_data = regexp.match(base64)
    mime_type = type_and_data[1]
    {
      data: Base64.decode64(type_and_data[2]),
      mime_type: mime_type,
      extension: mime_type[(mime_type =~ /(?<=\/).*$/) .. -1]
    }
  end

end
