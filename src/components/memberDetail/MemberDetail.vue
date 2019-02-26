<template>
  <v-container>
    <v-layout align-center justify-center row fill-height>
      <v-card width="600">
          <div class="text-xs-center">
                <v-avatar size="160">
                    <v-img :src="member.avatar_url"></v-img>
                </v-avatar>
            </div>
        <v-card-title>
            <v-container grid-list-md class="text-xs-center">
                <v-flex xs12>
                    <span class="grey--text">{{member.name}}</span>
                </v-flex>
                <v-flex xs12>
                    <span class="grey--text">{{member.id}}</span>
                </v-flex>
                <v-flex xs12>
                    <span class="grey--text">{{member.login}}</span>
                </v-flex>
                <v-flex xs12>
                    <span class="grey--text">{{member.company}}</span>
                </v-flex>
                <v-flex xs12>
                    <span class="grey--text">{{member.location}}</span>
                </v-flex>
            </v-container>
            <v-container v-if="member.bio">
            <v-flex xs12>
                <span class="grey--text">{{member.bio}}</span>
            </v-flex>
            </v-container>
        </v-card-title>
      </v-card>
    </v-layout>
    <div class="text-xs-right">
    <v-btn color="info" @click="goBack">Back</v-btn>
    </div>

  </v-container>
</template>

<script lang='ts'>
import Vue from "vue";
import { getMemberDetails } from "../../api/memberAPI";
import { Member, createDefaultMember } from "../../model/member";

export default Vue.extend({
  name: "MemberDetail",
  props: {
    login: String
  },
  data: () => ({
    member: createDefaultMember(),
    show: false,
  }),
  methods: {
      goBack: function() {
          this.$router.back();
      }
  },
  async created() {
    getMemberDetails(this.login).then((data: Member) => {
      this.member = data;
    });
  }
});
</script>

<style module>
    .centered {
        text-align: 'center';
    }
</style>
