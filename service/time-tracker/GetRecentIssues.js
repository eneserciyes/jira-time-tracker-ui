import Api from '@/service/Api'

export default {
  getRecentIssues() {
    return Api().get('time-tracker/tracker/issues')
  }
}
