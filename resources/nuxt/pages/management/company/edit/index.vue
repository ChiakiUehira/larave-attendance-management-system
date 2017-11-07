<template>
  <div>
    <contents-name name="企業編集">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/company' }">企業詳細</el-breadcrumb-item>
        <el-breadcrumb-item>企業編集</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="contents">
        <div class="profile">
          <el-form ref="form" label-width="120px">
            <el-form-item label="会社名" required>
              <el-input placeholder="Please input" v-model="context.company_name"></el-input>
            </el-form-item>
            <el-form-item label="会社名 (かな)">
              <el-input placeholder="Please input" v-model="context.company_name_kana"></el-input>
            </el-form-item>
            <el-form-item label="住所">
              <el-input placeholder="Please input" v-model="context.address"></el-input>
            </el-form-item>
            <el-form-item label="メールアドレス">
              <el-input placeholder="Please input" v-model="context.email"></el-input>
            </el-form-item>
            <el-form-item label="電話番号">
              <el-input placeholder="Please input" v-model="context.tel"></el-input>
            </el-form-item>
          </el-form>
        </div>
        <div class="btns">
          <el-button @click="onCancel">Cancel</el-button>
          <el-button type="primary" @click="onSubmit">Update</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

  import ContentsName from '@/components/ContentsName.vue'
  import moment from 'moment'
  export default {
    data () {
      return {
        isSend: false
      }
    },
    components: {
      ContentsName
    },
    async asyncData ({app}) {
      const {data} = await app.$http.get('/company')
      let context = data.company
      return {
        context
      }
    },
    async fetch ({app, store}) {
      if (!store.state.me) {
        const {data} = await app.$http.get('/company')
        store.commit('SET_COMPANY', data.company)
      }
    },
    methods: {
      onSubmit () {
        if (!this.isSend) {
          this.isSend = true
          this.$http.put(`/company`, this.context).then(({data}) => {
            this.isSend = false
            this.fetchCompany()
            this.$notify.success('編集しました')
            this.$router.push('/management/company')
          }).catch(() => {
            this.isSend = false
            this.$notify.error('失敗しました')
          })
        }
      },
      onCancel () {
        this.$router.push('/management/company')
      },
      async fetchCompany () {
        const {data} = await this.$http.get('/company')
        this.$store.commit('SET_COMPANY', data.company)
      }
    },
    computed: {
      me () {
        return this.$store.state.me
      }
    }
  }
</script>

<style scoped>
  .page {
    border-radius: 2px;
  }

  .profile {
    width: 100%;
    vertical-align: top;
    background: #fff;
    padding: 20px;
  }

  .btns {
    margin-top: 20px;
    text-align: right;
  }
</style>
