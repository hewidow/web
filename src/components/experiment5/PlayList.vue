<template>
  <v-dialog
    v-model="showDialog"
    transition="dialog-bottom-transition"
    @click:outside="closeDialog"
    fullscreen
    scrollable
  >
    <v-card
      class="rounded-0"
      color="rgb(11,40,72)"
      height="100%"
    >
      <v-card-title class="white--text py-2">播放列表
        <v-spacer></v-spacer>
        <v-icon @click="closeDialog" dark>mdi-chevron-down</v-icon>
      </v-card-title>
      <v-card-text class="pa-0">
        <v-list color="rgb(11,40,72)">
          <div v-if="playList.length === 0" class="white--text text-center text-h6">请添加歌曲到该播放列表</div>
          <v-list-item-group>
            <div
              v-for="(item,index) of playList"
              :key="index"
            >
              <v-divider dark></v-divider>
              <v-list-item @click="clickPlaySong(index)">
                <span :class="index === playIndex ? 'teal--text text--accent-3' : 'white--text'">{{item.title}} </span>
                <span :class="index === playIndex ? 'teal--text text--accent-3 mx-1' : 'grey--text mx-1'"> - {{item.artist}}</span>
                <v-icon v-if="index === playIndex" style="transform: rotate(-90deg)" color="teal accent-3">mdi-format-align-left</v-icon>
                <v-spacer></v-spacer>
                <v-icon color="grey" @click="delFromPlayList(index)">mdi-close</v-icon>
              </v-list-item>
            </div>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'PlayList',
  props: {
    showDialog: {
      type: Boolean,
      default: false
    },
    playList: {
      type: Array,
      default: () => []
    },
    playIndex: {
      type: Number,
      default: -1
    }
  },
  methods: {
    closeDialog () {
      this.$emit('close')
    },
    delFromPlayList (index) {
      this.$emit('delFromPlayList', index)
    },
    clickPlaySong (index) {
      this.$emit('clickPlaySong', index)
    }
  }
}
</script>

<style scoped>
</style>
