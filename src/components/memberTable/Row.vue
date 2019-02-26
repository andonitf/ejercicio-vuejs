<template>
  <v-card :to="`/member/${member.login}`">
      <v-img class="white--text" height="200px" :src="member.avatar_url">
    </v-img>
    <v-card-title>
      <div>
        <span class="grey--text">{{member.login}}</span>
      </div>
    </v-card-title>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropOptions } from "vue";
import { Member } from "../../model/member";

interface Props {
  member: PropOptions<Member>;
}

export default Vue.extend({
  name: "MemberRow",
  props: {
    member: {}
  } as Props
});
</script>

<style module>
</style>
