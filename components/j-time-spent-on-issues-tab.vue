<template>
  <v-row class="fill-height">
    <v-col cols="3">
      <v-list subheader two-line>
        <v-subheader inset>Issues In This Sprint</v-subheader>

        <v-list-item v-for="issue in issues" :key="issue.key">
          <v-list-item-avatar>
            <img
              v-if="issue.assignee"
              :src="issue.assignee.avatarUrls['48x48']"
              alt="assignee"
            />
            <img v-else src="../assets/user.png" alt="unassigned" />
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="issue.summary"></v-list-item-title>

            <v-list-item-subtitle v-text="issue.key"></v-list-item-subtitle>
          </v-list-item-content>

          <v-list-item-action>
            <v-btn icon>
              <v-icon color="grey lighten-1">mdi-information</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-list>
    </v-col>
    <v-col cols="9">
      <j-doughnut-chart :data="doughnutData"></j-doughnut-chart>
    </v-col>
  </v-row>
</template>

<script>
import JDoughnutChart from '@/components/charts/j-doughnut-chart'

export default {
  name: 'JTimeSpentOnIssuesTab',
  components: { JDoughnutChart },
  props: {
    issues: {
      type: Object,
      default: () => {}
    },
    doughnutData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
