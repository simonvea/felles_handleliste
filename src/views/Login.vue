<template>
  <section>
    <p>Vennligst logg in!</p>
    <button @click="login('Simon')">Logg inn</button>
  </section>
</template>

<script>
import Vue from "vue";
import { Component } from "vue-property-decorator";
import { mapActions } from "vuex";

@Component({
  methods: {
    ...mapActions(["login"])
  }
})
export default class Login extends Vue {}
</script>

<style></style>
