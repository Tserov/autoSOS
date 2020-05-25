<template>
  <Page actionBarHidden="true">
    <FlexboxLayout
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      paddingBottom="120"
    >
      <StackLayout padding="0 30 0 30">
        <!-- <Image class="logo" src="~/images/logo.png"></Image> -->
        <Label
          fontSize="40"
          textAlignment="center"
          class="heading"
          marginBottom="20"
          color="#232c69"
          fontWeight="bold"
          text="AutoSOS"
        />

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Email"
              :isEnabled="!processing"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.email"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Парола"
              secure="true"
              v-model="user.password"
              :returnKeyType="isLoggingIn ? 'done' : 'next'"
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Потвърди парола"
              secure="true"
              v-model="user.confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          :text="isLoggingIn ? 'Влез' : 'Регистрирай се'"
          :isEnabled="!processing"
          @tap="submit"
          class="btn btn-accent m-t-20"
        ></Button>
        <!-- <Label *v-show="isLoggingIn" text="Forgot your password?"
        class="login-label" @tap="forgotPassword()"></Label>-->
      </StackLayout>

      <Label marginTop="30" class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span :text="isLoggingIn ? 'Нямате акаунт? ' : 'Назад към логин.'"></Span>
          <Span :text="isLoggingIn ? 'Регистрирай се' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Home from "./Home";
import { mapGetters } from "vuex";
import UserProfile from "@/views/UserProfile";
// const firebase = require("nativescript-plugin-firebase/app");
// const db = firebase.firestore();

export default {
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        email: "",
        password: "",
        confirmPassword: ""
      }
    };
  },
  computed: {
    ...mapGetters({
      loggedIn: "loggedIn"
    })
  },
  created() {
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.email || !this.user.password) {
        this.alert("Моля въведете и двете полете.");
        return;
      }

      this.processing = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      this.$store.dispatch("login", this.user).then(() => {
        if (this.loggedIn) {
          this.processing = false;
          this.$navigateTo(UserProfile, { frame: "mainContent" });
        }
        this.processing = false;
      });
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert("Паролите не съвпадат!.");
        this.processing = false;
        return;
      }
      
      this.$store.dispatch('register', this.user).then(() => {
        if (this.loggedIn) {
        //   this.setUserToDb(this.user);
          this.processing = false;
          this.alert("Успешно създаддохте своя акаунт");
          setTimeout(() => {
            this.$navigateTo(UserProfile, { frame: "mainContent" });
          },500);
        }
        this.processing = false;
      });
    },
    forgotPassword() {
      prompt({
        title: "Forgot Password",
        message:
          "Enter the email address you used to register for APP NAME to reset your password.",
        inputType: "email",
        defaultText: "",
        okButtonText: "Ok",
        cancelButtonText: "Cancel"
      }).then(data => {
        if (data.result) {
          this.$backendService
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                "Your password was successfully reset. Please check your email for instructions on choosing a new password."
              );
            })
            .catch(() => {
              this.alert(
                "Unfortunately, an error occurred resetting your password."
              );
            });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: "AutoSOS",
        okButtonText: "OK",
        message: message
      });
    }
  }
};
</script>

<style scoped>
.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.btn-primary {
  margin: 30 5 15 5;
}

.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>
