<template>
  <v-container fluid>
    <v-row>
      <v-col>
        <v-text-field
          v-model="keywords"
          outlined
          dense
          hide-details
          class="rounded-pill"
        >
          <template v-slot:append>
            <v-icon @click="searchSong">mdi-magnify</v-icon>
          </template>
        </v-text-field>
      </v-col>
    </v-row>
    <v-row
      v-if="keywords === ''"
    >
      <v-col
        cols="6"
        v-for="(hot, index) of hots"
        :key="index"
      >
        <v-row>
        <v-col cols="2">
          <span :class="(index < 4 ? 'deep-orange--text text--accent-3' : '') +' font-weight-bold' ">{{index + 1}}</span>
        </v-col>
        <v-col cols="10">
          <v-chip outlined @click="searchHotKeywords(hot.first)">{{hot.first}}</v-chip>
        </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-row
      v-if="keywords !== ''"
    >
      <v-col class="pa-0">
        <div
          v-if="searchState"
          class="font-weight-bold text-center"
        >没有搜索到歌曲</div>
        <v-list>
          <v-list-item
            v-for="(song,index) of songs"
            :key="index"
          >
            <v-col cols="3">
              <v-img
                :src="song.pic"
                aspect-ratio="1"
                class="rounded-lg"
              ></v-img>
            </v-col>
            <v-col cols="6" class="align-self-center">
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
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { music } from '../../api'
export default {
  name: 'SearchSong',
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
    keywords: '',
    overlay: false,
    hots: [],
    songs: [],
    searchState: false
  }),
  mounted () {
    this.searchHot()
  },
  watch: {
    keywords () {
      this.songs.splice(0, this.songs.length)
      this.searchState = false
    }
  },
  methods: {
    searchHotKeywords (keywords) {
      this.keywords = keywords
      this.searchSong()
    },
    searchHot () {
      music.searchHot()
        .then((res) => {
          if (res && res.status === 200) {
            this.hots = res.data.result.hots
          }
        })
    },
    searchSong () {
      if (this.keywords === '') return
      this.overlay = true
      this.songs.splice(0, this.songs.length)
      this.searchState = false
      music.searchSong(this.keywords)
        .then((res) => {
          if (res && res.status === 200 && res.data.result.songs.length > 0) {
            const getMusicList = res.data.result.songs
            for (let i = 0; i < getMusicList.length; ++i) {
              const obj = {}
              obj.title = getMusicList[i].name
              obj.artist = getMusicList[i].ar.map((item) => { return item.name }).join('/')
              obj.pic = getMusicList[i].al.picUrl
              obj.id = getMusicList[i].id
              this.songs.push(obj)
            }
          } else {
            this.searchState = true
          }
          this.overlay = false
        })
    },
    addToPlayList (song) {
      this.$emit('addToPlayList', song)
    },
    clickPlayIcon (song) {
      this.$emit('clickPlayIcon', song)
    }
  }
}
</script>

<style scoped>

</style>
