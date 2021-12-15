<template>
  <v-app>
    <top-app-bar app-title="黑白棋"></top-app-bar>
    <v-main class="background-color: blue-grey lighten-4">
      <v-container>
        <v-row>
          <v-col>
            <div id="square">
              <canvas id="myCanvas" width="800" height="800" class="elevation-4"></canvas>
            </div>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="4">
            <v-avatar
              color="white"
              size="40"
              class="elevation-4"
            >
              <span id="whiteScore">0</span>
            </v-avatar>
          </v-col>
          <v-col cols="4" class="text-center">
            <v-avatar
              size="40"
              style="background-color: black"
              id="nowPlayerColor"
              class="elevation-4"
            >
              <span id="nowPlayer" style="color: white">黑</span>
            </v-avatar>
          </v-col>
          <v-col cols="4" class="text-end">
            <v-avatar
              color="black"
              size="40"
              class="elevation-4"
            >
              <span id="blackScore" style="color: white">0</span>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="text-center">
            <v-btn @click="init" color="primary" class="elevation-4">重新开始</v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/*
* @param realWidth: 屏幕可见的宽度，因为canvas有缩放
* @param boardWidth: 棋盘边长，因为是正方形
* @param gridNum: 棋盘格子数
* @param gridWidth: 棋盘格子边长
* @param flag: 0、1代表两个玩家
* @param score: 两个玩家的分数
* @param chessColor: 棋子的颜色
* @param players: 轮到的玩家显示的名称
* @param mp: 棋盘二维数组，-2为合法落点，-1为未落子，0为一个玩家，1位另一个玩家
* @param dx: x方向向量值，方便枚举8个方向
* @param dy: y方向向量值，方便枚举8个方向
* @param chessCalcNum: 本方可落子的数量
* */
let realWidth = 0
const boardWidth = 800
const gridNum = 8
const gridWidth = boardWidth / gridNum
let flag = 1
let score = [0, 0]
const chessColor = ['white', 'black']
const players = ['白', '黑']
const mp = new Array(gridNum)
const dx = [0, 0, 1, -1, 1, 1, -1, -1]
const dy = [1, -1, 0, 0, 1, -1, 1, -1]
let chessCalcNum = 0
for (let i = 0; i < gridNum; ++i) mp[i] = new Array(gridNum)
let c = null
let ct = null

/*
* 绘制棋盘和棋子以及修改下方的分数
* @return: void
* */
function draw () {
  ct.clearRect(0, 0, boardWidth, boardWidth)
  ct.fillStyle = 'rgb(21,198,22)'
  ct.fillRect(0, 0, boardWidth, boardWidth) // 绿色背景
  for (let i = 1; i < gridNum; ++i) { // 画水平垂直的格子线
    ct.beginPath()
    ct.lineWidth = '2'
    ct.strokeStyle = 'white'
    ct.moveTo(i * gridWidth, 0)
    ct.lineTo(i * gridWidth, boardWidth)
    ct.stroke()
    ct.beginPath()
    ct.lineWidth = '2'
    ct.strokeStyle = 'white'
    ct.moveTo(0, i * gridWidth)
    ct.lineTo(boardWidth, i * gridWidth)
    ct.stroke()
  }
  score = [0, 0]
  for (let i = 0; i < gridNum; ++i) {
    for (let j = 0; j < gridNum; ++j) {
      if (mp[i][j] === 0 || mp[i][j] === 1) { // 画棋子
        ct.beginPath()
        ct.arc(i * gridWidth + gridWidth / 2, j * gridWidth + gridWidth / 2, gridWidth * 0.45, 0, 2 * Math.PI)
        ct.fillStyle = chessColor[mp[i][j]]
        ct.fill()
        score[mp[i][j]] += 1
      } else if (mp[i][j] === -2) { // 画合法落子点
        ct.beginPath()
        ct.arc(i * gridWidth + gridWidth / 2, j * gridWidth + gridWidth / 2, gridWidth * 0.45, 0, 2 * Math.PI)
        ct.strokeStyle = 'gray'
        ct.stroke()
      }
    }
  }
  document.getElementById('whiteScore').innerHTML = String(score[0]) // 黑白分数和轮到谁了
  document.getElementById('blackScore').innerHTML = String(score[1])
  document.getElementById('nowPlayer').innerHTML = players[flag]
  document.getElementById('nowPlayer').style.color = chessColor[flag ^ 1]
  document.getElementById('nowPlayerColor').style.backgroundColor = chessColor[flag]
  if (score[0] + score[1] === gridNum * gridNum) { // 结束提示
    let winner = 2
    if (score[0] > score[1]) {
      winner = 0
    } else if (score[0] < score[1]) winner = 1
    ct.font = gridWidth + 'px Georgia'
    ct.fillStyle = 'red'
    if (winner < 2) {
      ct.fillText(players[winner] + '　赢了', boardWidth / 2 - gridWidth * 2, boardWidth / 2 + gridWidth / 2)
    } else {
      ct.fillText('平局', boardWidth / 2 - gridWidth, boardWidth / 2 + gridWidth / 2)
    }
  }
}

