<template>
  <vue-gallery :photos="photos"></vue-gallery>
</template>

<script>
import VueGallery from '../../components/experiment4/VueGallery.vue'
export default {
  name: 'Photo',
  components: {
    VueGallery
  },
  data: function () {
    return {
      photos: [
        require('../../assets/img/other/lordea-home-01-min.jpg'),
        require('../../assets/img/other/lordea-home-02-min.jpg'),
        require('../../assets/img/other/lordea-home-03-min.jpg'),
        require('../../assets/img/other/lordea-home-04-min.jpg'),
        require('../../assets/img/other/lordea-home-05-min.jpg'),
        require('../../assets/img/other/lordea-home-06-min.jpg'),
        require('../../assets/img/other/lordea-home-07-min.jpg'),
        require('../../assets/img/other/lordea-home-08-min.jpg')
      ]
    }
  }

}
</script>
