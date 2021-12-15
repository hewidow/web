<template>
  <i-bottom-dialog :show-dialog="showCart" @closeDialog="closeCart">
    <template v-slot:content>
      <v-card class="rounded-0" style="max-height: 75vh">
        <v-toolbar flat>
          <v-toolbar-title class="font-weight-bold">已选商品</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="clearCart" class="mr-1 font-weight-bold">
            <v-icon>mdi-trash-can-outline</v-icon>
            清空
          </v-btn>
        </v-toolbar>
        <v-card-text class="pa-0">
          <v-list>
            <v-list-item
                v-for="(food, index) in items"
                :key="index"
            >
              <v-row class="ma-0" dense>
                <v-col cols="3" align-self="center">
                  <v-img aspect-ratio="1.0" max-height="100%" :src="food.icon">
                  </v-img>
                </v-col>
                <v-col cols="9" align-self="center">
                  <div class="font-weight-bold subtitle-1">{{food.name}}</div>
                  <v-row no-gutters class="align-center">
                    <v-col class="text-start" cols="7">
                      <span class="red--text font-weight-bold">¥{{food.price}} </span>
                      <span class="grey--text caption text-decoration-line-through" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                    </v-col>
                    <v-col class="text-end" cols="5">
                      <i-counter :food="food" @addCount="addCount(food)" @subCount="subCount(food)"></i-counter>
                    </v-col>
                  </v-row>
                </v-col>
              </v-row>
            </v-list-item>
          </v-list>
        </v-card-text>
      </v-card>
    </template>
  </i-bottom-dialog>
</template>

<script>
import iBottomDialog from './iBottomDialog'
import iCounter from './iCounter'
export default {
  name: 'iCart',
  components: {
    iBottomDialog,
    iCounter
  },
  props: {
    showCart: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    }
  },
  watch: {
    items (val) {
      if (val.length === 0) this.closeCart()
    }
  },
  methods: {
    closeCart () {
      this.$emit('closeCart')
    },
    clearCart () {
      this.$emit('clearCart')
    },
    addCount (food) {
      this.$emit('addCount', food)
    },
    subCount (food) {
      this.$emit('subCount', food)
    }
  }
}
</script>

<style scoped>

</style>
