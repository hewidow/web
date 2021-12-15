<template>
  <v-app>
    <top-app-bar
      v-if="showPhoto"
      app-icon="mdi-backspace"
      app-title="返回（左右滑动也可以切换图片）"
      :app-icon-action="() => { this.showPhoto=!this.showPhoto }"
    ></top-app-bar>
    <top-app-bar
      v-if="!showPhoto"
      app-title="相册"
    ></top-app-bar>
    <v-main>
      <v-container :class="showPhoto?'fill-height pa-3':'pa-2'">
        <v-row v-if="!showPhoto" dense>
          <v-col
            cols="4"
            v-for="(photo, index) in photos"
            :key="index"
          >
            <v-img
              :src="photo"
              aspect-ratio="1"
              @click="photoShow(index)"
            >
            </v-img>
          </v-col>
        </v-row>
        <v-row v-if="showPhoto">
          <v-col cols="12" class="pa-0">
            <v-fade-transition>
              <v-img
                :src="photos[activePhoto]"
              >
              </v-img>
            </v-fade-transition>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
    <v-footer v-if="showPhoto" class="pa-0">
      <v-app-bar
        bottom
        color="light-blue"
        dense
      >
        <div class="text-center" style="width: 100%">
          <v-btn icon @click="previousPhoto" dark>
            <v-icon>mdi-arrow-left-bold-box</v-icon>
          </v-btn>
          <v-btn icon @click="deletePhoto" dark>
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-btn icon @click="slidePhoto" :disabled="slideStatus" dark>
            <v-icon>mdi-projector</v-icon>
          </v-btn>
          <v-btn icon @click="nextPhoto" dark>
            <v-icon>mdi-arrow-right-bold-box</v-icon>
          </v-btn>
        </div>
      </v-app-bar>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'VueGallery',
  props: {
    photos: {
      type: Array
    }
  },
  data: function () {
    return {
      activePhoto: 0,
      showPhoto: false,
      sx: 0,
      sy: 0,
      ex: 0,
      ey: 0,
      timerPhoto: null,
      slideStatus: false
    }
  },
  mounted () {
    this.changePhoto(0)
    document.addEventListener('touchstart', (e) => {
      this.sx = e.touches[0].pageX
      this.sy = e.touches[0].pageY
    })
    document.addEventListener('touchend', (e) => {
      this.ex = e.changedTouches[0].pageX
      this.ey = e.changedTouches[0].pageY
      const dx = this.ex - this.sx
      const dy = this.ey - this.sy
      if (dx * dx + dy * dy > 10) {
        const ang = Math.atan2(dy, dx) / Math.PI * 180
        if (ang > -45 && ang < 45) {
          this.previousPhoto()
        } else if (ang > 135 || ang < -135) this.nextPhoto()
      }
    })
    document.addEventListener('touchstart', (e) => {
      if (this.timerPhoto !== null) {
        clearInterval(this.timerPhoto)
        this.timerPhoto = null
        this.slideStatus = false
      }
    })
  },
  methods: {
    photoShow (index) {
      this.changePhoto(index)
      this.showPhoto = true
    },
    changePhoto (index) {
      this.activePhoto = index
    },
    nextPhoto () {
      this.changePhoto(this.activePhoto + 1 < this.photos.length ? this.activePhoto + 1 : 0)
    },
    previousPhoto () {
      this.changePhoto(this.activePhoto - 1 >= 0 ? this.activePhoto - 1 : this.photos.length - 1)
    },
    deletePhoto () {
      this.photos.splice(this.activePhoto, 1)
      if (this.activePhoto === this.photos.length) {
        this.activePhoto = 0
      }
      if (this.photos.length === 0) {
        this.showPhoto = false
      }
    },
    slidePhoto () {
      if (this.timerPhoto === null) {
        this.slideStatus = true
        this.timerPhoto = setInterval(this.nextPhoto, 2000)
      }
    }
  }
}
</script>
