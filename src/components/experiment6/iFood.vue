<template>
  <i-bottom-dialog :show-dialog="showFood" @closeDialog="closeFood" :fullscreen="true" >
    <template v-slot:content>
      <v-card class="rounded-0" v-if="food" color="#f3f3f3">
        <v-card-title class="pa-0">
          <v-toolbar
            flat
            color="rgba(0,0,0,0)"
            style="position:absolute;right: 0;top: 0;z-index: 1"
          >
            <v-btn icon @click="closeFood">
              <v-icon color="white">mdi-close</v-icon>
            </v-btn>
          </v-toolbar>
        </v-card-title>
        <v-card-text class="pa-0">
          <v-img
              :src="food.image"
              max-width="100%"
              aspect-ratio="1.0"
          ></v-img>
          <v-card class="ma-3" flat>
            <v-card-text>
              <div class="font-weight-bold text-h6 black--text">{{food.name}}</div>
              <div>
                <span class="grey--text body-2">月售{{food.sellCount}}份 </span>
                <span class="grey--text body-2">好评率{{food.rating}}%</span>
              </div>
              <v-row no-gutters class="align-center">
                <v-col class="text-start" cols="8">
                  <span class="red--text font-weight-bold">¥{{food.price}} </span>
                  <span class="grey--text caption text-decoration-line-through" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                </v-col>
                <v-col class="text-end" cols="4">
                  <i-counter :food="food" @addCount="addCount" @subCount="subCount"></i-counter>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <v-card class="ma-3" flat>
            <v-card-text>
              <div class="font-weight-bold subtitle-1 black--text">商品详情</div>
              <div>{{food.info ? food.info : '无'}}</div>
            </v-card-text>
          </v-card>
          <v-card class="ma-3" flat>
            <v-card-text>
              <i-comment :comments="food.ratings"></i-comment>
            </v-card-text>
          </v-card>
        </v-card-text>
      </v-card>
    </template>
  </i-bottom-dialog>
</template>

<script>
import iBottomDialog from './iBottomDialog'
import iCounter from './iCounter'
import iComment from './iComment'
export default {
  name: 'iFood',
  components: {
    iBottomDialog,
    iCounter,
    iComment
  },
  props: {
    showFood: {
      type: Boolean,
      default: false
    },
    food: {
      type: Object,
      default: null
    }
  },
  methods: {
    closeFood () {
      this.$emit('closeFood')
    },
    addCount () {
      this.$emit('addCount', this.food)
    },
    subCount () {
      this.$emit('subCount', this.food)
    }
  }
}
</script>

<style scoped>

</style>
