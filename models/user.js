// User model ( local )
class User {
  constructor(username, email, password) {
    this.username = username
    this.email = email
    this.password = password
    this.id = Date.now()
  }
}

module.exports = User