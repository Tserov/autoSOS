<template>
  <Page actionBarHidden="true">
    <GridLayout columns="*" rows="*">
        <StackLayout row="0" col="0" height="100%" width="100%">
            <MapView
                iosOverflowSafeArea="true"
                :latitude="latitude"
                :longitude="longitude"
                :zoom="zoom"
                :bearing="bearing"
                :tilt="tilt"
                height="100%"
                @mapReady="onMapReady"
                @markerSelect="onMarkerSelect"
                @markerInfoWindowTapped="onMarkerInfoWindowTapped($event)"
            ></MapView>
        </StackLayout>
        <FlexboxLayout alignItems="center" justifyContent="center" flexDirection="column" v-show="loading" row="0" col="0" height="100%" width="100%" backgroundColor="rgba(255,255,255,.9)">
            <Label marginTop="-50" fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="AutoSOS"/>
            <ActivityIndicator size="small" :busy="loading"></ActivityIndicator>
        </FlexboxLayout>
    </GridLayout>
  </Page>
</template>
<script>
import { mapGetters } from "vuex";
import { isAndroid, isIOS } from "tns-core-modules/platform";
const geolocation = require("nativescript-geolocation");
const mapsModule = require("nativescript-google-maps-sdk");
import { ImageSource } from "tns-core-modules/image-source";
import { Image } from "tns-core-modules/ui/image";
import SingleServcie from "@/views/SingleServcie";

