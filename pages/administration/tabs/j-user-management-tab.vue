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
                          style="width: 300px; margin: 20px"
                          label="Username"
                          outlined
                          placeholder="Type to search users.."
                        ></v-text-field>
                        <h3 style="margin:20px">User List</h3>
                        <v-list v-if="searchedUsers">
                          <v-list-item
                            v-for="user in searchedUsers"
                            :key="user.resourceId"
                          >
                            <v-list-item-avatar>
                              <img
                                v-if="user.avatarUrl"
                                :src="user.avatarUrl"
                                alt="avatar"
                              />
                            </v-list-item-avatar>

                            <v-list-item-content>
                              <v-list-item-title
                                v-text="user.displayName"
                              ></v-list-item-title>

                              <v-list-item-subtitle
                                v-text="user.username"
                              ></v-list-item-subtitle>
                            </v-list-item-content>
                          </v-list-item>
                        </v-list>
                        <p style="margin:20px">No user</p>
                        <v-divider></v-divider>

                        <v-card-actions>
                          <v-spacer></v-spacer>
                          <v-btn color="primary" text @click="dialog = false">
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
  </v-card>
</template>

<script>
import UserService from '@/service/authentication/UserService'

export default {
  name: 'JUserManagementTab',
  data() {
    return {
      users: [],
      searchedUsers: [],
      dialog: false
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
    }
  }
}
</script>

<style scoped></style>
