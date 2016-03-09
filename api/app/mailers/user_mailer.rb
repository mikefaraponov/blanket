class UserMailer < ApplicationMailer

  default from: "blanket@ps.com"

  def welcome_email(to)
    @to = to
    @url  = 'http://blanket.io/login'
    mail(to: @to.email, subject: 'blanket | messaging')
  end

  def email(from, to)
    @to = to
    @from = from
    @url  = 'http://blanket.io/login'
    mail(to: @to.email, subject: 'blanket | messaging')
  end

end
