<template>
  <span style="order: 1">
    <v-dialog v-model="dialog" persistent max-width="30%">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          v-bind="attrs"
          height="50px"
          width="95%"
          depressed
          class="addWorklogButton"
          color="white"
          v-on="on"
        >
          <div class="addWorklogButtonHovered">
            <span>
              Log Time
            </span>
          </div>
          <span class="plusIcon"><v-icon>mdi-plus</v-icon></span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Log Time</span>
        </v-card-title>
        <!--TODO: Issue selected validation-->
        <v-card-text>
          <v-form v-model="isFormValid">
            <v-row dense>
              <v-col cols="12">
                <j-issue-autocomplete
                  ref="issueAutocomplete"
                  @issueSelected="setSelectedIssue"
                />
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="comment"
                  label="Description"
                  outlined
                  no-resize
                ></v-textarea>
              </v-col>
              <v-col cols="12" md="6">
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
              <v-col cols="12" md="6">
                <v-text-field
                  v-model="remainingEstimate"
                  prepend-icon="mdi-av-timer"
                  outlined
                  label="Remaining Estimate"
                  required
                ></v-text-field>
                <v-spacer />
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="clearDialogAndClose"
            >Close</v-btn
          >
          <v-btn
            color="blue darken-1"
            text
            :disabled="!isFormValid"
            @click="addWorklog"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </span>
</template>

<script>
import WorklogCreationService from '@/service/time-tracker/WorklogCreationService'
import JIssueAutocomplete from '@/components/autocomplete/j-issue-autocomplete'

export default {
  name: 'JWorklogAddButton',
  components: { JIssueAutocomplete },
  props: {
    date: {
      type: String,
      default: ''
    },
    onSaveRefresh: {
      type: Function,
      default: () => {}
    }
  },
  data: () => ({
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
  }),
  methods: {
    addWorklog() {
      WorklogCreationService.addWorklog({
        issueKey: this.selectedIssueKey,
        worklogExplanation: this.comment,
        started: new Date(this.date),
        timeSpentSeconds: this.worked * 3600
      }).then((res) => {
        debugger
        if (res.data) this.$emit('addedWorklog')
      })
      this.clearDialogAndClose()
    },
    setSelectedIssue({ selectedItem }) {
      this.selectedIssueKey = selectedItem
    },
    clearDialogAndClose() {
      this.comment = ''
      this.selectedIssueKey = ''
      this.worked = ''
      this.remainingEstimate = ''

      this.$refs.issueAutocomplete.clear()
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.addWorklogButton {
  color: #501537;
  opacity: 0;
  margin: 5px auto;
  padding: 4px 8px;
}

.addWorklogButtonHovered {
  display: none;
}

.addWorklogButton:hover .addWorklogButtonHovered {
  display: flex;
  flex-direction: row;
}

.addWorklogButton:hover .plusIcon {
  display: none;
}
</style>
