<template>
  <div>
    <contents-name >
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>マイページ</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="contents">
        <div class="image">
          <div v-if="me.thumbnail">
            <img :src="me.thumbnail" alt="">
          </div>
          <div v-else>
            <img src="~assets/imgs/noimage.png" alt="">
          </div>
        </div>
        <div class="profile">
          <div class="rows">
            <my-row v-for="data in toObjects" :key="data.id" :data="data" />
          </div>
          <div class="btns">
            <div>
              <nuxt-link :to="`/me/edit`"><el-button type="primary" icon="el-icon-edit"></el-button></nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import ContentsName from '@/components/ContentsName.vue'
import MyRow from '@/components/MyRow.vue'
import moment from 'moment'
export default {
  components: {
    ContentsName,
    MyRow
  },
  computed: {
    me () {
      return this.$store.state.me
    },
    fullname () {
      return `${this.me.last_name} ${this.me.first_name}`
    },
    fullnameKana () {
      return `${this.me.last_name_kana} ${this.me.first_name_kana}`
    },
    position () {
      return this.me.position
    },
    email () {
      return this.me.email
    },
    tel () {
      return this.me.tel
    },
    gender () {
      return this.me.gender === 'male' ? '男性' : '女性'
    },
    authority () {
      return this.me.manager_flag === 'manager' ? 'マネージャー' : '一般ユーザ'
    },
    address () {
      return `〒${this.me.postal_code} ${this.me.address}`
    },
    birthday () {
      return this.me.birthday ? moment(this.me.birthday).format('YYYY年MM月DD日') : ''
    },
    toObjects () {
      return [
        {
          label: '名前',
          value: this.fullname
        },
        {
          label: '名前 (かな)',
          value: this.fullnameKana
        },
        {
          label: '住所',
          value: this.address
        },
        {
          label: '生年月日',
          value: this.birthday
        },
        {
          label: '性別',
          value: this.gender
        },
        {
          label: 'メールアドレス',
          value: this.email
        },
        {
          label: '電話番号',
          value: this.tel
        },
        {
          label: '役職',
          value: this.position
        },
        {
          label: '権限',
          value: this.authority
        }
      ]
    }
  },
  async fetch ({app, store}) {
    if (!store.state.me) {
      const { data } = await app.$http.get('/me')
      store.commit('SET_ME', data.me)
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
  }
  .btns {
    margin-top: 10px;
    text-align: right;
  }
</style>
