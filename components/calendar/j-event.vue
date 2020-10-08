<template>
  <v-dialog v-model="dialog" persistent max-width="25%">
    <template v-slot:activator="{ on, attrs }">
      <div
        class="vuecal__event-container"
        v-bind="attrs"
        v-on="on"
        @click="setDialogFields"
      >
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
    <v-card>
      <v-card-title>
        <span class="headline">Log Time</span>
      </v-card-title>
      <v-card-text>
        <v-form v-model="isFormValid">
          <v-row dense>
            <v-col cols="12">
              <v-textarea
                v-model="comment"
                label="Description"
                outlined
                no-resize
              ></v-textarea>
            </v-col>
            <v-col cols="6" md="6">
              <v-text-field
                v-model="worked"
                validate-on-blur
                :rules="[rules.required, rules.correctFormat]"
                prepend-icon="mdi-briefcase"
                outlined
                label="Worked*"
                required
              ></v-text-field>
            </v-col>
            <v-spacer />
            <v-col cols="6" md="6">
              <v-text-field
                v-model="remainingEstimate"
                prepend-icon="mdi-av-timer"
                outlined
                label="Remaining Estimate"
                required
              ></v-text-field>
            </v-col>
            <v-spacer />
          </v-row>
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn
          color="blue darken-1"
          text
          :disabled="!isFormValid"
          @click="updateWorklog"
        >
          Update
        </v-btn>
        <v-btn color="blue darken-1" text @click="clearDialogAndClose">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import UpdateWorklogService from '@/service/time-tracker/UpdateWorklogService'

export default {
  name: 'JEvent',
  props: {
    worklog: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      dialog: false,
      selectedIssueKey: '',
      comment: '',
      worked: '',
      remainingEstimate: '',
      isFormValid: false,
      rules: {
        required: (value) => !!value || 'Required.',
        correctFormat: (value) => {
          const regex = new RegExp('((2[0-4]|1[0-9]|[1-9])?\\s*(.)?[0-9]?(h)?)')
          console.log('Regex test: ' + regex.test(value))
          if (regex.test(value)) {
            return true
          } else {
            return 'Invalid format'
          }
        }
      }
    }
  },
  methods: {
    updateWorklog() {
      UpdateWorklogService.updateWorklog({
        id: this.worklog.id,
        issueKey: this.worklog.issueKey,
        worklogExplanation: this.comment,
        started: new Date(this.date),
        timeSpentSeconds: this.worked * 3600
      }).then((res) => {
        debugger
        if (res.data) this.$emit('updatedWorklog')
      })
      this.clearDialogAndClose()
    },
    clearDialogAndClose() {
      this.comment = ''
      this.selectedIssueKey = ''
      this.worked = ''
      this.remainingEstimate = ''
      this.dialog = false
    },
    setDialogFields() {
      this.comment = this.worklog.explanation
      this.worked = this.worklog.timeSpent
    }
  }
}
</script>

<style scoped></style>
