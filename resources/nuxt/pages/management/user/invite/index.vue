<template>
    <section>
        <contents-name name="ユーザ招待">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/management/user/'}">ユーザ一覧</el-breadcrumb-item>
                <el-breadcrumb-item>ユーザ招待</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>

        <div class="inviting">
            <div class="inviting-users">
                <div class="search">
                    <h3 class="title">招待中のユーザ</h3>
                    <el-autocomplete
                            class="inline-input"
                            v-model="search.name"
                            :fetch-suggestions="querySearch"
                            placeholder="name"
                            :trigger-on-focus="false"
                            @select="handleSelect"
                            icon="search"
                    ></el-autocomplete>
                    <el-input placeholder="email" v-model="search.email"></el-input>
                </div>
                <div v-if="displayUsers.length">
                    <div class="inviting-user" v-for="user in displayUsers" :key="user.id">
                        <span>{{ user.last_name }}{{ user.first_name }}</span>
                        <span>{{ user.email }}</span>
                    </div>
                </div>
                <div v-else>
                    <div class="err">
                        <p>User Not Found !</p>
                        <icon scale="8" name="frown-o"></icon>
                    </div>
                </div>
            </div>
        </div>
        <div class="invite-form">
            <el-form ref="form" label-width="150px">
                <el-form-item label="苗字" required>
                    <el-input placeholder="Please input" v-model="context.last_name"></el-input>
                </el-form-item>
                <el-form-item label="名前" required>
                    <el-input placeholder="Please input" v-model="context.first_name"></el-input>
                </el-form-item>
                <el-form-item label="苗字 (かな)">
                    <el-input placeholder="Please input" v-model="context.last_name_kana"></el-input>
                </el-form-item>
                <el-form-item label="名前 (かな)">
                    <el-input placeholder="Please input" v-model="context.first_name_kana"></el-input>
                </el-form-item>
                <el-form-item label="Eメール">
                    <el-input placeholder="Eメール" name="email" v-model="context.email"></el-input>
                </el-form-item>
                <el-form-item label="役職">
                    <el-input placeholder="Please input" v-model="context.position"></el-input>
                </el-form-item>
                <el-form-item label="グループ">
                    <el-select v-model="context.group_id" placeholder="Select">
                        <el-option
                                v-for="item in groups"
                                action="http://0.0.0.0:3333"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="マネージャフラグ">
                    <el-input placeholder="マネージャフラグ" v-model="context.manager_flag"></el-input>
                </el-form-item>
                <div class="invite-button">
                    <el-button @click="invite" type="primary">招待</el-button>
                </div>
            </el-form>
        </div>

    </section>
</template>
<script>
  import ContentsName from '~/components/ContentsName.vue'
  import Uploader from '~/components/Uploader.vue'
  import moment from 'moment'
  export default {
    components: {
      ContentsName,
      Uploader
    },
    async fetch({app, store}){
      const {data} = await app.$http.get('/manager/invite')
      store.commit('SET_INVITING_USERS', data.users)
    },
    async asyncData({app}){
      const {data} = await app.$http.get('group')
      const groups = data.groups.map((group) => {
        return {value: group.id, label: group.name}
      })
      return {groups: groups}
    },
    computed: {
      displayUsers(){
        let users = this.$store.state.invitingUsers

        users = users.filter((user) => {
          const fullName = this.fullName(user.last_name, user.first_name)
          const fullNameKana = this.fullName(user.last_name_kana, user.first_name_kana)
          return fullName.indexOf(this.search.name) >= 0 || fullNameKana.indexOf(this.search.name) >= 0
        })
        users = users.filter((user) => {
          return user.email.indexOf(this.search.email) > -1
        })

        return users
      },
      toValueFormUsers () {
        const users = this.$store.state.invitingUsers
        return users.map((user) => {
          return {
            value: this.fullName(user.last_name, user.first_name),
            nameKana: this.fullName(user.last_name_kana, user.first_name_kana)
          }
        })
      }
    },
    data() {
      return {
        context: {
          "last_name": "山田",
          "first_name": "太郎",
          "last_name_kana": "ヤマダ",
          "first_name_kana": "タロウ",
          "email": "mailsend.manager@gmail.com",
          "manager_flag": "normal",
          "position": "係長",
          "group_id": "",
        },
        isSend: false,
        search: {
          "name": "",
          "email": ""
        }
      }
    },
    methods: {
      fullName (last, first) {
        return `${last}${first}`
      },
      querySearch(queryString, cb) {
        let results = this.toValueFormUsers
        if (queryString) {
          results = this.toValueFormUsers.filter((user) => {
            return (user.value.indexOf(queryString) >= 0 || user.nameKana.indexOf(queryString) >= 0)
          })
        }
        if (results.length) {
          return cb(results)
        }
        return cb(this.toValueFormUsers)
      },
      handleSelect(user) {
        this.search.name = user.value
      },
      async invite(){
        if (!this.isSend) {
          this.isSend = true;
          this.$store.commit('SET_IS_LOADING', true)
          const {data} = await this.$http.post('/manager/invite', this.context).catch(err => {
            if (err.response.data.message === 'overlapping') {
              this.isSend = false;
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error('このEmailアドレスはすでに登録されています。')
              return
            }
            if (!err.response.data.success) {
              this.isSend = false;
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error('招待メールの送信に失敗しました')
            }
          })
          if (data.success) {
            this.isSend = false;
            this.clear();
            const {data} = await this.$http.get('/manager/invite')
            this.users = data.users
            this.$store.commit('SET_IS_LOADING', false)
            this.$notify.success('招待メールの送信が完了しました')
          }
        }
      },
      clear(){
        this.context.last_name = ""
        this.context.first_name = ""
        this.context.last_name_kana = ""
        this.context.first_name_kana = ""
        this.context.email = ""
        this.context.manager_flag = ""
        this.context.password = ""
        this.context.position = ""
        this.context.group_id = ""
      }
    }
  }
</script>

<style scoped>
    .search {
        padding: 15px 30px;
        box-sizing: border-box;
        background: #fff;
        margin-bottom: 10px;
    }

    .search .el-autocomplete {
        width: 100%;
        margin-bottom: 10px;
    }

    .search .title {
        text-align: center;
        color: gray;
        box-sizing: border-box;
        margin-bottom: 10px;
    }

    .inviting {
        min-height: auto;
        max-height: 80vh;
        width: 39%;
        display: inline-block;
        box-sizing: border-box;
        background: #fff;
        overflow: auto;
    }

    .inviting-users {
        box-sizing: border-box;
        padding: 15px;
    }

    .inviting-user {
        text-align: center;
        margin-bottom: 5px;
        border-radius: 5px;
        border: 1px solid #e6e6e6;
        border-bottom: solid 5px gray;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        padding: 12px;
        box-sizing: border-box;
    }

    .inviting-user span {
        color: #5A5E66;
        display: block;
        margin-bottom: 10px;
        font-size: 16px;
    }

    .inviting-user span:last-child {
        margin: 0;
    }

    .invite-form {
        margin-left: 1%;
        width: 60%;
        display: inline-block;
        vertical-align: top;
        position: relative;
        background: #fff;
        box-sizing: border-box;
    }

    .el-pagination {
        text-align: center;
        padding: 10px;
    }

    .el-form {
        padding: 80px 80px 30px 10px;
    }

    .invite-button {
        margin-left: calc(100% - 70px);
    }
    .err {
        text-align: center;
        color: #334257;
        padding-top: 20px;
        padding-bottom: 50px;
    }
    .err p {
        margin-bottom: 10px;
        font-size: 20px;
        font-weight: bold;
    }
</style>
