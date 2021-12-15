<template>
  <v-row class="text-end" no-gutters align="center">
    <v-fade-transition>
      <v-col v-if="food.count > 0">
        <v-btn icon color="blue" @click="subCount">
          <v-icon>mdi-minus-circle</v-icon>
        </v-btn>
      </v-col>
    </v-fade-transition>
    <v-fade-transition>
      <v-col v-if="food.count > 0" class="text-center">
        <span class="align-content-end black--text">{{ food.count }}</span>
      </v-col>
    </v-fade-transition>
    <v-col>
      <v-btn icon color="blue" @click="addCount();drop($event)">
        <v-icon>mdi-plus-circle</v-icon>
      </v-btn>
    </v-col>
    <div v-for="(ball, index) in balls" :key="index" style="position: fixed;left: 0;top: 0;z-index: 202">
      <transition v-on:before-enter="beforeEnter($event, ball)" v-on:enter="enter" v-on:after-enter="afterEnter">
        <div v-if="ball.show" style="transition: all 0.4s cubic-bezier(.34,-0.56,.73,.62)">
          <div style="transition: all 0.4s linear">
            <v-icon color="blue">mdi-plus-circle</v-icon>
          </div>
        </div>
      </transition>
    </div>
  </v-row>
</template>

<script>
export default {
  name: 'iCounter',
  props: {
    food: {
      type: Object,
      default: null
    }
  },
  data: () => ({
    balls: [
      {
        show: false,
        el: null
      },
      {
        show: false,
        el: null
      },
      {
        show: false,
        el: null
      },
      {
        show: false,
        el: null
      },
      {
        show: false,
        el: null
      }
    ],
    dropBalls: []
  }),
  methods: {
    addCount () {
      this.$emit('addCount')
    },
    subCount () {
      this.$emit('subCount')
    },
    drop (e) {
      for (let i = 0; i < this.balls.length; i++) {
        if (!this.balls[i].show) {
          this.balls[i].show = true
          this.balls[i].el = e.target
          this.dropBalls.push(this.balls[i])
          return
        }
      }
    },
    beforeEnter (el, ball) {
      el.style.display = ''
      const rect = ball.el.getBoundingClientRect()
      const x = rect.left - 40
      const y = rect.top - 40
      el.style.webkitTransform = `translate3d(0,${y}px,0)`
      el.style.transform = `translate3d(0,${y}px,0)`
      const inner = el.childNodes[0]
      inner.style.webkitTransform = `translate3d(${x}px,0,0)`
      inner.style.transform = `translate3d(${x}px,0,0)`
    },
    enter (el) {
      this.$nextTick(() => {
        const x = 40
        const y = window.innerHeight - 50
        el.style.webkitTransform = `translate3d(0,${y}px,0)`
        el.style.transform = `translate3d(0,${y}px,0)`
        const inner = el.childNodes[0]
        inner.style.webkitTransform = `translate3d(${x}px,0,0)`
        inner.style.transform = `translate3d(${x}px,0,0)`
      })
    },
    afterEnter (el) {
      const ball = this.dropBalls.shift()
      if (ball) {
        ball.show = false
        el.style.display = 'none'
      }
    }
  }
}
</script>

<style scoped>

</style>
