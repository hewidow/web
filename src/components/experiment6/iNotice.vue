<template>
  <i-bottom-dialog :show-dialog="showNotice" @closeDialog="closeNotice">
    <template v-slot:content>
      <v-card class="rounded-0" style="height: 50vh">
        <v-toolbar flat>
          <v-spacer></v-spacer>
          <v-spacer></v-spacer>
          <v-toolbar-title class="font-weight-bold">{{ vendorName }}</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn icon @click="closeNotice">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-toolbar>
        <v-card-text style="height: 100%">
          <div class="font-weight-bold black--text">公告</div>
          <div>{{noticeText}}</div>
        </v-card-text>
      </v-card>
    </template>
  </i-bottom-dialog>
</template>

<script>
import iBottomDialog from './iBottomDialog'
export default {
  name: 'Notice',
  components: {
    iBottomDialog
  },
  props: {
    showNotice: {
      type: Boolean,
      default: false
    },
    vendorName: {
      type: String,
      default: ''
    },
    noticeText: {
      type: String,
      default: ''
    }
  },
  methods: {
    closeNotice () {
      this.$emit('closeNotice')
    }
  }
}
</script>

<style scoped>
</style>
