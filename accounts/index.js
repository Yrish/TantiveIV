const mongoose = require('mongoose')
const wsErrors = require('../services/message/error')
const wsMessage = require('../services/message/message')
const types = require('../services/message/types')
const crypto = require('crypto')
const modelUtils = require('../models/utils')
const messageFunctions = require('../services/message/functions')

const login = (username, password, req, ws) => {
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
      console.log(`signed in as ${account.username}`)
      if (!ws) {
        return account
      }
      if (ws.session) {
        ws.session.userID = account._id
        ws.session.save()
        ws.user = account
      }
      let user = modelUtils.getPersonalData(account)
      ws.send(wsMessage.makesendable(wsMessage.make(types.LOG_IN_SUCCESSFULL, {user})))
      messageFunctions.getNotebooks({}, ws)
    })
  })
}

const logout = (ws) => {
  console.log("logging out")
  if(ws.session) {
    if (ws.session.userID) {
      delete ws.session.userID
      ws.session.save()
    }
  }
  if (ws.user) {
    delete ws.user
  }
  ws.send(wsMessage.makesendable(wsMessage.make(types.SIGN_OUT_SUCCESSFULL, null)))
  ws.send(wsMessage.makesendable(wsMessage.make(types.SET_NOTEBOOKS, {notebooks: []})))
}

const register = (account, req, ws) => {
  console.log(Object.keys(req))
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
    saltAndHash(account.password, (encryptedpassword) => {
      console.log(`Encrytped Password: ${encryptedpassword}`)
      let oldpassword = account.password
      account.password = encryptedpassword
      let user = new mongoose.models.user(account)
      console.log(user.username)
      console.log(`registered account ${account.username}`)
      user.save()
      if (!ws) {
        return user
      }
      ws.user = user
      if (ws.session) {
        ws.session.userID = user._id
        ws.session.save()
      }
      ws.send(wsMessage.makesendable(wsMessage.make(types.REGISTER_SEUCCESSFULL, {user})))
      login(user.username, oldpassword, req, ws)
    })
  })
}

let validatePassword = (plainPass, hashedPass, callback) => {
	var salt = hashedPass.substr(0, 10);
	var validHash = salt + md5(plainPass + salt);
	callback(null, hashedPass === validHash);
}

let saltAndHash = (pass, callback) => {
	var salt = generateSalt();
	callback(salt + md5(pass + salt));
}

let generateSalt = () => {
	var set = '0123456789abcdefghijklmnopqurstuvwxyzABCDEFGHIJKLMNOPQURSTUVWXYZ';
	var salt = '';
	for (var i = 0; i < 10; i++) {
		var p = Math.floor(Math.random() * set.length);
		salt += set[p];
	}
	return salt;
}

let md5 = (str) => {
	return crypto.createHash('md5').update(str).digest('hex');
}

module.exports = {register, login, logout}
