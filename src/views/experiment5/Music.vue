<template>
  <v-app>
    <top-app-bar app-title="云音乐" app-color="rgb(11,40,72)">
      <template v-slot:content>
        <v-tabs
          v-model="tab"
          align-with-title
          background-color="rgb(11,40,72)"
        >
          <v-tab>搜索</v-tab>
          <v-tab>排行榜</v-tab>
        </v-tabs>
      </template>
    </top-app-bar>
    <v-main>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <search-song
            :play-list="playList"
            :play-id="playList.length === 0 ? -1 : playList[currentIndex].id"
            :playing="playing"
            @addToPlayList="addToPlayList"
            @clickPlayIcon="clickPlayIcon"
          ></search-song>
        </v-tab-item>
        <v-tab-item>
          <rank-list
            :play-list="playList"
            :play-id="playList.length === 0 ? -1 : playList[currentIndex].id"
            :playing="playing"
            @addToPlayList="addToPlayList"
            @clickPlayIcon="clickPlayIcon"
          ></rank-list>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
    <v-footer
      class="pa-0"
      fixed
      app
    >
      <v-toolbar
        bottom
        color="rgb(11,40,72)"
        dense
      >
        <v-row no-gutters justify="center" align="center">
          <v-col cols="2" @click="openPlayDialog">
            <v-img
              :src="playList.length === 0 ? require('../../assets/img/music/vinylRecord.jpg') : playList[currentIndex].pic"
              aspect-ratio="1"
              class="rounded-circle mb-4"
              max-width="48"
            ></v-img>
          </v-col>
          <v-col cols="7" class="text-center white--text" @click="openPlayDialog" style="text-overflow:ellipsis;overflow:hidden;width: 100px;white-space:nowrap;">
            {{playList.length === 0 ? '请添加歌曲' : playList[currentIndex].title + ' - ' + playList[currentIndex].artist}}
          </v-col>
          <v-col cols="2" class="text-center">
            <v-btn icon @click="changePlay" height="38" width="38">
              <v-progress-circular
                :rotate="-90"
                value="100"
                :color="audioDisable ? 'black': 'rgb(37,210,157)'"
                width="2"
                size="38"
                :indeterminate="audioLoading"
              >
                <v-progress-circular
                  :rotate="-90"
                  :value="Math.floor(sliderNow / sliderMax * 100)"
                  :color="audioDisable ? 'black': (audioLoading ? 'rgba(0,0,0,0)' : 'rgb(37,210,157)')"
                  width="3"
                  size="36"
                >
                  <v-icon color="rgb(37,210,157)" size="28" :disabled="audioDisable">{{playing?'mdi-pause':'mdi-play'}}</v-icon>
                </v-progress-circular>
              </v-progress-circular>
            </v-btn>
          </v-col>
          <v-col cols="1">
            <v-btn icon @click="openPlayList">
              <v-icon color="rgb(37,210,157)" size="36">mdi-playlist-music</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-toolbar>
    </v-footer>
    <v-dialog
      v-model="playDialog"
      fullscreen
      transition="dialog-bottom-transition"
    >
      <v-app>
        <v-app-bar
          dark
          color="rgb(11,40,72)"
          dense
          app
        >
          <v-app-bar-title class="font-weight-light">正在播放</v-app-bar-title>
          <v-spacer></v-spacer>
          <v-btn
            icon
            dark
            @click="closePlayDialog"
          >
            <v-icon>mdi-chevron-down</v-icon>
          </v-btn>
        </v-app-bar>
        <v-main>
          <v-container fluid :style="{ backgroundColor: 'rgb(11,40,72)', height: mainHeight }">
            <v-row style="height: 15%">
              <v-col>
                <p class="white--text ma-0 text-h5">{{playList.length === 0 ? '请添加歌曲' : playList[currentIndex].title}}</p>
                <p class="white--text ma-0">{{playList.length === 0 ? '请添加歌曲' : playList[currentIndex].artist}}</p>
              </v-col>
            </v-row>
            <v-row style="height: 60%">
              <v-col style="height: 100%">
                <song-lyric :now-time="sliderNow" :lyric-string="lyricString"></song-lyric>
              </v-col>
            </v-row>
            <v-row style="height: 25%" class="text-center align-center">
              <v-col cols="12">
                <v-slider
                  color="rgb(37,210,157)"
                  track-color="grey"
                  inverse-label
                  :label="getTime(sliderNow,sliderMax)"
                  dark
                  v-model="sliderNow"
                  :min="sliderMin"
                  :max="sliderMax"
                  step="0.1"
                  @change="changeCurrentTime"
                  hide-details
                >
                </v-slider>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="changePlayOrder" height="36" width="36">
                  <v-icon color="blue-grey lighten-3" size="36">{{playOrderIcon[playOrder]}}</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="playPrev" :disabled="audioDisable" height="48" width="48">
                  <v-icon color="rgb(37,210,157)" size="48">mdi-skip-previous</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="4">
                <v-btn icon @click="changePlay" :disabled="audioDisable" height="64" width="64">
                  <v-icon color="rgb(37,210,157)" size="64">{{playing?'mdi-pause-circle':'mdi-play-circle'}}</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="playNext" :disabled="audioDisable" height="48" width="48">
                  <v-icon color="rgb(37,210,157)" size="48">mdi-skip-next</v-icon>
                </v-btn>
              </v-col>
              <v-col cols="2">
                <v-btn icon @click="openPlayList" height="36" width="36">
                  <v-icon color="rgb(37,210,157)" size="36">mdi-playlist-music</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </v-main>
      </v-app>
    </v-dialog>
    <audio
      :src="playList.length === 0 ? null : playList[currentIndex].src"
      style="display: none"
      :autoplay="playing"
      ref="audio"
      :loop="playOrder === 2 || playList.length === 1"
      @timeupdate="getCurrentTime"
      @canplaythrough="showTotalTime"
      @ended="audioEnded"
    ></audio>
    <play-list
      :show-dialog="playListDialog"
      :play-list="playList"
      :play-index="currentIndex"
      @close="playListDialog = false"
      @delFromPlayList="delFromPlayList"
      @clickPlaySong="clickPlaySong"
    ></play-list>
  </v-app>
