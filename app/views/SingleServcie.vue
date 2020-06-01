<template>
    <Page actionBarHidden="true">
          <GridLayout columns="*" rows="*">
            <StackLayout row="0" col="0" height="100%" width="100%">
                <StackLayout width="100%" padding="20 20 20 20">
                    <Label horizontalAlignment="right" @tap="goBack()" width="100" padding="5 5 5 5" fontSize="16" class="btn" fontWeight="bold" text="Назад"/>
                </StackLayout>
                <ScrollView orientation="vertical">
                    <StackLayout width="100%" padding="20 30 120 30"> 
                        <StackLayout class="avatar">
                            <Image horizontalAlignment="center" verticalAlignment="center" width="100" src="~/assets/images/service-avatar.png" stretch="aspectFit" />
                        </StackLayout>
                        <FlexboxLayout v-if="service" width="100%" class="welcome-heading"  margin="20 0 20 0"  alignItems="center" justifyContent="center" flexWrap="wrap" flexDirection="column">
                            <Label fontSize="40" class="heading" color="#232c69" fontWeight="bold" :text="service.name"/>
                            <StackLayout v-if="isEditable">
                                <Label class="section-title" text="Свободен за клиент: "/>
                                <Switch horizontalAlignment="center" checked="true" v-model="serviceInputs.isFree"/>
                            </StackLayout>
                            <StackLayout v-else>
                                <Label padding="5 5 5 5" color="#fff" fontWeight="bold" borderRadius="5 5 5 5" :backgroundColor="service.isFree ? 'green' : 'red'" :text="service.isFree ? 'Налични свободни места' : 'Няма налични места'"/>
                            </StackLayout>
                        </FlexboxLayout>

                        <StackLayout class="service-data-info">
                            <Label class="section-title" text="Данни за контакт"/>
                            <StackLayout row="0" class="input-field">
                            <Label class="label" text="Сервиз:"/>
                            <TextField
                                :editable="isEditable"
                                class="input"
                                hint="Въведи име на сервиз"
                                autocorrect="false"
                                autocapitalizationType="none"
                                v-model="serviceInputs.name"
                                returnKeyType="next"
                            ></TextField>
                            <StackLayout class="hr-light"></StackLayout>
                            </StackLayout>

                            <StackLayout row="0" class="input-field">
                            <Label class="label" text="Email адрес:"/>
                            <TextField
                                :editable="isEditable"
                                class="input"
                                hint="Въведи email"
                                autocorrect="false"
                                autocapitalizationType="none"
                                v-model="serviceInputs.email"
                                returnKeyType="next"
                            ></TextField>
                            <StackLayout class="hr-light"></StackLayout>
                            </StackLayout>

                            <StackLayout row="0" class="input-field">
                                <Label class="label" text="Тел. номер:"/>
                                <TextField
                                    :editable="isEditable"
                                    class="input"
                                    hint="Въведи тел. номер"
                                    autocorrect="false"
                                    autocapitalizationType="none"
                                    v-model="serviceInputs.phone"
                                    returnKeyType="next"
                                ></TextField>
                                <StackLayout class="hr-light"></StackLayout>
                            </StackLayout>

                            <Label class="section-title" text="Локация"/>
                            <StackLayout row="0" class="input-field">
                                <Label class="label" text="Град:"/>
                                <ListPicker v-if="isEditable" :items="allCities" textField="name" valueField="name" v-model="serviceInputs.city" />
                                <TextField v-else
                                    editable="false"
                                    class="input"
                                    v-model="serviceInputs.city"
                                    returnKeyType="next"
                                ></TextField>
                                <StackLayout class="hr-light"></StackLayout>
                            </StackLayout>
                            <StackLayout row="0" class="input-field"  v-if="isEditable && serviceInputs.address">
                                <Label class="label" text="Адрес:"/>
                                <TextField
                                    :editable="isEditable"
                                    class="input"
                                    hint="Въведи адрес на сервиз"
                                    autocorrect="false"
                                    autocapitalizationType="none"
                                    v-model="serviceInputs.address"
                                    returnKeyType="next"
                                ></TextField>
                                <StackLayout class="hr-light"></StackLayout>
                            </StackLayout>

                            <FlexboxLayout width="100%" flexDirection="row" flexWrap="wrap" alignItems="center" class="input-field">
                                <StackLayout width="50%"  v-if="isEditable || serviceInputs.location && serviceInputs.location.latitude">
                                    <Label class="label" fontSize="12" text="latitude:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="Въведи /latitude/"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.location.latitude"
                                        returnKeyType="next"
                                    ></TextField>
                                </StackLayout>
                                <StackLayout width="50%" v-if="isEditable || serviceInputs.location && serviceInputs.location.longitude">
                                    <Label class="label" fontSize="12" text="longitude:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="Въведи /longitude/"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.location.longitude"
                                        returnKeyType="next"
                                    ></TextField>
                                    <StackLayout class="hr-light"></StackLayout>
                                </StackLayout>
                            </FlexboxLayout>

                            <Label v-show="serviceInputs.work_time && serviceInputs.work_time[0]" class="section-title" text="Работно време:"/>
                            <StackLayout class="input-field">

                                <FlexboxLayout alignItems="center" class="input-field" marginBottom="0" v-if="isEditable || serviceInputs.work_time && serviceInputs.work_time.monday">
                                    <Label marginRight="10" class="label" text="Понеделник:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="00:00-00:00"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.work_time.monday"
                                        returnKeyType="next"
                                    ></TextField>
                                    <StackLayout class="hr-light"></StackLayout>
                                </FlexboxLayout>

                                <FlexboxLayout alignItems="center" class="input-field" marginBottom="0" v-if="isEditable || serviceInputs.work_time && serviceInputs.work_time.tuesday">
                                    <Label marginRight="10" class="label" text="Вторник:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="00:00-00:00"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.work_time.tuesday"
                                        returnKeyType="next"
                                    ></TextField>
                                    <StackLayout class="hr-light"></StackLayout>
                                </FlexboxLayout>

                                <FlexboxLayout alignItems="center" class="input-field" marginBottom="0" v-if="isEditable || serviceInputs.work_time && serviceInputs.work_time.wednesday">
                                    <Label marginRight="10" class="label" text="Сряда:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="00:00-00:00"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.work_time.wednesday"
                                        returnKeyType="next"
                                    ></TextField>
                                    <StackLayout class="hr-light"></StackLayout>
                                </FlexboxLayout>

                                <FlexboxLayout alignItems="center" class="input-field" marginBottom="0" v-if="isEditable || serviceInputs.work_time && serviceInputs.work_time.thursday">
                                    <Label marginRight="10" class="label" text="Четвъртък:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="00:00-00:00"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.work_time.thursday"
                                        returnKeyType="next"
                                    ></TextField>
                                    <StackLayout class="hr-light"></StackLayout>
                                </FlexboxLayout>

                                <FlexboxLayout alignItems="center" class="input-field" marginBottom="0" v-if="isEditable || serviceInputs.work_time && serviceInputs.work_time.friday">
                                    <Label marginRight="10" class="label" text="Петък:"/>
                                    <TextField
                                        :editable="isEditable"
                                        class="input"
                                        hint="00:00-00:00"
                                        autocorrect="false"
                                        autocapitalizationType="none"
                                        v-model="serviceInputs.work_time.friday"
                                        returnKeyType="next"
                                    ></TextField>
                                    <StackLayout class="hr-light"></StackLayout>
                                </FlexboxLayout>
                            </StackLayout>
                            
                        </StackLayout>

                        <Label v-if="isEditable" @tap="saveSerivceToDb()" marginTop="20" class="btn btn-accent" text="Запази"/>
                        <Label v-else marginTop="20" class="btn btn-accent" text="Изпрати запитване"/>
                    </StackLayout>
                </ScrollView>
            </StackLayout>
            <FlexboxLayout alignItems="center" justifyContent="center" flexDirection="column" v-show="loading" row="0" col="0" height="100%" width="100%" backgroundColor="rgba(255,255,255,.9)">
                <Label marginTop="-50" fontSize="40" class="heading" marginBottom="20" color="#232c69" fontWeight="bold" text="AutoSOS"/>
                <ActivityIndicator size="small" :busy="loading"></ActivityIndicator>
            </FlexboxLayout>
          </GridLayout>
    </Page>
</template>
<script>
export default {
  props: ['service','isEditable'],
  name: 'SingleServcie',
  data() {
    return {
      loading: true,
      editableService: true,
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
      serviceInputs: {
          name:'',
          email: '',
          city: '',
          address:'',
          location: {},
          work_time: {},
          isFree: false,
          phone: '',
      },
    };
  },
  methods: {
    goBack() {
      this.$navigateBack();
    },
    saveSerivceToDb() {
      if(this.serviceInputs.name && this.serviceInputs.email && this.serviceInputs.phone && this.serviceInputs.city){
        if(!!this.service && this.service != null){
            this.$store.dispatch('updateServiceToDb', this.serviceInputs);
        }else{
            this.$store.dispatch('setServiceToDb', this.serviceInputs)
            .then(() => {
                this.$navigateBack();
            });
        }
      }else{
          alert({
            title: "AutoSOS",
            okButtonText: "OK",
            message: "Името и email адресът са задължителни полета!"
          });
      }
    },
  },
//   computed: {
//     serviceInputs() {
//       return this.service;
//     }
//   },
  created() {
    if(!!this.service && this.service != null){
        this.serviceInputs = this.service;
        this.loading = false;
    }else{
        this.loading = false;
    }
  },
}
</script>