export default {
  name: "MapLocations",
  data() {
    return {
      latitude: 42.500910,
      longitude: 25.170486,
      zoom: 8,
      bearing: "0",
      tilt: "",
      mapView: null,
      isMounted: false,
      currentUserLocation: null,
      closestDistance: null,
      loading: true,
    };
  },
  computed: {
    ...mapGetters({
      AllServicesCollection: "AllServicesCollection"
    })
  },
  mounted() {
    let that = this;
    geolocation.isEnabled().then(
      function(isEnabled) {
        if (!isEnabled) {
          geolocation
            .enableLocationRequest(true, true)
            .then(
              () => {
                that.isMounted = true;
                if (isAndroid && that.mapView) {
                  let uiSettings = that.mapView.gMap.getUiSettings();
                  uiSettings.setMyLocationButtonEnabled(true);
                  that.mapView.gMap.setMyLocationEnabled(true);
                }
                geolocation
                  .getCurrentLocation({
                    timeout: 20000
                  })
                  .then(location => {
                    console.log(location);
                    if (!location) {
                      console.log("Failed to get location!");
                    } else {
                      this.currentUserLocation = location;
                      that.latitude = location.latitude;
                      that.longitude = location.longitude;
                      that.zoom = 7;
                      that.bearing = 0;
                      that.altitude = 0;
                    }
                  });
              },
              e => {
                console.log("Error: " + (e.message || e));
              }
            )
            .catch(ex => {
              console.log("Unable to Enable Location", ex);
            });
        } else {
          that.isMounted = true;
          if (isAndroid && that.mapView) {
            let uiSettings = that.mapView.gMap.getUiSettings();
            uiSettings.setMyLocationButtonEnabled(true);
            that.mapView.gMap.setMyLocationEnabled(true);
          }
          geolocation
            .getCurrentLocation({
              timeout: 20000
            })
            .then(location => {
              if (!location) {
                console.log("Failed to get location!");
              } else {
                that.latitude = location.latitude;
                that.longitude = location.longitude;
                that.zoom = 7;
                that.bearing = 0;
                that.altitude = 0;
              }
            });
        }
      },
      function(e) {
        console.log("Error: " + (e.message || e));
      }
    );
  },
  methods: {
    onMapReady(args) {
      this.mapView = args.object;
      var gMap = this.mapView.gMap;
      this.mapView.settings.myLocationEnabled = true;
      this.mapView.settings.myLocationButtonEnabled = true;
      this.mapView.settings.compassEnabled = true;
      this.mapView.settings.zoomGesturesEnabled = true;
      if (isAndroid && this.isMounted && geolocation.isEnabled()) {
        let uiSettings = gMap.getUiSettings();
        uiSettings.setMyLocationButtonEnabled(true);
        gMap.setMyLocationEnabled(true);
      }
      if (isIOS) {
        gMap.myLocationEnabled = true;
        gMap.settings.myLocationButton = true;
        this.mapView.on("myLocationTapped", event => {
          geolocation.isEnabled().then(enabled => {
            if (enabled) {
              geolocation
                .getCurrentLocation({
                  maximumAge: 5000,
                  timeout: 20000
                })
                .then(location => {
                  gMap.animateToLocation(location);
                });
            }
          });
        });
      }
      this.createMarkers();
    },
    onMarkerSelect() {},
    onMarkerInfoWindowTapped(e) {
      const service = e.marker.service;
      this.goToServiceView(service);
    },
    createMarkers() {
      this.mapView.infoWindowTemplate = `
            <StackLayout padding="10 12 10 12" orientation="vertical" width="200" height="190">
                <StackLayout verticalAlignment="center" width="100%" height="100%">
                    <Label text="{{title}}" marginBottom="0" textAlignment="center" textWrap="true" color="black" fontWeight="bold" fontSize="19"/>
                    <Label horizontalAlignment="center" textWrap="true" textAlignment="center">
                        <FormattedString>
                            <Span text="{{service.city}}" textWrap="true" color="#333333"  fontSize="13" ></Span>
                            <Span text=", " textWrap="true" color="#333333"  fontSize="13" ></Span>
                            <Span text="{{service.address}}" textWrap="true" color="#333333"  fontSize="13" ></Span>
                        </FormattedString>
                    </Label>
                    <Label width="100" borderRadius="5 5 5 5" padding="5 5 5 5" textAlignment="center" marginTop="10" text="{{service.isFree ? 'свободен' : 'зает'}}" textWrap="true" backgroundColor="{{service.isFree ? 'green' : 'red'}}" color="#fff" fontWeight="bold" fontSize="13" />   
                    <Label text="Виж повече" padding="4 10 4 10" class="btn btn-accent" marginTop="20" textWrap="true" fontSize="14" />
                </StackLayout>
            </StackLayout>`;
      // if(!this.AllServicesCollection){
      this.$store.dispatch("getAllServicePlaces").then(() => {
        if (this.AllServicesCollection.length > 0) {
          this.AllServicesCollection.forEach(element => {
            var marker = new mapsModule.Marker();
            if (element.location.latitude && element.location.longitude) {
              marker.position = mapsModule.Position.positionFromLatLng(
                element.location.latitude,
                element.location.longitude
              );
              // marker.color = "#ac2166";
              marker.service = element;

              let imageSource = ImageSource.fromFileSync(
                "~/assets/images/pin.png"
              );
              const icon = new Image();
              icon.imageSource = imageSource;
              marker.icon = icon;

              marker.title = element.name;
              this.mapView.addMarker(marker);
            //   this.getClosestLocation(element);
            }
          });
        }
        setTimeout(()=>{
            this.loading = false;
        },2000);
      });
      // }
    },
    goToServiceView(service) {
      this.$navigateTo(SingleServcie, {
        frame: "mainContent",
        props: { service: service, isEditable: false }
      });
    },
    getClosestLocation(marker) {
      geolocation
        .getCurrentLocation({
          timeout: 20000
        })
        .then(location => {
          if (!location) {
          } else {
            const distance = geolocation.distance(marker.location, location);
            if(this.closestDistance){
                this.closestDistance = this.closestDistance < distance ? this.closestDistance : distance;
            }else{
                this.closestDistance = distance;
            }
            console.log('distance: ');
            console.log(this.closestDistance);
          }
        });
    }
  }
};
</script>