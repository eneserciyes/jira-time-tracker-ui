import Api from '@/service/Api'

export default {
  retrieveIndividualReportsData(start, end) {
    return Api().get('/time-tracker/tracker/individual-report', {
      headers: { 'X-auth-user': 'admin' },
      params: { startDate: start, endDate: end }
    })
  }
}
