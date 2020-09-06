<template>
    <Page actionBarHidden="true">
        <StackLayout class="main-navigation-frame" orientation="horizontal" verticalAlignment="top">
            <FlexboxLayout height="90" width="100%" class="navigation-list" justifyContent="center" alignItems="center">
                <StackLayout verticalAlignment="center" height="100%" @tap="goToMapView()" flexGrow="1" class="nav-link" :class="{'active' : activeLink=='map'}">
                    <Image width="30" src="~/assets/images/map-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Карта"/>
                </StackLayout>
                <StackLayout verticalAlignment="center" height="100%" @tap="goToServicePlaces()" flexGrow="1" class="nav-link" :class="{'active' : activeLink=='services'}">
                    <Image width="30" src="~/assets/images/services-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Сервизи"/>
                </StackLayout>
                <StackLayout verticalAlignment="center" height="100%" @tap="goToProfile()" flexGrow="1" class="nav-link" :class="{'active' : activeLink=='profil'}">
                    <Image width="30" src="~/assets/images/profile-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Профил"/>
                </StackLayout>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>
<script>
import MapLocations from '@/views/MapLocations';
import AllServicePlaces from '@/views/AllServicePlaces';
import UserProfile from '@/views/UserProfile';
import Login from '@/views/Login';
import { mapGetters } from 'vuex';

export default {
    name:'Navigation',
    props:[],
    components: {
      MapLocations,
      AllServicePlaces,
      UserProfile,
      Login,
    },
    data() {
        return {
          activeLink: '',
        };
    },
    computed: {
      ...mapGetters({
        loggedIn: 'loggedIn',
      }),
    },
    created(){},
    methods:{
      goToMapView() {
        if(this.activeLink !== 'map'){
          this.activeLink = 'map';
          this.$navigateTo(MapLocations, {frame: 'mainContent'});
        }
      },
      goToServicePlaces() {
        if(this.activeLink !== 'services'){
          this.activeLink = 'services';
          this.$navigateTo(AllServicePlaces, {frame: 'mainContent'});
        }
      },
      goToProfile() {
        if(this.activeLink !== 'profil'){
          this.activeLink = 'profil';
          this.loggedIn ? this.$navigateTo(UserProfile, {frame: 'mainContent'}) : this.$navigateTo(Login, {frame: 'mainContent'});
        }
      },
    }
}
</script>