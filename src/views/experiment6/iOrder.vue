<template>
  <v-container class="pa-0">
    <v-row class="pa-2" style="z-index: 0;">
      <v-col>
        <v-carousel
            v-model="postModel"
            hide-delimiter-background
            delimiter-icon="mdi-minus"
            :show-arrows="false"
            height="100"
            class="rounded-lg"
            cycle
            interval="2000"
        >
          <v-carousel-item
              v-for="(item, index) in posts"
              :key="index"
          >
            <v-img :src="item" max-height="100%"></v-img>
          </v-carousel-item>
        </v-carousel>
      </v-col>
    </v-row>
    <v-row no-gutters :style="{height: `calc(100vh - 48px)`}">
      <v-col cols="3" class="overflow-hidden">
        <div
          class="overflow-y-auto"
          :style="{maxHeight: `calc(100vh - 48px)`, width: `calc(100% + 15px)`}"
        >
          <v-card class="pa-0" elevation="0" style="width: calc(100% - 15px)">
            <div class="text-center">
              <div
                v-for="(good, index) in goods"
                :key="index"
                :class="'pa-1 justify-center align-center ' + (currentIndex === index ? 'active-menu-item' : 'no-active-menu-item')"
                @click="jump(index)"
                style="display: flex;height: 64px"
              >
                <div class="mr-1 align-self-center" v-if="good.icon !== null && good.icon !== ''">
                  <v-icon color="amber">{{ good.icon }}</v-icon>
                </div>
                <div>{{good.name}}</div>
              </div>
            </div>
            <v-list-item class="no-active-menu-item"></v-list-item>
            <v-list-item class="no-active-menu-item"></v-list-item>
          </v-card>
        </div>
      </v-col>
      <v-col cols="9" class="overflow-hidden">
        <div
          class="overflow-y-auto"
          :style="{maxHeight: `calc(100vh - 48px)`, width: `calc(100% + 15px)`}"
          id="foods"
        >
          <v-card class="pa-0" elevation="0" style="width: calc(100% - 15px)">
            <v-list>
              <div
                v-for="(good, index) in goods"
                :key="index"
                :id="`food${index}`"
                class="food-list-hook"
              >
                <v-list-item class="font-weight-bold text-h6">{{good.name}}</v-list-item>
                <v-list-item
                  v-for="(food, index) in good.foods"
                  :key="index"
                >
                  <v-row class="ma-0" dense>
                    <v-col @click="openFood(food)" cols="4" align-self="center">
                      <v-img aspect-ratio="1.0" max-height="100%" :src="food.icon">
                      </v-img>
                    </v-col>
                    <v-col cols="8" align-self="center">
                      <div @click="openFood(food)" class="font-weight-bold subtitle-1">{{food.name}}</div>
                      <div @click="openFood(food)" class="grey--text body-2" style="text-overflow:ellipsis;overflow:hidden;width: 150px;white-space:nowrap;">{{food.description}}</div>
                      <div @click="openFood(food)">
                        <span class="grey--text body-2">月售{{food.sellCount}}份 </span>
                        <span class="grey--text body-2">好评率{{food.rating}}%</span>
                      </div>
                      <v-row no-gutters class="align-center">
                        <v-col @click="openFood(food)" class="text-start" cols="4">
                          <span class="red--text font-weight-bold">¥{{food.price}} </span>
                          <span class="grey--text caption text-decoration-line-through" v-if="food.oldPrice">¥{{food.oldPrice}}</span>
                        </v-col>
                        <v-col class="text-end" cols="8">
                          <i-counter :food="food" @addCount="addCount(food)" @subCount="subCount(food)"></i-counter>
                        </v-col>
                      </v-row>
                    </v-col>
                  </v-row>
                </v-list-item>
              </div>
              <v-list-item></v-list-item>
              <v-list-item></v-list-item>
            </v-list>
          </v-card>
        </div>
      </v-col>
    </v-row>
    <i-food
      :food="currentFood"
      :show-food="showFood"
      @closeFood="closeFood"
      @addCount="addCount"
      @subCount="subCount"
    ></i-food>
    <i-footer
      :items="cart"
      @clearCart="clearCart"
      @addCount="addCount"
      @subCount="subCount"
    ></i-footer>
  </v-container>
</template>

