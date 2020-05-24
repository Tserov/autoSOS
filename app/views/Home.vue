<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%" class="homepage" verticalAlignment="center">
            <!-- <WebView src="<div><h1 id='heading'>Some static HTML</h1></div>" /> -->
            <FlexboxLayout width="100%" class="welcome-heading" alignItems="center" justifyContent="center" flexWrap="wrap" flexDirection="column">
                <Label fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="autoSOS"/>
                <Label fontSize="16" textAlignment="center" textWrap="true" color="#232c69" fontWeight="bold" text="Намери бързо и лесно най-близкия сервиз до теб и провери свободни места"/>
                <Label @tap="goToMapView()" marginTop="20" class="btn btn-accent" text="Намери сервиз"/>
                <Label marginTop="10" text="или"/>
                <Label marginTop="5" class="link" text="добави своя тук."/>
            </FlexboxLayout>
        </StackLayout>
    </Page>
</template>
<script>
import MapView from '@/views/MapView';
export default {
  name: 'Home',
  components: {
    MapView,
  },
  methods: {
    goToMapView() {
      this.$navigateTo(MapView, {frame: 'mainContent'});
    }
  },
}
</script>