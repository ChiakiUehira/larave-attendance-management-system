<template>
  <div>
    <contents-name name="マイページ" />
    <div class="page">
      <div class="contents">
        <div class="image">
          <img :src="me.thumbnail" alt="">
        </div>
        <div class="profile">
          <div class="rows">
              <div class="row">
                <div>名前</div>
                <div>{{fullname}}</div>
              </div>
              <div class="row">
                <div>名前 (かな)</div>
                <div>{{fullnameKana}}</div>
              </div>
              <div class="row">
                <div>住所</div>
                <div>{{address}}</div>
              </div>
              <div class="row">
                <div>生年月日</div>
                <div>{{birthday}}</div>
              </div>
              <div class="row">
                <div>性別</div>
                <div>{{gender}}</div>
              </div>
              <div class="row">
                <div>メールアドレス</div>
                <div>{{email}}</div>
              </div>
              <div class="row">
                <div>電話番号</div>
                <div>{{tel}}</div>
              </div>
              <div class="row">
                <div>役職</div>
                <div>{{position}}</div>
              </div>
              <div class="row">
                <div>権限</div>
                <div>{{authority}}</div>
              </div>
          </div>
          <div class="btns">
            <div>
              <nuxt-link :to="`/me/edit`"><el-button type="primary" icon="edit"></el-button></nuxt-link>
            </div>
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
      return moment(this.me.birthday).format("YYYY年MM月DD日")
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
  .profile .row {
    background: #fff;
    letter-spacing: 1px;
  }
  .profile .row:not(:last-child) {
    margin-bottom: 10px;
  }
  .profile .row div {
    padding: 10px;
  }
  .profile .row div:first-child {
    font-size: 12px;
    background: #efefef;
  }
  .profile .row div:last-child {
    padding: 15px 10px;
  }
  .btns {
    margin-top: 10px;
    text-align: right;
  }
</style>
