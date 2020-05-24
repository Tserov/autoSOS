<template>
    <Page actionBarHidden="true">
        <StackLayout class="main-navigation-frame" orientation="horizontal" verticalAlignment="top">
            <FlexboxLayout height="90" width="100%" class="navigation-list" justifyContent="center" alignItems="center">
                <StackLayout @tap="goToMapView()" flexGrow="1" class="nav-link">
                    <Image width="35" src="~/assets/images/services-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Карта"/>
                </StackLayout>
                <StackLayout @tap="goToServicePlaces()" flexGrow="1" class="nav-link">
                    <Image width="35" src="~/assets/images/map-icon.png" stretch="aspectFit" />
                    <Label textAlignment="center" text="Сервизи"/>
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
import MapView from '@/views/MapView';
import ServicePlaces from '@/views/ServicePlaces';
import UserProfile from '@/views/UserProfile';

export default {
    name:'Navigation',
    props:[],
    components: {
      MapView,
      ServicePlaces,
      UserProfile,
    },
    data() {
        return {};
    },
    created(){},
    computed: {},
    methods:{
      goToMapView() {
        this.$navigateTo(MapView, {frame: 'mainContent'});
      },
      goToServicePlaces() {
        this.$navigateTo(ServicePlaces, {frame: 'mainContent'});
      },
      goToProfile() {
        this.$navigateTo(UserProfile, {frame: 'mainContent'});
      },
    }
}
</script>