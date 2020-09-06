<template>
    <Page actionBarHidden="true">
        <StackLayout v-if="user" width="100%">
            <FlexboxLayout class="profile-card" width="100%" alignItems="center" justifyContent="center" flexWrap="wrap" flexDirection="column">
                <Image width="70" src="~/assets/images/profile-icon.png" stretch="aspectFit" />
                <Label fontSize="25" marginBottom="0" color="#232c69" fontWeight="bold" :text="user.name ? user.name : 'Потребител'"/>
                <Label :text="user.email" fontSize="16" marginBottom="20"/>
                <Label @tap="logOut()" class="btn" text="Излез от профил"/>
            </FlexboxLayout>
            <StackLayout>
              <FlexboxLayout class="user-nav">
                <Label @tap="setActiveTab('profil')" :class="{'active' : activeTab=='profil'}" textWrap="true" class="link-tab" text="Потребител"/>
                <Label @tap="setActiveTab('services')" :class="{'active' : activeTab=='services'}" textWrap="true" class="link-tab" text="Сервизи"/>
              </FlexboxLayout>

              <StackLayout v-show="activeTab=='profil'" id="user-profile-info">

                <StackLayout row="0" class="input-field">
                  <Label class="label" text="имена:"/>
                  <TextField
                    class="input"
                    hint="Въведи име"
                    autocorrect="false"
                    autocapitalizationType="none"
                    v-model="currentUser.name"
                    returnKeyType="next"
                  ></TextField>
                  <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <StackLayout row="0" class="input-field">
                  <Label class="label" text="email адрес:"/>
                  <TextField
                    editable="false"
                    class="input"
                    hint="Въведи email адрес"
                    keyboardType="email"
                    autocorrect="false"
                    autocapitalizationType="none"
                    v-model="currentUser.email"
                    returnKeyType="next"
                  ></TextField>
                  <StackLayout class="hr-light"></StackLayout>
                </StackLayout>

                <Label @tap="updateUserData()" marginTop="20" class="btn" text="Запази"/>

              </StackLayout>

              <StackLayout v-show="activeTab=='services'" id="user-services-list" paddingBottom="120">
                <ScrollView orientation="vertical">
                  <StackLayout padding="20 0 10 0" horizontalAlignment="center">
                    <StackLayout v-if="userServices.length">

                      <StackLayout orientation="horizontal" class="servcie-container" v-for="(service, index) in userServices" :key="index">
                        <StackLayout class="avatar">
                          <Image horizontalAlignment="left" verticalAlignment="center" width="100" src="~/assets/images/service-avatar.png" stretch="aspectFit" />
                        </StackLayout>

                        <FlexboxLayout verticalAlignment="center" @tap="goToSingleServiceView(service)" class="info" alignItems="center" justifyContent="space-between" flexDirection="row" flexWrap="wrap">
                          <StackLayout width="80%">
                            <Label fontSize="16" class="blue-color" fontWeight="bold" :text="service.name ? service.name : 'Име на сервиз'"/>
                            <Label textWrap="true" fontSize="14" class="blue-color" :text="service.address ? service.address : 'няма въведен адрес'"/>
                          </StackLayout>
                          <StackLayout flexGrow="1">
                              <Image width="20" src="~/assets/images/edit-icon.png" stretch="aspectFit" />
                          </StackLayout>
                        </FlexboxLayout>

                      </StackLayout>

                    </StackLayout>
                    <StackLayout v-else>
                      <Label textAlignment="center" text="Нямате добавени сервизи."/>
                    </StackLayout>
                    <Label width="220" @tap="goToSingleServiceView(null)" marginTop="20" class="btn btn-accent" text="Добави нов сервиз"/>
                  </StackLayout>
                </ScrollView>
              </StackLayout>
            </StackLayout>
          </StackLayout>
    </Page>
</template>
<script>
import { mapGetters } from 'vuex';
import Login from '@/views/Login';
import SingleServcie from '@/views/SingleServcie';

export default {
  name: 'UserProfile',
  components: {
    Login,
    SingleServcie,
  },
  data() {
    return {
      currentUser: {},
      activeTab: 'profil',
    };
  },
  methods: {
    logOut() {
      this.$store.dispatch('logOut');
      this.$navigateTo(Login, {frame: 'mainContent'});
    },
    updateUserData() {
      this.$store.dispatch('updateUserToDb', this.currentUser);
    },
    setActiveTab(tab){
      this.activeTab = tab;
    },
    goToSingleServiceView(service) {
      this.$navigateTo(SingleServcie, {frame: 'mainContent', props:{'service': service, 'isEditable': true}});
    },
  },
  computed: {
    ...mapGetters({
      user: 'user',
      loggedIn: "loggedIn",
      userServices: "userServices",
    }),
  },
  created() {
    if(!this.loggedIn){
      this.$navigateTo(Login, {frame: 'mainContent'});
    }
    // if(!this.userServices || this.userServices.length <= 0){
      this.$store.dispatch('getAllUserServricesFromDb');
    // }
    this.currentUser = this.user;
    setTimeout(() => {
      this.currentUser = this.user;
    }, 500);
  },
}
</script>