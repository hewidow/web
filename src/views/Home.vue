<template>
  <v-app>
    <v-img src="../assets/img/background/star.jpg">
      <v-main>
        <v-container>
          <v-row>
            <v-col
              cols="4"
              v-for="(item,index) in items"
              :key="index"
            >
              <v-container class="fill-height">
                <v-row no-gutters>
                  <v-col>
                    <v-img
                      aspect-ratio="1"
                      @click="pushRouter(item.to)"
                      class="align-center text-center white elevation-6"
                      style="border-radius:10px"
                    >
                      <v-icon size="72" color="blue" v-if="item.icon">{{ item.icon }}</v-icon>
                      <v-avatar
                        color="black"
                        size="60"
                        v-if="item.customIcon"
                      >
                        <span style="color: white; font-size: 40px">棋</span>
                      </v-avatar>
                    </v-img>
                  </v-col>
                </v-row>
                <v-row dense>
                  <v-col>
                    <div class="text-center">
                      <span style="color: white" class="font-weight-bold">{{item.name}}</span>
                    </div>
                  </v-col>
                </v-row>
              </v-container>
            </v-col>
          </v-row>
        </v-container>
      </v-main>
    </v-img>
  </v-app>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    items: [
      {
        name: '品牌列表',
        icon: 'mdi-card-bulleted',
        to: '/web/brandList'
      },
      {
        name: '疫情现状',
        icon: 'mdi-lungs',
        to: '/web/epidemic'
      },
      {
        name: '照片',
        icon: 'mdi-google-photos',
        to: '/web/photo'
      },
      {
        name: '黑白棋',
        customIcon: true,
        to: '/web/reversi'
      },
      {
        name: '云音乐',
        icon: 'mdi-music-circle',
        to: '/music'
      },
      {
        name: '肯德基',
        icon: 'mdi-food',
        to: '/web/elm'
      }
    ]
  }),
  methods: {
    pushRouter (to) {
      if (to === '/music') {
        let url = `${window.location.protocol}//${window.location.hostname}`
        if (['80', '443'].indexOf(window.location.port) === -1) url += `:${window.location.port}`
        window.location.href = url + to
      } else {
        this.$router.push(to)
      }
    }
  }
}
</script>

<style scoped>

</style>
