import Axios from 'axios'

const axios = Axios.create({
  baseURL: 'https://netease-cloud-music-api-eta-liard.vercel.app/'
})

axios.interceptors.request.use(function (config) {
  if (config.url !== '/search/hot') {
    config.url += '&realIP=112.10.182.31'
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

export const music = {
  getRankList () {
    return axios.get('/playlist/detail?id=1')
  },
  getSongUrl (id) {
    return axios.get('/song/url?id=' + id)
  },
  getSongLyric (id) {
    return axios.get('/lyric?id=' + id)
  },
  searchSong (keywords) {
    return axios.get('/cloudsearch?keywords=' + keywords)
  },
  searchHot () {
    return axios.get('/search/hot')
  }
}
