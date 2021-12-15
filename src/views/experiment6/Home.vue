<template>
  <v-app>
    <i-header></i-header>
    <v-main>
      <v-tabs
        v-model="tab"
        style="position:sticky;top: 0;z-index: 100;"
      >
        <v-tab>点餐</v-tab>
        <v-tab>
          <v-badge
            color="orange"
            content="4.9"
          >评价</v-badge>
        </v-tab>
        <v-tab>商家</v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <i-order></i-order>
        </v-tab-item>
        <v-tab-item>
          <i-appraisal></i-appraisal>
        </v-tab-item>
        <v-tab-item>
          <i-merchant></i-merchant>
        </v-tab-item>
      </v-tabs-items>
    </v-main>
  </v-app>
</template>

<script>
import iHeader from '../../components/experiment6/iHeader'
import iOrder from './iOrder'
import iMerchant from './iMerchant'
import iAppraisal from './iAppraisal'
export default {
  name: 'App',
  components: {
    iHeader,
    iOrder,
    iMerchant,
    iAppraisal
  },
  data: () => ({
    tab: null
  }),
  methods: {

  }
}
</script>
