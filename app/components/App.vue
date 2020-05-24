<template>
    <Page actionBarHidden="true">
        <GridLayout columns="*" rows="*">
          <Frame id="mainContent">
            <Home/>
          </Frame>
          <Frame @loaded="stickToTheBottom">
            <Navigation/>
          </Frame>
        </GridLayout>
    </Page>
</template>

<script>
import Home from "@/views/Home";
import Navigation from "@/components/Navigation";
import { screen } from "tns-core-modules/platform";

  export default {
    components: {
      Home,
      Navigation,
    },
    data() {
      return {
        msg: 'Hello World!'
      }
    },
    methods: {
      stickToTheBottom(e) {
        const frame = e.object;
        // frame.translateY = this.$ios?screen.mainScreen.heightDIPs - 100:screen.mainScreen.heightDIPs - 160; // screen.mainScreen.heightDIPs - 70 -> IOS tablet
        frame.translateY = screen.mainScreen.heightDIPs - 160;
      },
    },
  }
</script>

<style scoped>
    ActionBar {
        background-color: #53ba82;
        color: #ffffff;
    }

    .message {
        vertical-align: center;
        text-align: center;
        font-size: 20;
        color: #333333;
    }
</style>