</template>

<script>
import { music } from '../../api'
import SongLyric from '../../components/experiment5/SongLyric'
import PlayList from '../../components/experiment5/PlayList'
import SearchSong from '../../components/experiment5/SearchSong'
import RankList from '../../components/experiment5/RankList'
export default {
  name: 'Music',
  components: {
    SongLyric,
    PlayList,
    SearchSong,
    RankList
  },
  data: () => ({
    tab: null,
    currentIndex: 0,
    playing: false,
    playDialog: false,
    playListDialog: false,
    playList: [
      {
        title: '声声慢 (京韵版)',
        artist: '张一山/孙萍',
        pic: 'http://p3.music.126.net/0X0cvRif6qa0AE-yBibf7g==/109951165379412073.jpg',
        id: 1485850351,
        src: null
      }
    ],
    playOrder: 0,
    playOrderIcon: ['mdi-repeat', 'mdi-shuffle-variant', 'mdi-repeat-once'],
    audioDisable: false,
    audioLoading: false,
    sliderNow: 0,
    sliderMin: 0,
    sliderMax: 1,
    lyricString: '[00:00.000]正在获取歌词，请稍等~'
  }),
  watch: {
    currentIndex () {
      if (this.playList.length > 0) {
        this.lyricString = '[00:00.000]正在获取歌词，请稍等~'
        this.sliderNow = 0
        this.sliderMax = 1
        this.getSongUrl()
        this.getSongLyric()
      }
    },
    playList (val) {
      if (val.length === 0) {
        this.audioDisable = true
        this.lyricString = ''
        this.sliderNow = 0
        this.sliderMax = 0
        this.currentIndex = -1
        this.audioPause()
      } else {
        this.audioDisable = false
        this.currentIndex = Math.max(0, this.currentIndex)
        this.currentIndex = Math.min(this.playList.length - 1, this.currentIndex)
      }
    }
  },
  computed: {
    mainHeight () {
      return (window.innerHeight - 48) + 'px'
    }
  },
  created () {
    this.getSongUrl()
    this.getSongLyric()
  },
  methods: {
    changePlay () {
      if (this.playing === false) this.audioPlay()
      else this.audioPause()
    },
    changePlayOrder () {
      this.playOrder = (this.playOrder + 1) % this.playOrderIcon.length
    },
    playPrev () {
      this.currentIndex = (this.currentIndex - 1 + this.playList.length) % this.playList.length
    },
    playNext () {
      this.currentIndex = (this.currentIndex + 1) % this.playList.length
    },
    openPlayList () {
      this.playListDialog = true
    },
    addToPlayList (item) {
      this.playList.push(item)
    },
    delFromPlayList (index) {
      this.playList.splice(index, 1)
    },
    clickPlaySong (index) {
      this.currentIndex = index
      this.audioPlay()
    },
    clickPlayIcon (item) {
      if (this.playList.length > 0 && item.id === this.playList[this.currentIndex].id) {
        this.changePlay()
      } else {
        let index = this.playList.map((val) => { return val.id }).indexOf(item.id)
        if (index === -1) {
          this.addToPlayList(item)
          index = this.playList.length - 1
        }
        this.clickPlaySong(index)
      }
    },
    openPlayDialog () {
      this.playDialog = true
    },
    closePlayDialog () {
      this.playDialog = false
    },
    Number2Time (now) {
      return (Array(2).join('0') + Math.floor(now / 60)).slice(-2) + ':' + (Array(2).join('0') + Math.floor(now % 60)).slice(-2)
    },
    getTime (now, max) {
      return this.Number2Time(now) + '/' + this.Number2Time(max)
    },
    audioEnded () {
      if (this.playList.length > 1) {
        if (this.playOrder === 0) this.currentIndex = (this.currentIndex + 1) % this.playList.length
        else if (this.playOrder === 1) {
          let index = 0
          do {
            index = Math.floor(Math.random() * this.playList.length)
          } while (index === this.currentIndex)
          this.currentIndex = index
        }
      }
    },
    audioPlay () {
      this.playing = true
      this.$refs.audio.play()
    },
    audioPause () {
      this.playing = false
      this.$refs.audio.pause()
    },
    getCurrentTime () {
      this.sliderNow = Number(this.$refs.audio.currentTime.toFixed(1))
    },
    changeCurrentTime () {
      this.$refs.audio.currentTime = this.sliderNow
    },
    showTotalTime () {
      this.sliderMax = Number(this.$refs.audio.duration.toFixed(1))
      this.audioLoading = false
    },
    getSongUrl (id) {
      this.audioLoading = true
      music.getSongUrl(id || this.playList[this.currentIndex].id)
        .then((res) => {
          this.playList[this.currentIndex].src = res.data.data[0].url
        })
    },
    getSongLyric (id) {
      music.getSongLyric(id || this.playList[this.currentIndex].id)
        .then((res) => {
          res = res.data
          this.lyricString = res.lrc.lyric
        })
        .catch(() => {
          this.lyricString = '[00:00.000]网络连接异常'
        })
    }
  }
}
</script>

<style scoped>
</style>
