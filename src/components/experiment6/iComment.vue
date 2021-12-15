<template>
  <div>
    <div>
      <v-chip-group
        column
        mandatory
        v-model="chooseTag"
        active-class="primary--text"
      >
        <v-chip
          v-for="(tag, index) in tags"
          :key="index"
        >
          {{
            tag + ' ' + (index === 0 ? doFilter2(comments).length : (index === 1 ? doFilter2(comments).filter((val) => {
              return val.rateType === 0
            }).length : doFilter2(comments).filter((val) => {
              return val.rateType === 1
            }).length))
          }}
        </v-chip>
      </v-chip-group>
    </div>
    <div>
      <v-checkbox
        v-model="showDetail"
        hide-details
        class="ma-0"
      >
        <template v-slot:label>
          <span class="caption">只看有内容的评价</span>
        </template>
      </v-checkbox>
    </div>
    <div
      v-for="(comment,index) of doFilter(comments)"
      :key="index"
    >
      <v-divider class="my-3"></v-divider>
      <v-row
        dense
        class="caption"
      >
        <v-col cols="1">
          <v-img
            :src="comment.avatar"
            aspect-ratio="1.0"
            class="rounded-circle"
          ></v-img>
        </v-col>
        <v-col cols="7">
          <div class="black--text">{{ comment.username }}</div>
          <v-row dense>
            <v-col cols="5">
              <v-rating
                :value="comment.score ? comment.score : (comment.rateType === 0 ? 5 : 0)"
                background-color="orange lighten-3"
                color="orange"
                x-small
                half-increments
                dense
                readonly
              ></v-rating>
            </v-col>
            <v-col cols="7">
              <span v-if="comment.deliveryTime" class="grey--text">{{ comment.deliveryTime }}分钟送达</span>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4" class="text-end">
          <div class="black--text">{{ formatDate(comment.rateTime, 'yyyy-MM-dd hh:mm') }}</div>
        </v-col>
        <v-col cols="12">
          <div class="subtitle-2 black--text">{{ comment.text }}</div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
export default {
  name: 'iComment',
  props: {
    comments: {
      type: Array,
      default: () => []
    }
  },
  data: () => ({
    tags: [
      '全部',
      '好评',
      '差评'
    ],
    showDetail: false,
    chooseTag: null
  }),
  methods: {
    doFilter (arr) {
      let res = arr
      if (this.showDetail === true) {
        res = res.filter((val) => {
          return val.text !== null && val.text !== ''
        })
      }
      if (this.chooseTag === 1) {
        res = res.filter((val) => {
          return val.rateType === 0
        })
      } else if (this.chooseTag === 2) {
        res = res.filter((val) => {
          return val.rateType === 1
        })
      }
      return res
    },
    doFilter2 (arr) {
      let res = arr
      if (this.showDetail === true) {
        res = res.filter((val) => {
          return val.text !== null && val.text !== ''
        })
      }
      return res
    },
    padLeftZero (str) {
      return ('00' + str).substr(str.length)
    },
    formatDate (date, fmt) {
      date = new Date(date)
      if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
      }
      const o = {
        'M+': date.getMonth() + 1,
        'd+': date.getDate(),
        'h+': date.getHours(),
        'm+': date.getMinutes(),
        's+': date.getSeconds()
      }
      for (const k in o) {
        if (new RegExp(`(${k})`).test(fmt)) {
          const str = o[k] + ''
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : this.padLeftZero(str))
        }
      }
      return fmt
    }
  }
}
</script>

<style scoped>

</style>
