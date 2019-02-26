<template>
  <v-app>
    <h2 class="ml-3">Member Page</h2>
    <v-container fluid grid-list-md>
      <v-layout  align-start justify-start column wrap>
        <v-flex d-flex xs6 sm3 md2>
          <div class="resultContainer">
            <v-layout>
              <div class="item">
                <v-text-field label="Organización" v-model="organization" @change="organizationUpdated" outline></v-text-field>
              </div>
              <div class="item mt-1">
                <v-btn color="info" @click="loadMembers">Load</v-btn>
              </div>
            </v-layout>
          </div>
        </v-flex>
      </v-layout>

      <v-layout v-if="members.length > 0">
        <v-flex xs12 sm6 offset-sm2>
          <v-card>
            <v-container fluid>
              <v-layout row wrap>
                <v-flex v-for="member in members" :key="member.id" xs4>
                  <member-row :key="member.id" :member="member"/>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
      </v-layout>

      <v-layout v-if="showPagination">
        <v-flex xs12 sm6 offset-sm2>
          <div class="text-xs-center">
            <v-pagination v-model="currentPage" :length="lastPage" @input="loadMore"></v-pagination>
          </div>
        </v-flex>
      </v-layout>

    </v-container>

  </v-app>
</template>


<script lang="ts">
import Vue from "vue";
import MemberRow from "./Row.vue";
import { Member } from "../../model/member";
import { MemberResponseData } from "../../model/memberResponseData";
import { getAllMembers } from "../../api/memberAPI";

export default Vue.extend({
  name: "MemberTable",
  components: { MemberRow },
  data: () => ({
    members: [] as Member[],
    organization: "lemoncode",
    currentPage: 1,
    lastPage: 1,
    showPagination: false
  }),
  beforeRouteEnter (to, from, next) {
    if (from.path != '/') {
      next((vm: any) => {
        vm.organization = to.params.organization;
        vm.loadMembers();
          next();
      });
    } else {
      next();
    }
  },
  methods: {
    loadMembers: function() {
      getAllMembers(this.organization, this.currentPage).then((membersResponseData: MemberResponseData) => {
        this.members = membersResponseData.members;
        this.lastPage = membersResponseData.page;
        this.showPagination = this.currentPage != this.lastPage;
        this.$router.push(`/${this.organization}`);
      })
      .catch(error => {
        this.members = [];
        this.currentPage = 1;
        this.lastPage = 1;
        this.showPagination = false;
      });
    },
    organizationUpdated: function() {
      this.currentPage = 1;
    },
    loadMore: function(page) {
      this.currentPage = page;
      this.loadMembers();
    },
  }
});
</script>

<style module>
</style>
