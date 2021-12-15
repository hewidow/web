<template>
  <v-app-bar app :color="appColor" dark dense>
    <v-app-bar-nav-icon>
      <template v-slot:default>
        <v-icon
          @click="appIconAction"
        >{{appIcon}}</v-icon>
      </template>
    </v-app-bar-nav-icon>
    <v-app-bar-title>
      <span style="font-size: 16px">{{appTitle}}</span>
    </v-app-bar-title>
    <v-spacer></v-spacer>
    <div>
      <slot name="content"></slot>
    </div>
  </v-app-bar>
</template>

<script>
import router from '../router'
export default {
  name: 'TopAppBar',
  props: {
    appIcon: {
      type: String,
      default: 'mdi-home'
    },
    appIconAction: {
      type: Function,
      default: () => { router.push('/web') }
    },
    appTitle: {
      type: String,
      default: ''
    },
    appColor: {
      type: String,
      default: 'light-blue'
    }
  },
  methods: {
  }
}
</script>

<style scoped>

</style>
