<template>
    <Page actionBarHidden="true">
      <GridLayout columns="*" rows="*">
        <StackLayout row="0" col="0" height="100%" width="100%">
            <StackLayout width="100%" height="100%">
              <StackLayout>
                <Label fontSize="30" textAlignment="center" padding="30 0 0 0" class="heading" marginBottom="0" color="#232c69" fontWeight="bold" text="Всички сервизи"/>
                <Label fontSize="16" textAlignment="center" padding="0 0 0 0" color="#555" fontWeight="bold" text="Открии своя сервиз"/>
                <FlexboxLayout padding="20 10 20 10" alignItems="center" flexDirection="column" class="filters">
                  <StackLayout v-show="filter.isVisible">
                    <Label @tap="filter.isVisible = false" textAlignment="center" fontWeight="bold" marginBottom="10" fontSize="16" text="[X]"/>
                    <Label text="Филтрирай по град"/>
                    <ListPicker :items="filter.allCities" textField="name" valueField="name" v-model="city" />
                  </StackLayout>
                  <Label @tap="filter.isVisible ? filterServcies() : filter.isVisible = !filter.isVisible" width="80%" class="btn" :class="{'btn-accent' : filter.isVisible}" :text="filter.isVisible ? 'Филтрирай' : 'Филтри'"/>
                </FlexboxLayout>
              </StackLayout>

              <StackLayout width="100%" height="100%" class="all-services">
                <ScrollView orientation="vertical">
                  <StackLayout width="100%" padding="10 20 90 20" >
                    <StackLayout v-if="AllServicesCollection">
                      <StackLayout orientation="horizontal" class="servcie-container" v-for="(service, index) in AllServicesCollection" :key="index">
                        <StackLayout class="avatar">
                          <Image horizontalAlignment="left" verticalAlignment="center" width="100" src="~/assets/images/service-avatar.png" stretch="aspectFit" />
                        </StackLayout>

                        <FlexboxLayout @tap="goToSingleServiceView(service)" verticalAlignment="center" class="info" alignItems="center" justifyContent="space-between" flexDirection="row" flexWrap="wrap">
                          <FlexboxLayout height="100%" width="80%" alignItems="flex-start" justifyContent="center" flexDirection="column">
                            <Label fontSize="16" class="blue-color" fontWeight="bold" :text="service.name ? service.name : 'Име на сервиз'"/>
                            <Label v-if="service.city" textWrap="true" fontSize="14" class="blue-color" :text="service.city"/>
                            <Label textWrap="true" fontSize="14" class="blue-color" :text="service.address ? service.address : 'няма въведен адрес'"/>
                          </FlexboxLayout>
                          <FlexboxLayout height="100%" flexGrow="1">
                              <Image width="30" src="~/assets/images/info-icon.png" stretch="aspectFit" />
                          </FlexboxLayout>
                        </FlexboxLayout>

                      </StackLayout>
                    </StackLayout>
                    <StackLayout v-else>
                      <Label text="Нямате добавени сервизи."/>
                    </StackLayout>
                  </StackLayout>
                </ScrollView>
              </StackLayout>
            </StackLayout>
        </StackLayout>
         <FlexboxLayout alignItems="center" justifyContent="center" flexDirection="column" v-show="processing" row="0" col="0" height="100%" width="100%" backgroundColor="rgba(255,255,255,.9)">
            <Label marginTop="-50" fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="AutoSOS"/>
            <ActivityIndicator size="small" :busy="processing"></ActivityIndicator>
        </FlexboxLayout>
      </GridLayout>
    </Page>
</template>
<script>
import { mapGetters } from 'vuex';
import SingleServcie from '@/views/SingleServcie';

export default {
  name: 'AllServicePlaces',
  components: {},
  data() {
    return {
      processing: true,
      filter: {
        isVisible: false,
        allCities: [
          {
              name: 'Пловдив',
          },
          {
              name: 'София',
          },
          {
              name: 'Бургас',
          },
          {
              name: 'Пловдив',
          },
          {
              name: 'Пазарджик',
          },
        ],
      }
    };
  },
  methods: {
    goToSingleServiceView(service) {
      this.$navigateTo(SingleServcie, {frame: 'mainContent', props:{'service': service, 'isEditable': false}});
    },
    filterServcies() {
      console.log('filtering..');
    },
  },
  computed: {
    ...mapGetters({
      AllServicesCollection: "AllServicesCollection"
    }),
  },
  created() {
    this.$store.dispatch('getAllServicePlaces').then(() => {
      this.processing = false;
    });
  },
}
</script>