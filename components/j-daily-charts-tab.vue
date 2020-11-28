<template>
  <v-row class="fill-height">
    <v-col cols="3">
      <v-list subheader two-line>
        <v-subheader inset>Team</v-subheader>

        <v-list-item v-for="issue in issues" :key="issue.key">
          <v-list-item-avatar>
            <img
              v-if="issue.assignee"
              :src="issue.assignee.avatarUrls['48x48']"
              alt="assignee"
            />
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
      <j-stacked-bar :chartdata="dailyChartData"></j-stacked-bar>
    </v-col>
  </v-row>
</template>

<script>
import JStackedBar from '@/components/charts/j-stacked-bar'
export default {
  name: 'JDailyChartsTab',
  components: { JStackedBar },
  props: {
    dailyChartData: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
