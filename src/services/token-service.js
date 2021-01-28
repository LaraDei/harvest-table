import config from '../config'

const TokenService = {
  hasAuthToken() {
    return !!TokenService.getAuthToken()
  },
  saveAuthToken(token) {
    window.localStorage.setItem(config.TOKEN_KEY, token)
  },
  saveUserName(user_name){
    window.localStorage.setItem(config.USER_NAME, user_name)
  },
  saveUserId(user_id){
    window.localStorage.setItem(config.USER_ID, user_id)
  },
  getAuthToken() {
    return window.localStorage.getItem(config.TOKEN_KEY)
  },
  clearAuthToken() {
    console.info('clearing the auth token')
    window.localStorage.removeItem(config.TOKEN_KEY)
  },

  makeBasicAuthToken(userName, password) {
    return window.btoa(`${userName}:${password}`)
  },
}

export default TokenService