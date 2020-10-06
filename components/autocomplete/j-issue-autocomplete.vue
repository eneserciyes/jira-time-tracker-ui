<template>
  <v-autocomplete
    v-model="model"
    :items="items"
    :loading="isLoading"
    :search-input.sync="search"
    hide-no-data
    hide-selected
    clearable
    label="Issues"
    item-text="key"
    item-value="key"
    placeholder="Start typing to search"
    @change="$emit('issueSelected', { selectedItem: model })"
  ></v-autocomplete>
</template>

<script>
import GetRecentIssues from '@/service/time-tracker/GetRecentIssues'

export default {
  name: 'JIssueAutocomplete',
  data() {
    return {
      entries: [],
      isLoading: false,
      model: null,
      search: null
    }
  },
  computed: {
    items() {
      return this.entries
    }
  },
  mounted() {
    if (this.items.length > 0) return

    // Items have already been requested
    if (this.isLoading) return

    this.isLoading = true

    GetRecentIssues.getRecentIssues()
      .then((res) => res.data)
      .then((res) => {
        this.entries = res.issues
      })
      .catch((err) => {
        console.log(err)
      })
      .finally(() => (this.isLoading = false))
  }
}
</script>

<style scoped></style>
