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
                    <h3 class="title">招待中のユーザ検索</h3>
                    <el-input placeholder="name"></el-input>
                    <el-input placeholder="email"></el-input>
                </div>
                <div class="inviting-user" v-for="user in users" :key="user.id">
                    <span>{{ user.last_name }}{{ user.first_name }}</span>
                    <span>{{ user.email }}</span>
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
                <el-form-item label="苗字 (カナ)">
                    <el-input placeholder="Please input" v-model="context.last_name_kana"></el-input>
                </el-form-item>
                <el-form-item label="名前 (カナ)">
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
    async asyncData({app}){
      const {data} = await app.$http.get('group')
      const groups = data.groups.map((group) => {
        return {value: group.id, label: group.name}
      })
      const obj = await app.$http.get('/manager/invite')
      return {groups: groups, users: obj.data.users}
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
        isSend: false
      }
    },
    methods: {
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
            const { data } = await this.$http.get('/manager/invite')
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

    .search .el-input {
        margin-bottom: 10px;
    }

    .search .el-input:last-child {
        margin: 0;
    }
    .search .title {
        text-align: center;
        color: gray;
        box-sizing: border-box;
        margin-bottom:10px;
    }

    .inviting {
        min-height:auto;
        max-height: 80vh;
        width: 29%;
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
        width: 70%;
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
</style>
