import Cookie from 'js-cookie'
import ObjectUtils from '~/service/Utils/ObjectUtils'
import {ApplicationUser} from '~/model/ApplicationUser'

export default {
  state: {
    loggedInUser: ApplicationUser,
    setUp: {
      type: Boolean,
      default: true
    }
  },
  mutations: {
    login(state, loggedInUser) {
      state.loggedInUser = JSON.parse(JSON.stringify(loggedInUser))
    },
    logout(state) {
      Cookie.remove('X-Auth-User')
      Cookie.remove('X-Auth-Token')

      localStorage.removeItem('X-Auth-User')
      state.loggedInUser = null
    }
  },
  actions: {
    initAuth(vuexContext, req) {
      console.log('initAuth')
      if (req) {
        const cookies = req.headers.cookie.split(';')
        const user = ObjectUtils.parseUserFromCookie(cookies)
        if (user) {
          vuexContext.commit('login', user)
        }
      } else {
        const user = JSON.parse(localStorage.getItem('X-Auth-User'))
        if (user) {
          vuexContext.commit('login', user)
        }
      }
    },
    login(vuexContext, loggedInUser) {
      Cookie.set('X-Auth-User', JSON.stringify(loggedInUser))
      Cookie.set('X-Auth-Token', loggedInUser.token)
      localStorage.setItem('X-Auth-User', JSON.stringify(loggedInUser))

      vuexContext.commit('login', loggedInUser)
    },
    logout(vuexContext) {
      vuexContext.commit('logout')
    }
  },
  getters: {
    getLoggedInUser(state) {
      return state.loggedInUser
    },
    isAuthenticated(state) {
      return state.loggedInUser && state.loggedInUser.isLoggedIn
    }
  }
}
