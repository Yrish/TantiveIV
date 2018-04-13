const mongoose = require('mongoose')
const wsErrors = require('../services/message/error')
const wsMessage = require('../services/message/message')
const types = require('../services/message/types')

const login = (username, password, ws) => {
  if (username.username) {
    username = username.username
    password = username.password
  }
  let problem, reason
  if (!username) {
    problem =  "NEED_USERNAME"
    reason = "username field can not be blank"
  }
  if (!password) {
    problem = "NEED_PASSWORD"
    reason = "password field can not be blank"
  }
  if (problem) {
    if (!ws) {
      return problem
    }
    ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
    return
  }
  mongoose.models.user.findOne({username}, (err, account) => {
    if (err) {
      console.error(err)
      return
    }
    if (!account) {
      problem =  "BAD_USERNAME"
      reason = "incorrect username"
      if (problem) {
        if (!ws) {
          return problem
        }
        ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
        return
      }
    }
    validatePassword(password, account.password, (err, res) => {
      if (!res) {
        problem = "BAD_PASSWORD"
        reason = "incorrect password"
        if (problem) {
          if (!ws) {
            return problem
          }
          ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
          return
        }
      }
      console.log(`signed in as ${res.username}`)
      if (!ws) {
        return res
      }
      ws.send(wsMessage.makesendable(wsMessage.make(types.LOG_IN_SUCCESSFULL, {user})))
    })
  })
}

const register = (account, ws) => {
  let problem

  if (!account.username) {
    problem = "USER_NAME_NEEDED"
    reason = "username field can not be left blank"
    if (problem) {
      if (!ws) {
        return problem
      }
      ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
      return
    }
  }

  mongoose.models.user.findOne({username: account.username}, (err, res) => {
    if (res) {
      problem = "USER_NAME_TAKEN"
      reason = "username taken, username must be unique"
      if (problem) {
        if (!ws) {
          return problem
        }
        ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
        return
      }
    }
    if (!account.password) {
      problem = "PASSWORD_NEEDED"
      reason = "password field can not be left blank"
      if (problem) {
        if (!ws) {
          return problem
        }
        ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
        return
      }
    }
    if (!account.email) {
      problem = "EMAIL_NEEDED"
      reason = "email field can not be left blank"
      if (problem) {
        if (!ws) {
          return problem
        }
        ws.send(wsMessage.makesendable(wsErrors.makeAccountError(problem, reason)))
        return
      }
    }
    let user = new mongoose.models.user(account)
    console.log(`registered account ${account.username}`)
    user.save()
    if (!ws) {
      return user
    }
    ws.send(wsMessage.makesendable(wsMessage.make(types.REGISTER_SEUCCESSFULL, {user})))
  })
}

let validatePassword = (plainPass, hashedPass, callback) => {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

module.exports = {register, login}