/*
* 检测点(x,y)坐标是否在界限内
* @return: bool
* */
function check (x, y) {
  return x >= 0 && x < gridNum && y >= 0 && y < gridNum
}

/*
* 检测点(x,y)是否能落子，modify为是否真实修改的标记
* @return: bool
* */
function solve (x, y, modify) {
  if (mp[x][y] === 0 || mp[x][y] === 1) return false
  let ok = 0 // 判断此点是否合法，即至少需要改变对方一个棋子
  for (let i = 0; i < 8; ++i) { // 八个方向
    let nx = x + dx[i]
    let ny = y + dy[i]
    while (check(nx, ny) && mp[nx][ny] === (flag ^ 1)) {
      nx += dx[i]
      ny += dy[i]
    } // 直到找到一个和本方颜色一样的或越界停止
    if (check(nx, ny) && mp[nx][ny] === flag) { // 根据之前的搜索路径回退，并修改经过的点为本方颜色
      nx -= dx[i]
      ny -= dy[i]
      while (nx !== x || ny !== y) {
        if (modify) mp[nx][ny] = flag //  modify为修改标记
        nx -= dx[i]
        ny -= dy[i]
        ok = 1
      }
    }
  }
  if (ok === 0) return false
  if (modify) mp[x][y] = flag
  return true
}

/*
* 计算合法落点并修改对应数组中的值为-2
* @return: void
* */
function calc () {
  chessCalcNum = 0 //  本方合法落点的数量
  for (let i = 0; i < gridNum; ++i) {
    for (let j = 0; j < gridNum; ++j) {
      if (mp[i][j] === -2) mp[i][j] = -1
      if (solve(i, j, false)) {
        mp[i][j] = -2
        chessCalcNum += 1
      }
    }
  }
}

export default {
  name: 'Reversi',
  data: () => ({
    nowPlayerColor: 'black'
  }),
  mounted () {
    realWidth = document.getElementById('square').offsetWidth
    c = document.getElementById('myCanvas')
    ct = c.getContext('2d')
    /*
    * 点击棋盘事件
    * */
    c.onclick = function (e) {
      /* 因为canvas为800像素，css进行了缩放，所以offsetX和offsetY需要换算回原来的像素值，然后再除以格子边长gridWidth来计算坐标 */
      const x = Math.min(Math.floor(e.offsetX * boardWidth / (realWidth * gridWidth)), gridNum - 1)
      const y = Math.min(Math.floor(e.offsetY * boardWidth / (realWidth * gridWidth)), gridNum - 1)
      if (solve(x, y, true)) {
        flag ^= 1
        calc()
        /* 切换为对方后，对方无合法落点，切换回本方 */
        if (chessCalcNum === 0) {
          flag ^= 1
          calc()
        }
        draw()
      }
    }
    this.init()
  },
  methods: {
    /*
    * 初始化
    * @return: void
    * */
    init () {
      flag = 1
      for (let i = 0; i < gridNum; ++i) {
        for (let j = 0; j < gridNum; ++j) {
          mp[i][j] = -1
        }
      }
      mp[Math.floor(gridNum / 2) - 1][Math.floor(gridNum / 2) - 1] = mp[Math.floor(gridNum / 2)][Math.floor(gridNum / 2)] = 0 // 初始状态
      mp[Math.floor(gridNum / 2)][Math.floor(gridNum / 2) - 1] = mp[Math.floor(gridNum / 2) - 1][Math.floor(gridNum / 2)] = 1
      calc()
      draw()
    }
  }
}
</script>

<style scoped>
#square{
  position: relative;
  width: 100%;
  padding-top: 100%;
}
#myCanvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
