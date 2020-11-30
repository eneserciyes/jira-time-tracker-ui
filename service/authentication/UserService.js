import Api from '@/service/Api'

export default {
  getByUsername(identifier) {
    return Api().get('/authentication/users' + identifier)
  },
  getAll() {
    return Api().get('/authentication/users')
  },
  register(body) {
    return Api().post('/authentication/users', body)
  },
  registerJiraUser(body) {
    return Api().post('/authentication/users/jira', body)
  },
  update(body) {
    return Api().put('/authentication/users', body)
  }
}
