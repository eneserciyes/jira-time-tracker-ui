import Api from '@/service/Api'

export default {
  retrieveIndividualReportsData(start, end) {
    return Api().get('/time-tracker/tracker/individual-report', {
      params: { startDate: start, endDate: end }
    })
  }
}
