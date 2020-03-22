<template>
  <div id="app">
    <b-container>
      <b-form inline @submit.prevent="">
        <b-form-input
          v-model="linkText"
          placeholder="Cole o Link do Video"
        ></b-form-input>

        <b-button variant="primary" @click="download()">Download</b-button>
      </b-form>
      <div v-if="isLinkValid()">
        <b-card
          title="Card Title"
          img-src="https://picsum.photos/600/300/?image=25"
          img-alt="Image"
          img-top
          tag="article"
          style="max-width: 20rem;"
          class="mb-2"
        >
          <b-card-text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </b-card-text>
        </b-card>
      </div>
      <div v-else>
        Link invalido
      </div>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "App",
  data() {
    return {
      linkText: "https://www.youtube.com/watch?v=8BUig7mcFsw",
      videoInfo: {},
      validLink: "https://www.youtube.com/watch?"
    };
  },
  methods: {
    download() {
      const newText = this.linkText.split("watch?v=");
      const url = `http://localhost:3000/watch?v=${newText[1]}`;
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
      });
    },
    isLinkValid() {
      return this.linkText.match(this.validLink) ? true : false;
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
