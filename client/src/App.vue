<template>
  <div id="app">
    <b-container fluid="sm">
      <b-col cols="12">
        <b-form @submit.prevent="download()">
          <b-form-input
            placeholder="YouTube Video Link"
            v-model="linkText"
          ></b-form-input>
          <b-button
            @click="download()"
            block
            variant="outline-primary"
            style="margin-top: 10px"
            >DOWNLOAD</b-button
          >
        </b-form>
        <div style="padding: 10px"></div>
        <div class="text-center">
          <b-spinner
            variant="success"
            label="Spinning"
            v-if="spinner"
          >
          </b-spinner>
        </div>
        <b-alert variant="warning" :show="!isLinkValid" dismissible>
          <h4 class="alert-heading">Well done!</h4>
          <p>
            Aww yeah, you successfully read this important alert message. This
            example text is going to run a bit longer so that you can see how
            spacing within an alert works with this kind of content.
          </p>
          <hr />
          <p class="mb-0">
            Whenever you need to, be sure to use margin utilities to keep things
            nice and tidy.
          </p>
        </b-alert>
        <b-alert variant="success" :show="isLinkValid" dismissible>
          <h4 class="alert-heading">Link Valido</h4>
        </b-alert>
        <b-card
          v-if="videoInfo.thumbnail"
          :img-src="videoInfo.thumbnail"
          img-alt="Card image"
          :title="videoInfo.title"
          :sub-title="videoInfo.uploader"
        >
          <b-card-text>
            {{ videoInfo.description }}
          </b-card-text>
        </b-card>
      </b-col>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      linkText: "",
      videoInfo: {
        id: "",
        uploader: "",
        channelId: "",
        thumbnail: ""
      },
      validLink: "https://www.youtube.com/watch?v=",
      isLinkValid: false,
      spinner: false
    };
  },
  methods: {
    download() {
      const newText = this.linkText.split("watch?v=");
      const url = `http://localhost:3000/watch?v=${newText[1]}`;
      this.spinner = true;
      axios({
        url: url,
        method: "GET",
        responseType: "blob"
      }).then(response => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `${newText[1]}.mp4`);
        document.body.appendChild(link);
        link.click();
        this.spinner = false;
      });
    }
  },
  watch: {
    linkText: function(value) {
      if (!value.indexOf(this.validLink)) {
        this.videoInfo = {};
        this.isLinkValid = true;
        const newText = this.linkText.split("watch?v=");
        axios({
          url: `http://localhost:3000/info/${newText[1]}`,
          method: "GET",
          responseType: "json"
        }).then(response => {
          this.videoInfo = response.data;
        });
      } else this.isLinkValid = false;
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
  margin-left: 20px;
  margin-right: 20px;
}
</style>
