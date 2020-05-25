<template>
    <Page actionBarHidden="true">
        <StackLayout class="main-navigation-frame" orientation="horizontal" verticalAlignment="top">
            <FlexboxLayout height="90" width="100%" class="navigation-list" justifyContent="center" alignItems="center">
                <StackLayout @tap="goToMapView()" flexGrow="1" class="nav-link">
                    <Image width="35" src="~/assets/images/services-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Сервизи"/>
                </StackLayout>
                <StackLayout @tap="goToServicePlaces()" flexGrow="1" class="nav-link">
                    <Image width="35" src="~/assets/images/map-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Карта"/>
                </StackLayout>
                <StackLayout @tap="goToProfile()" flexGrow="1" class="nav-link">
                    <Image width="35" src="~/assets/images/profile-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Профил"/>
                </StackLayout>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>
<script>
import MapLocations from '@/views/MapLocations';
import ServicePlaces from '@/views/ServicePlaces';
import UserProfile from '@/views/UserProfile';
import Login from '@/views/Login';
import { mapGetters } from 'vuex';

export default {
    name:'Navigation',
    props:[],
    components: {
      MapLocations,
      ServicePlaces,
      UserProfile,
      Login,
    },
    data() {
        return {};
    },
    computed: {
      ...mapGetters({
        loggedIn: 'loggedIn',
      }),
    },
    created(){},
    methods:{
      goToMapView() {
        this.$navigateTo(MapLocations, {frame: 'mainContent'});
      },
      goToServicePlaces() {
        this.$navigateTo(ServicePlaces, {frame: 'mainContent'});
      },
      goToProfile() {
        console.log(this.loggedIn);
        this.loggedIn ? this.$navigateTo(UserProfile, {frame: 'mainContent'}) : this.$navigateTo(Login, {frame: 'mainContent'});
      },
    }
}
</script>