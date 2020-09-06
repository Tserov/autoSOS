<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%" class="homepage" verticalAlignment="center">
            <!-- <WebView src="<div><h1 id='heading'>Some static HTML</h1></div>" /> -->
            <FlexboxLayout width="100%" class="welcome-heading" alignItems="center" justifyContent="center" flexWrap="wrap" flexDirection="column">
                <Image width="200" src="~/assets/images/logo-small.png" marginBottom="20" stretch="aspectFit" />
                <!-- <Label fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="AutoSOS"/> -->
                <Label fontSize="16" textAlignment="center" textWrap="true" color="#232c69" fontWeight="bold" text="Намери бързо и лесно най-близкия сервиз до теб и провери за свободни места"/>
                <Label @tap="goToMapView()" marginTop="20" class="btn btn-accent" text="Намери сервиз"/>
                <Label marginTop="10" text="или"/>
                <Label marginTop="5" @tap="goToProfile()" class="link" text="добави своя тук."/>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>
<script>
import MapLocations from '@/views/MapLocations';
import { mapGetters } from 'vuex';
import UserProfile from '@/views/UserProfile';
import Login from '@/views/Login';

export default {
  name: 'Home',
  components: {
    MapLocations,
  },
  computed: {
    ...mapGetters({
      loggedIn: 'loggedIn',
    }),
  },
  methods: {
    goToMapView() {
      this.$navigateTo(MapLocations, {frame: 'mainContent'});
    },
    goToProfile() {
      this.loggedIn ? this.$navigateTo(UserProfile, {frame: 'mainContent'}) : this.$navigateTo(Login, {frame: 'mainContent'});
    },
  },
}
</script>