<script>
import iCounter from '../../components/experiment6/iCounter'
import iFooter from '../../components/experiment6/iFooter'
import iFood from '../../components/experiment6/iFood'
export default {
  name: 'iOrder',
  components: {
    iCounter,
    iFooter,
    iFood
  },
  computed: {
    currentIndex () {
      for (let i = 0; i < this.foodListHeights.length - 1; i++) {
        const heightBottom = this.foodListHeights[i]
        const heightTop = this.foodListHeights[i + 1]
        if (this.currentY < heightTop && this.currentY >= heightBottom) {
          return i
        }
      }
      return -1
    }
  },
  mounted () {
    this.calcHeight()
    document.getElementById('foods').addEventListener('scroll', this.handleScroll)
  },
  methods: {
    openFood (food) {
      this.currentFood = food
      this.showFood = true
    },
    closeFood () {
      this.showFood = false
      this.currentFood = null
    },
    clearCart () {
      for (const food of this.cart) {
        food.count = 0
      }
      this.cart.splice(0, this.cart.length)
    },
    addCount (food) {
      const index = this.cart.indexOf(food)
      food.count += 1
      if (index === -1) this.cart.push(food)
    },
    subCount (food) {
      if (food.count === 1) this.cart.splice(this.cart.indexOf(food), 1)
      food.count -= 1
    },
    handleScroll () {
      this.currentY = document.getElementById('foods').scrollTop
    },
    jump (index) {
      document.getElementById('food' + index).scrollIntoView()
    },
    calcHeight () {
      const foodList = document.getElementsByClassName('food-list-hook')
      let height = 0
      this.foodListHeights.push(height)
      for (let i = 0; i < foodList.length; i++) {
        height += foodList[i].clientHeight
        this.foodListHeights.push(height)
      }
    }
  },
  data: () => ({
    currentFood: null,
    showFood: false,
    cart: [],
    currentY: 0,
    foodListHeights: [],
    postModel: 0,
    posts: [
      require('../../assets/img/elm/post1.webp'),
      require('../../assets/img/elm/post2.jpg')
    ],
    goods: [{
      name: '热销榜',
      foods: [{
        name: '皮蛋瘦肉粥',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '咸粥',
        sellCount: 229,
        rating: 100,
        info: '一碗皮蛋瘦肉粥，总是我到粥店时的不二之选。香浓软滑，饱腹暖心，皮蛋的Q弹与瘦肉的滑嫩伴着粥香溢于满口，让人喝这样的一碗粥也觉得心满意足',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '很喜欢的粥',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 1,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '扁豆焖面',
        count: 0,
        price: 14,
        oldPrice: '',
        description: '',
        sellCount: 188,
        rating: 96,
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 1,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        info: '',
        icon: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '葱花饼',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '',
        sellCount: 124,
        rating: 85,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 1,
          text: '没啥味道',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 1,
          text: '很一般啊',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '牛肉馅饼',
        count: 0,
        price: 14,
        oldPrice: '',
        description: '',
        sellCount: 114,
        rating: 91,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 1,
          text: '难吃不推荐',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '招牌猪肉白菜锅贴/10个',
        count: 0,
        price: 17,
        oldPrice: '',
        description: '',
        sellCount: 101,
        rating: 78,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 1,
          text: '不脆,不好吃',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '南瓜粥',
        count: 0,
        price: 9,
        oldPrice: '',
        description: '甜粥',
        sellCount: 91,
        rating: 100,
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '红豆薏米美肤粥',
        count: 0,
        price: 12,
        oldPrice: '',
        description: '甜粥',
        sellCount: 86,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '八宝酱菜',
        count: 0,
        price: 4,
        oldPrice: '',
        description: '',
        sellCount: 84,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '红枣山药糙米粥',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '',
        sellCount: 81,
        rating: 91,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '糊塌子',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '',
        sellCount: 80,
        rating: 93,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '单人精彩套餐',
      icon: 'mdi-star',
      foods: [{
        name: '红枣山药粥套餐',
        count: 0,
        price: 29,
        oldPrice: 36,
        description: '红枣山药糙米粥,素材包,爽口莴笋丝,四川泡菜或八宝酱菜,配菜可备注',
        sellCount: 17,
        rating: 100,
        info: '',
        ratings: [{
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/6/72/cb844f0bb60c502c6d5c05e0bddf5jpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '冰爽饮品限时特惠',
      icon: 'mdi-bookmark-check',
      foods: [{
        name: 'VC无限橙果汁',
        count: 0,
        price: 8,
        oldPrice: 10,
        description: '',
        sellCount: 15,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '还可以',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '精选热菜',
      foods: [{
        name: '娃娃菜炖豆腐',
        count: 0,
        price: 17,
        oldPrice: '',
        description: '',
        sellCount: 43,
        rating: 92,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '菜量还可以,味道还可以',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/d/2d/b1eb45b305635d9dd04ddf157165fjpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '手撕包菜',
        count: 0,
        price: 16,
        oldPrice: '',
        description: '',
        sellCount: 29,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/9/c6/f3bc84468820121112e79583c24efjpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '香酥黄金鱼/3条',
        count: 0,
        price: 11,
        oldPrice: '',
        description: '',
        sellCount: 15,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/4/e7/8277a6a2ea0a2e97710290499fc41jpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '爽口凉菜',
      foods: [{
        name: '八宝酱菜',
        count: 0,
        price: 4,
        oldPrice: '',
        description: '',
        sellCount: 84,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '拍黄瓜',
        count: 0,
        price: 9,
        oldPrice: '',
        description: '',
        sellCount: 28,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/6/54/f654985b4e185f06eb07f8fa2b2e8jpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '精选套餐',
      foods: [{
        name: '红豆薏米粥套餐',
        count: 0,
        price: 37,
        oldPrice: '',
        description: '红豆薏米粥,三鲜干蒸烧卖,拍黄瓜',
        sellCount: 3,
        rating: 100,
        info: '',
        ratings: [{
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/f/49/27f26ed00c025b2200a9ccbb7e67ejpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '皮蛋瘦肉粥套餐',
        count: 0,
        price: 31,
        oldPrice: '',
        description: '',
        sellCount: 12,
        rating: 100,
        info: '',
        ratings: [{
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/8/96/f444a8087f0e940ef264617f9d98ajpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '果拼果汁',
      foods: [{
        name: '蜜瓜圣女萝莉杯',
        count: 0,
        price: 6,
        oldPrice: '',
        description: '',
        sellCount: 1,
        rating: '',
        info: '',
        ratings: [],
        icon: 'http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/b/5f/b3b04c259d5ec9fa52e1856ee50dajpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '加多宝',
        count: 0,
        price: 6,
        oldPrice: '',
        description: '',
        sellCount: 7,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/b/9f/5e6c99c593cf65229225c5661bcdejpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: 'VC无限橙果汁',
        count: 0,
        price: 8,
        oldPrice: 10,
        description: '',
        sellCount: 15,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '还可以',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/e/c6/f348e811772016ae24e968238bcbfjpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '小吃主食',
      foods: [{
        name: '扁豆焖面',
        count: 0,
        price: 14,
        oldPrice: '',
        description: '',
        sellCount: 188,
        rating: 96,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 1,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/c/6b/29e3d29b0db63d36f7c500bca31d8jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '葱花饼',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '',
        sellCount: 124,
        rating: 85,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 1,
          text: '没啥味道',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 1,
          text: '很一般啊',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/f/28/a51e7b18751bcdf871648a23fd3b4jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '牛肉馅饼',
        count: 0,
        price: 14,
        oldPrice: '',
        description: '',
        sellCount: 114,
        rating: 91,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 1,
          text: '难吃不推荐',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/d/b9/bcab0e8ad97758e65ae5a62b2664ejpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '招牌猪肉白菜锅贴/10个',
        count: 0,
        price: 17,
        oldPrice: '',
        description: '',
        sellCount: 101,
        rating: 78,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 1,
          text: '不脆,不好吃',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/7/72/9a580c1462ca1e4d3c07e112bc035jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '糊塌子',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '',
        sellCount: 80,
        rating: 93,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/0/05/097a2a59fd2a2292d08067e16380cjpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }, {
      name: '特色粥品',
      foods: [{
        name: '皮蛋瘦肉粥',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '咸粥',
        sellCount: 229,
        rating: 100,
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '很喜欢的粥',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 1,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/c/cd/c12745ed8a5171e13b427dbc39401jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '南瓜粥',
        count: 0,
        price: 9,
        oldPrice: '',
        description: '甜粥',
        sellCount: 91,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/8/a6/453f65f16b1391942af11511b7a90jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '红豆薏米美肤粥',
        count: 0,
        price: 12,
        oldPrice: '',
        description: '甜粥',
        sellCount: 86,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/d/22/260bd78ee6ac6051136c5447fe307jpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '红枣山药糙米粥',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '',
        sellCount: 81,
        rating: 91,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/9/b5/469d8854f9a3a03797933fd01398bjpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '鲜蔬菌菇粥',
        count: 0,
        price: 11,
        oldPrice: '',
        description: '咸粥',
        sellCount: 56,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, { username: '2******3', rateTime: 1469271264000, rateType: 0, text: '' }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/e/a3/5317c68dd618929b6ac05804e429ajpeg.jpeg?imageView2/1/w/750/h/750'
      }, {
        name: '田园蔬菜粥',
        count: 0,
        price: 10,
        oldPrice: '',
        description: '咸粥',
        sellCount: 33,
        rating: 100,
        info: '',
        ratings: [{
          username: '3******c',
          rateTime: 1469281964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '2******3',
          rateTime: 1469271264000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }, {
          username: '3******b',
          rateTime: 1469261964000,
          rateType: 0,
          text: '',
          avatar: 'http://static.galileo.xiaojukeji.com/static/tms/default_header.png'
        }],
        icon: 'http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/114/h/114',
        image: 'http://fuss10.elemecdn.com/a/94/7371083792c19df00e546b29e344cjpeg.jpeg?imageView2/1/w/750/h/750'
      }]
    }]
  })
}
</script>

<style scoped>
.active-menu-item {
  background-color: white;
}
.no-active-menu-item {
  background-color: #f3f3f3;
}
</style>
