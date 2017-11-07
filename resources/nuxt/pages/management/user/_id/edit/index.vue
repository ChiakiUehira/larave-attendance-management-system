<template>
    <div>
        <contents-name name="ユーザ編集">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
                <el-breadcrumb-item :to="{ path: '/management/user'}">ユーザ詳細</el-breadcrumb-item>
                <el-breadcrumb-item>ユーザ編集</el-breadcrumb-item>
            </el-breadcrumb>
        </contents-name>
        <div class="page">
            <div class="contents">
                <div class="image">
                    <uploader :thumbnail="context.thumbnail" @uploaded="uploaded"></uploader>
                </div>
                <div class="profile">
                    <el-form ref="form" label-width="120px">
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
                        <el-form-item label="郵便番号">
                            <el-input placeholder="Please input" v-model="context.postal_code"></el-input>
                        </el-form-item>
                        <el-form-item label="住所">
                            <el-input placeholder="Please input" v-model="context.address"></el-input>
                        </el-form-item>
                        <el-form-item label="生年月日">
                            <el-date-picker
                                    v-model="context.birthday"
                                    type="date"
                                    placeholder="Please input">
                            </el-date-picker>
                        </el-form-item>
                        <el-form-item label="性別" required>
                            <el-radio-group v-model="context.gender">
                                <el-radio label="male">男性</el-radio>
                                <el-radio label="female">女性</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="電話番号">
                            <el-input placeholder="Please input" v-model="context.tel"></el-input>
                        </el-form-item>
                        <el-form-item label="役職">
                            <el-input placeholder="Please input" v-model="context.position"></el-input>
                        </el-form-item>
                    </el-form>
                </div>
                <div class="btns">
                    <el-button @click="onCancel">戻る</el-button>
                    <el-button type="primary" @click="onSubmit">更新</el-button>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
  import ContentsName from '~/components/ContentsName.vue'
  import Uploader from '~/components/Uploader'
  import moment from 'moment'
  export default {
    data () {
      return {
        isSend: false
      }
    },
    components: {
      ContentsName,
      Uploader
    },
    async asyncData ({app, params}) {
      const {data} = await app.$http.get(`/user/${params.id}`)
      let context = data.user
      context.birthday = moment(context.birthday).format('YYYY-MM-DD')
      return {
        context
      }
    },
    methods: {
      onSubmit () {
        if (!this.isSend) {
          this.isSend = true
          this.$http.put(`/user/${this.context.id}`, this.context).then(({data}) => {
            this.isSend = false
            this.fetchUser()
            this.$notify.success('編集しました')
            this.$router.push(`/management/user/${this.$route.params.id}`)
          }).catch(() => {
            this.isSend = false
            this.$notify.error('失敗しました')
          })
        }
      },
      onCancel () {
        this.$router.push(`/management/user/${this.$route.params.id}`)
      },
      async fetchUser () {
        const {data} = await this.$http.get('user')
        this.$store.commit('SET_USERS', data.users)
      },
      uploaded (dataUrl) {
        this.context.thumbnail = dataUrl
      }
    }
  }
</script>

<style scoped>
    .image {
        width: 300px;
        padding: 25px;
        display: inline-block;
        background: #fff;
        vertical-align: top;
    }
    .page {
        border-radius: 2px;
    }

    .profile {
        margin-left: 10px;
        display: inline-block;
        width: calc(100% - 300px - 10px);
        vertical-align: top;
        background: #fff;
        padding: 20px;
    }

    .btns {
        margin-top: 20px;
        text-align: right;
    }
</style>
