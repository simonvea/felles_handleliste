<template>
  <div id="app">
    <main>
      <router-view />
    </main>
    <footer v-if="loggedIn" class="footer">
      <router-link to="/">Handleliste</router-link>|
      <router-link to="/about">Fullførte</router-link>|
      <button @click="logout">Logg ut</button>
    </footer>
  </div>
</template>
<script lang="ts">
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  methods: { ...mapActions(["logout", "init"]) }
})
export default class App extends Vue {
  init!: () => void;
  logout!: () => void;

  get loggedIn() {
    return this.$store.state.user.loggedIn;
  }
  created() {
    this.init();
  }
}
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  position: relative;
}

main {
  height: 90vh;
}

.footer {
  height: 10vh;
  width: 100%;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  background-color: navy;
  color: black;
}

#nav {
  padding: 30px;
}

button,
a {
  font-weight: bold;
  color: DodgerBlue;
  margin: 0 10px;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #42b983;
}
</style>
