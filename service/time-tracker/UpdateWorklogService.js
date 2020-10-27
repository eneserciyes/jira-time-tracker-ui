import Api from '@/service/Api'

export default {
  updateWorklog(body) {
    return Api().put('/time-tracker/tracker/worklogs', body)
  }
}
