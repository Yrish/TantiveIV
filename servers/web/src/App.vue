<template>
  <div id="app">
    <Header />
    <component :is="bodyView"
               @click="switchToSignIn"></component>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import NoteBook from './components/NoteBook.vue'
import SignIn from './components/SignIn.vue'

export default {
  name: 'app',
  components: {
    Header,
    NoteBook,
    SignIn
  },
  data() {
    return {
      bodyView: NoteBook
    }
  },
  methods: {
    switchToSignIn() {
      this.bodyView = SignIn;
    }
  },
  created() {
    try {
      var webSocket = new WebSocket("ws://study.test:8001/ws");
      webSocket.onopen = (event) => {
        webSocket.onmessage = (event) => {console.log(event)};
        webSocket.send(JSON.stringify({type: "REGISTER", payload: {username: "MEEEE", password: "BLUESCLUES", email: "test@test.com"}}))
      };
    } catch (err){
      console.log("Could not connect to server.");
      console.log(err);
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
