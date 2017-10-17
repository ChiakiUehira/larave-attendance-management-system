<template>
  <div>
    <contents-name name="マイページ" />
    <div class="page">
      <div class="contents">
        <div class="image">
          <img :src="context.thumbnail" alt="">
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
            <el-form-item label="生年月日" required>
              <el-input placeholder="Please input" v-model="context.birthday"></el-input>
            </el-form-item>
            <el-form-item label="性別" required>
              <el-radio-group v-model="context.gender">
                <el-radio label="male">男性</el-radio>
                <el-radio label="female">女性</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="メールアドレス" required>
              <el-input placeholder="Please input" v-model="context.email" :disabled="true"></el-input>
            </el-form-item>
            <el-form-item label="電話番号">
              <el-input placeholder="Please input" v-model="context.tel"></el-input>
            </el-form-item>
            <el-form-item label="役職">
              <el-input placeholder="Please input" v-model="context.position"></el-input>
            </el-form-item>
            <el-form-item label="権限" required>
              <el-input placeholder="Please input" v-model="context.manager_flag" :disabled="true"></el-input>
            </el-form-item>
          </el-form>
          <div class="btns">
            <el-button>Cancel</el-button>
            <el-button type="primary" @click="onSubmit">Update</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContentsName from '@/components/ContentsName.vue'
import moment from 'moment'
export default {
  components: {
    ContentsName
  },
  async asyncData ({app}) {
    const { data } = await app.$http.get('/me')
    let context = data.me
    context.birthday = moment(context.birthday).format("YYYY/MM/DD")
    return {
      context
    }
  },
  async fetch ({app, store}) {
    if (!store.state.me) {
      const { data } = await app.$http.get('/me')
      store.commit('SET_ME', data.me)
    }
  },
  methods: {
    onSubmit () {
      this.$http.put(`/user/${this.me.id}`, this.context).then(({data}) => {
        this.$notify.success('編集しました')
        this.$router.push('/me')
      }).catch(() => {
        this.$notify.error('失敗しました')
      })
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
  .image {
    width: 300px;
    padding: 25px;
    display: inline-block;
    background: #fff;
    vertical-align: top;
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
    text-align: right;
  }
</style>
