<template>
  <div class="vuecal__event-container">
    <div class="vuecal__event-title">{{ worklog.title }}</div>
    <div class="vuecal__event-explanation">
      {{ worklog.explanation }}
    </div>
    <div class="vuecal__event-footer">
      <v-icon small> mdi-check-outline </v-icon>
      <div class="issueKey">{{ worklog.issueKey }}</div>
      <strong class="timeSpent"> {{ worklog.timeSpent }}</strong>
    </div>
  </div>
</template>

<script>
export default {
  name: 'JEvent',
  props: {
    worklog: {
      type: Object,
      default: () => {}
    }
  }
}
</script>

<style scoped></style>
