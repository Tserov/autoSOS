<template>
    <Page actionBarHidden="true">
        <StackLayout height="100%">
            <!-- <FlexboxLayout width="100%" class="welcome-heading" alignItems="center" justifyContent="center" flexWrap="wrap" flexDirection="column">
                <Label fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="Map view"/>
                <Label @tap="$navigateBack" marginTop="20" class="btn btn-accent" text="back"/>
            </FlexboxLayout> -->
             <MapView
          width="100%"
          height="85%"
          dock="top"
          :zoom="'10'"
          :latitude="'34.34'"
          :longitude="'45.3'"
          @mapReady="mapReady"
          @coordinateLongPress="locationSelected"
        />
        </StackLayout>
    </Page>
</template>
<script>
export default {
  name: 'MapLocations',
}
</script>