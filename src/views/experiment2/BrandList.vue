<template>
  <v-app>
    <top-app-bar app-title="品牌列表"></top-app-bar>
    <v-main>
      <v-container fluid>
        <v-row>
          <v-col>
            <v-text-field
              label="标题检索"
              outlined
              hide-details="auto"
              v-model="titleSearch"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-fade-transition group>
          <v-row justify="center" v-for="(item,index) in search(titleSearch)" :key="index" v-show="(index>=(page-1)*cnt&&index<page*cnt)?true:false">
            <v-col>
              <v-card elevation="2">
                <v-card-title class="font-weight-bold">[{{index}}] {{item.title}}</v-card-title>
                <v-card-text>
                  <v-simple-table>
                    <thead>
                    <tr>
                      <th>发布人</th>
                      <th>发布时间</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr>
                      <td>{{item.user}}</td>
                      <td>{{item.dates}}</td>
                    </tr>
                    </tbody>
                  </v-simple-table>
                </v-card-text>
                <v-card-actions>
                  <v-btn color="primary" text @click="edit(item)">编辑</v-btn>
                  <v-btn color="error" text @click="del(item)">删除</v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-fade-transition>
        <v-row>
          <v-col>
            <v-pagination
              v-model="page"
              :length="pageLen"
              :total-visible="5"
            ></v-pagination>
          </v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-row>
          <v-col></v-col>
        </v-row>
        <v-fab-transition>
          <v-btn
            elevation="2"
            bottom
            right
            fixed
            color="purple"
            fab
            @click="addShow=true"
            v-show="!addShow"
          ><v-icon color="white">mdi-plus</v-icon></v-btn>
        </v-fab-transition>
        <v-dialog v-model="addShow" persistent>
          <v-card>
            <v-card-title>添加项目</v-card-title>
            <v-card-text>
              <v-text-field
                label="标题"
                outlined
                v-model="addItem.title"
              ></v-text-field>
              <v-text-field
                label="发布人"
                outlined
                v-model="addItem.user"
              ></v-text-field>
              <v-text-field
                label="发布时间"
                outlined
                v-model="addItem.dates"
                type="date"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="add">确认</v-btn>
                <v-btn color="error" @click="addShow=false">关闭</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
        <v-dialog v-model="editShow" persistent>
          <v-card>
            <v-card-title>修改项目</v-card-title>
            <v-card-text>
              <v-text-field
                label="标题"
                outlined
                v-model="editItem.title"
              ></v-text-field>
              <v-text-field
                label="发布人"
                outlined
                v-model="editItem.user"
              ></v-text-field>
              <v-text-field
                label="发布时间"
                outlined
                v-model="editItem.dates"
                type="date"
              ></v-text-field>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" @click="modify">确认</v-btn>
                <v-btn color="error" @click="editShow=false">关闭</v-btn>
              </v-card-actions>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-container>
    </v-main>

  </v-app>
</template>

<script>
export default {
  name: 'BrandList',
  data: () => ({
    items: [{
      title: '在移动设备开发',
      user: '王小俊',
      dates: '2019-05-03'
    },
    {
      title: '图形及特效特性',
      user: '胡奎',
      dates: '2019-03-07'
    },
    {
      title: '设备兼容特性',
      user: '李三',
      dates: '2019-07-09'
    },
    {
      title: 'W3C将致力于开发用于实时通信',
      user: '张兵',
      dates: '2019-06-08'
    },
    {
      title: '全新的表单输入对象',
      user: '沈舟',
      dates: '2019-03-15'
    }],
    addShow: false,
    addItem: {
      title: '',
      user: '',
      dates: ''
    },
    editShow: false,
    editItem: {},
    editItemTp: {},
    titleSearch: '',
    page: 1,
    pageLen: 1,
    cnt: 2
  }),
  methods: {
    add () {
      this.items.push({
        title: this.addItem.title,
        user: this.addItem.user,
        dates: this.addItem.dates
      })
      this.addShow = false
    },
    del (item) {
      for (let i = this.items.length - 1; i >= 0; --i) {
        if (this.items[i] === item) {
          this.items.splice(i, 1)
          break
        }
      }
    },
    edit (item) {
      this.editShow = true
      this.editItem = {
        title: item.title,
        user: item.user,
        dates: item.dates
      }
      this.editItemTp = item
    },
    modify () {
      this.editShow = false
      this.editItemTp.title = this.editItem.title
      this.editItemTp.user = this.editItem.user
      this.editItemTp.dates = this.editItem.dates
    },
    search (title) {
      const arr = this.items.filter(item => {
        if (item.title.includes(title)) return item
      })
      this.pageLen = Math.floor((arr.length + this.cnt - 1) / this.cnt)
      if (this.page < 1 && this.pageLen > 0) this.page = 1
      if (this.page > this.pageLen) this.page = this.pageLen
      return arr
    }
  }
}
</script>
