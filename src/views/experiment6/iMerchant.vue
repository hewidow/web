<template>
  <v-container style="background-color: #f3f3f3;height: calc(100vh - 48px)">
    <v-row>
      <v-col>
        <v-card flat>
          <v-card-title>
            <v-row align="center">
              <v-col cols="10">
                <div class="font-weight-bold subtitle-1">{{vendorName}}</div>
                <div class="grey--text subtitle-2">{{vendorAddress}}</div>
              </v-col>
              <v-divider vertical inset></v-divider>
              <v-col cols="2" class="text-center">
                <a href="tel:400-920-8801" style="text-decoration:none">
                  <v-icon color="blue">mdi-phone</v-icon>
                </a>
              </v-col>
            </v-row>
          </v-card-title>
          <v-card-text>
            <div class="font-weight-bold subtitle-1 black--text">商家信息</div>
            <div class="grey--text subtitle-2">商家品类：{{vendorKind}}</div>
            <div class="grey--text subtitle-2">营业时间：{{vendorTime}}</div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: 'iMerchant',
  data: () => ({
    vendorName: '肯德基宅急送（福雷德店）',
    vendorAddress: '浙江省杭州经济技术开发区文泽路99号福雷德广场1B02、2B02室',
    vendorKind: '汉堡薯条 / 炸鸡炸串',
    vendorTime: '07:00-22:55'
  })
}
</script>

<style scoped>

</style>
