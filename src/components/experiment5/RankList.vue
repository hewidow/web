<template>
  <div>
    <v-list>
      <v-list-item
        v-for="(song, index) of rankList"
        :key="index"
        class="pa-0"
      >
        <v-col cols="1" :class="(playId === song.id ? 'teal--text text--accent-4': (index < 3 ? ' deep-orange--text text--accent-3': '') ) + ' align-self-center'">{{index + 1}}</v-col>
        <v-col cols="3">
          <v-img
            :src="song.pic"
            aspect-ratio="1"
            class="rounded-lg"
          ></v-img>
        </v-col>
        <v-col cols="5" class="align-self-center">
          <p :class="(playId === song.id ? 'teal--text text--accent-4': '') + ' font-weight-bold mb-0'">{{song.title}}</p>
          <p :class="(playId === song.id ? 'teal--text text--accent-4': 'grey--text') + ' mb-0'">{{song.artist}}</p>
        </v-col>
        <v-col cols="1" class="text-center">
          <v-btn icon height="32" width="32" @click="clickPlayIcon(song)">
            <v-icon
              size="32"
              :color="(playId === song.id ? 'rgb(37,210,157)': '')"
            >{{playId === song.id &&playing ? 'mdi-pause-circle-outline' : 'mdi-play-circle-outline'}}</v-icon>
          </v-btn>
        </v-col>
        <v-col cols="2" class="text-center ml-1">
          <v-btn icon @click="addToPlayList(song)" height="32" width="32" v-if="playList.map((item)=>{return item.id}).indexOf(song.id) === -1">
            <v-icon size="32">mdi-plus-circle-outline</v-icon>
          </v-btn>
          <v-btn icon height="32" width="32" v-else>
            <v-icon size="32" color="rgb(37,210,157)">mdi-check-circle-outline</v-icon>
          </v-btn>
        </v-col>
      </v-list-item>
      <v-list-item></v-list-item>
    </v-list>
    <v-overlay :value="overlay" z-index="0">
      <v-progress-circular
        indeterminate
        size="48"
      ></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { music } from '../../api'

export default {
  name: 'RankList',
  props: {
    playList: {
      type: Array,
      default: () => []
    },
    playId: {
      type: Number,
      default: -1
    },
    playing: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    overlay: false,
    rankList: []
  }),
  mounted () {
    this.getRankList()
  },
  methods: {
    addToPlayList (song) {
      this.$emit('addToPlayList', song)
    },
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    },
    async getRankList () {
      if (this.rankList.length !== 0) return
      this.overlay = true
      const res = await music.getRankList()
      if (res && res.status === 200) {
        const getMusicList = res.data.playlist.tracks
        for (let i = 0; i < getMusicList.length; ++i) {
          const obj = {}
          obj.title = getMusicList[i].name
          obj.artist = getMusicList[i].ar.map((item) => { return item.name }).join('/')
          obj.pic = getMusicList[i].al.picUrl
          obj.id = getMusicList[i].id
          this.rankList.push(obj)
        }
        this.overlay = false
      }
    }
  }
}
</script>

<style scoped>

</style>
