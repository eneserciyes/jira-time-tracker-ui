<template>
  <v-container class="reportsContainer">
    <v-row align="center" justify="center">
      <v-col cols="3">
        <h3 style="text-align: left">Individual Reports</h3>
      </v-col>
      <v-spacer />
      <v-col cols="4">
        <v-row class="fill-height" no-gutters justify="center" align="center">
          <date-picker-menu
            style="display: inline-block"
            @dateChanged="refreshWorklogData"
          ></date-picker-menu>
        </v-row>
      </v-col>
    </v-row>
    <v-divider></v-divider>
    <v-tabs v-model="tab">
      <v-tabs-slider color="yellow"></v-tabs-slider>
      <v-tab v-for="item in items" :key="item">
        {{ item }}
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="tab">
      <v-tab-item>
        <j-worklog-table
          style="margin-top: 20px"
          :data="allWorklogs"
          :start-date="startDate"
          :end-date="endDate"
        ></j-worklog-table>
      </v-tab-item>
      <v-tab-item>
        <j-daily-charts-tab />
      </v-tab-item>
      <v-tab-item> </v-tab-item>
    </v-tabs-items>
  </v-container>
</template>

<script>
import DatePickerMenu from '@/components/date-picker-menu'
import WorklogRetrievalService from '@/service/time-tracker/WorklogRetrievalService'
import JWorklogTable from '@/components/j-worklog-table'
import JDailyChartsTab from '@/components/j-daily-charts-tab'

export default {
  name: 'ReportsVue',
  components: { JDailyChartsTab, JWorklogTable, DatePickerMenu },
  data() {
    return {
      tab: null,
      items: ['Required Worklog Table', 'Daily Chart', 'Export Report'],
      allWorklogs: null,
      weekDayCount: 0,
      startDate: '',
      endDate: ''
    }
  },
  methods: {
    refreshWorklogData({ startDate, endDate }) {
      this.startDate = startDate
      this.endDate = endDate
      this.allWorklogs = WorklogRetrievalService.retrieveAllWorklogs(
        startDate,
        endDate
      ).then((res) => {
        return res.data.worklogs.reduce((r, a) => {
          r[a.author.key] = [...(r[a.author.key] || []), a]
          return r
        }, {})
      })
    }
  }
}
</script>

<style></style>
