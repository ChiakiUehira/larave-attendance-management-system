<template>
    <section>
        <contents-name name="ユーザ招待">
                <el-breadcrumb separator="/">
                    <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                    <el-breadcrumb-item :to="{ path: '/management/user/'}">ユーザ一覧</el-breadcrumb-item>
                    <el-breadcrumb-item>ユーザ招待</el-breadcrumb-item>
                </el-breadcrumb>
        </contents-name>
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
      return {groups: groups}
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
    .invite-form {
        margin: 0 auto;
        width: 100%;
        position: relative;
        background: #fff;
        box-sizing: border-box;
    }

    .el-form {
        padding: 40px 80px 30px 10px;
    }

    .invite-button {
        margin-left: calc(100% - 60px);
    }
</style>
