<template>
    <Page actionBarHidden="true">
        <StackLayout v-if="user" height="100%">
            <FlexboxLayout width="100%" class="welcome-heading" alignItems="center" justifyContent="center" flexWrap="wrap" flexDirection="column">
                <Label fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="UserProfile view"/>
                <Label :text="user.email"/>
                <Label @tap="logOut()" class="btn" text="Излез от профил"/>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>
<script>
import { mapGetters } from 'vuex';
import Login from '@/views/Login';

export default {
  name: 'UserProfile',
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      this.$navigateTo(Login, {frame: 'mainContent'});
    },
  },
  computed: {
    ...mapGetters({
      user: 'user',
      loggedIn: "loggedIn"
    }),
  },
  created() {
    if(!this.loggedIn){
      this.$navigateTo(Login, {frame: 'mainContent'});
    }
    console.log(this.user);
  },
}
</script>