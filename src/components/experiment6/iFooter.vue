<template>
  <v-footer
    padless
    fixed
    color="white"
    height="64"
    class="align-content-center"
  >
    <v-row no-gutters justify="center" align="center">
      <v-col cols="3" @click="openCart" class="text-center">
        <v-badge :content="items.length > 0 ? items.map((val) => {return val.count}).reduce((prev,cur) => {return prev + cur}) : ''"  :value="items.length" overlap offset-y="30" offset-x="20" color="red">
          <v-avatar size="64">
            <v-img
                :src="items.length === 0 ? require('../../assets/img/elm/car0.webp') : require('../../assets/img/elm/car1.webp')"
                aspect-ratio="1"
                class="rounded-circle mb-4"
            ></v-img>
          </v-avatar>
        </v-badge>
      </v-col>
      <v-col cols="6" class="text-center text-start" @click="openCart">
        <div>
          <span class="font-weight-bold grey--text" v-if="items.length === 0">未选购商品</span>
          <span class="font-weight-bold black--text mr-1" v-else>¥{{realPrice}}</span>
          <span class="grey--text caption text-decoration-line-through" v-if="realPrice !== sumPrice && items.length > 0">¥{{sumPrice}}</span>
        </div>
        <div class="font-weight-bold grey--text"></div>
        <div class="grey--text body-2">另需配送费¥9</div>
      </v-col>
      <v-col cols="3" class="text-center">
        <v-btn @click="pay" elevation="0" :disabled="items.length === 0" color="blue" class="white--text rounded-xl font-weight-bold">
          {{items.length ? '去结算' : '¥0起送'}}
        </v-btn>
      </v-col>
    </v-row>
    <i-cart
      :show-cart="showCart"
      :items="items"
      @closeCart="closeCart"
      @clearCart="clearCart"
      @addCount="addCount"
      @subCount="subCount"
    ></i-cart>
  </v-footer>
</template>

<script>
import iCart from './iCart'
export default {
  name: 'iFooter',
  components: {
    iCart
  },
  props: {
    items: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    sumPrice: function () {
      if (this.items.length === 0) return 0
      let tp = 0
      for (const item of this.items) {
        tp += item.price * item.count
      }
      return tp
    },
    realPrice: function () {
      if (this.sumPrice < 27) {
        return this.sumPrice
      } else if (this.sumPrice < 49) {
        return this.sumPrice - 13
      } else return this.sumPrice - 18
    }
  },
  data: () => ({
    showCart: false
  }),
  methods: {
    openCart () {
      if (this.items.length > 0) {
        this.showCart = true
      }
    },
    closeCart () {
      this.showCart = false
    },
    clearCart () {
      this.$emit('clearCart')
      this.closeCart()
    },
    addCount (food) {
      this.$emit('addCount', food)
    },
    subCount (food) {
      this.$emit('subCount', food)
    },
    pay () {
      alert('此路不通')
    }
  }
}
</script>

<style scoped>

</style>
