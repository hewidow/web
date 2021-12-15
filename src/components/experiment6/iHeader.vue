<template>
  <v-card flat color="grey lighten-5" class="rounded-0">
    <v-toolbar
      dark
      extended
      extension-height="128"
      flat
      :src="vendorBackground"
    >
      <template v-slot:img="{ props }">
        <v-img
            v-bind="props"
            gradient="to top, rgba(255,255,255,.5), rgba(0,0,0,.5)"
        ></v-img>
      </template>
      <v-btn icon @click="() => { $router.push('/web') }">
        <v-icon>mdi-home</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card
      width="90%"
      class="mx-auto"
      style="margin-top: -64px;"
      flat
    >
      <v-card-text>
        <v-row @click="openNotice">
          <v-col cols="9">
            <div class="font-weight-bold text-h5 black--text py-2">{{vendorName}}</div>
            <div class="black--text">
              {{ vendorCond }}
            </div>
            <div class="grey--text text-truncate text-no-wrap">
              {{noticeText}}
            </div>
          </v-col>
          <v-col cols="3" class="align-self-center">
            <v-img
              :src="vendorPic"
            >
              <v-img
                src="../../assets/img/elm/brand@3x.png"
                width="50%"
              ></v-img>
            </v-img>
          </v-col>
        </v-row>
        <v-row>
          <v-chip
            v-for="(item,index) of discountsList"
            :key="index"
            outlined
            label
            color="red"
            class="ml-1 pa-1"
            small
          >{{item.text}}</v-chip>
        </v-row>
      </v-card-text>
    </v-card>
    <i-notice :show-notice="showNotice" :vendor-name="vendorName" :notice-text="noticeText" @closeNotice="closeNotice"></i-notice>
  </v-card>
</template>

<script>
import iNotice from './iNotice'
export default {
  name: 'iHeader',
  components: {
    iNotice
  },
  data: () => ({
    vendorPic: require('../../assets/img/elm/kfc.webp'),
    vendorBackground: require('../../assets/img/elm/background.webp'),
    vendorName: '肯德基宅急送（福雷德店）',
    vendorCond: '蜂鸟快送约31分钟 · 月售5322 · 可自取',
    noticeText: '公告: 欢迎光临肯德基宅急送，专业外送，全程保温，准时送达！',
    showNotice: false,
    discountsList: [
      {
        text: '27减13'
      },
      {
        text: '49减18'
      }
    ],
    showDiscounts: false
  }),
  methods: {
    openNotice () {
      this.showNotice = true
    },
    closeNotice () {
      this.showNotice = false
    }
  }
}
</script>

<style scoped>

</style>
