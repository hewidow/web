<template>
  <v-app>
    <top-app-bar>
      <template v-slot:content>
        <v-tabs background-color="rgba(0,0,0,0)">
          <v-tab to="/web/epidemic">中国疫情</v-tab>
          <v-tab to="/web/epidemic/world">全球疫情</v-tab>
        </v-tabs>
      </template>
    </top-app-bar>
    <v-main>
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'EpidemicNav'
}
</script>

<style scoped>

</style>
