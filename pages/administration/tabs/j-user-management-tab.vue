<template>
  <v-card>
    <v-row class="fill-height">
      <v-spacer></v-spacer>
      <v-col cols="4">
        <v-row style="margin-right: 20px" justify="end">
          <v-menu bottom offset-y>
            <template v-slot:activator="{ on, attrs }">
              <v-btn v-bind="attrs" v-on="on">Add Users from JIRA</v-btn>
            </template>
            <v-list dense>
              <v-list-item-group color="primary">
                <v-list-item>
                  <v-list-item-content>
                    <v-dialog
                      v-model="dialog"
                      fullscreen
                      hide-overlay
                      transition="dialog-bottom-transition"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-list-item-title v-bind="attrs" v-on="on">
                          Search by username
                        </v-list-item-title>
                      </template>
                      <v-card>
                        <v-card-title class="headline grey lighten-2">
                          Search by username
                        </v-card-title>
                        <v-text-field
                          v-model="searchQuery"
                          style="width: 300px; margin: 20px"
                          label="Username"
                          outlined
                          placeholder="Type to search users.."
                        ></v-text-field>
                        <v-btn @click="searchUsers(searchQuery)">Search</v-btn>
                        <h3 style="margin:20px">User List</h3>
                        <v-list v-if="searchedUsers" two-line>
                          <v-list-item
                            v-for="user in searchedUsers"
                            :key="user.resourceId"
                          >
                            <v-list-item-avatar>
                              <img
                                v-if="user.avatarUrls"
                                :src="user.avatarUrls['48x48']"
                                alt="avatar"
                              />
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title
                                v-text="user.displayName"
                              ></v-list-item-title>
                              <v-list-item-subtitle
                                v-text="user.name"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                            <v-list-item-action>
                              <v-btn v-bind="attrs" icon @click="addUser(user)">
                                <v-icon color="grey lighten-1"
                                  >mdi-plus-circle-outline</v-icon
                                >
                              </v-btn>
                            </v-list-item-action>
                          </v-list-item>
                        </v-list>
                        <p v-else style="margin:20px">No user</p>
                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn
                            color="primary"
                            text
                            @click="closeSearchDialog"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-dialog>
                  </v-list-item-content>
                </v-list-item>
                <v-list-item>
                  <v-list-item-content>
                    <v-list-item-title
                      >Add all from a project</v-list-item-title
                    >
                  </v-list-item-content>
                </v-list-item>
              </v-list-item-group>
            </v-list>
          </v-menu>
        </v-row>
      </v-col>
      <v-col cols="12">
        <v-list subheader two-line>
          <v-list-item v-for="user in users" :key="user.resourceId">
            <v-list-item-avatar>
              <img v-if="user.avatarUrl" :src="user.avatarUrl" alt="avatar" />
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title v-text="user.displayName"></v-list-item-title>

              <v-list-item-subtitle
                v-text="user.username"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-col>
    </v-row>
    <v-snackbar v-model="snackbar">
      User is added
      <template v-slot:action="{ attrs }">
        <v-btn color="pink" text v-bind="attrs" @click="snackbar = false">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-card>
</template>

<script>
import UserService from '@/service/authentication/UserService'
import IntegrationService from '@/service/integration/IntegrationService'

export default {
  name: 'JUserManagementTab',
  data() {
    return {
      users: [],
      searchedUsers: [],
      dialog: '',
      searchQuery: '',
      snackbar: false
    }
  },
  mounted() {
    this.getUsers()
  },
  methods: {
    getUsers() {
      UserService.getAll().then((res) => {
        this.users = res.data
      })
    },
    searchUsers(searchQuery) {
      IntegrationService.searchJiraUsers(searchQuery).then((res) => {
        this.searchedUsers = res.data
      })
    },
    closeSearchDialog() {
      this.dialog = false
      this.searchedUsers = []
      this.searchQuery = ''
    },
    addUser(user) {
      UserService.registerJiraUser(user)
        .then((res) => {
          if (res.status === 200) this.snackbar = true
        })
        .then((res) => {
          this.getUsers()
        })
    }
  }
}
</script>

<style scoped></style>
