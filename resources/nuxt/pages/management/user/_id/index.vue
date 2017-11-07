<template>
  <div>
    <contents-name name="ユーザ詳細">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item>ユーザ詳細</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="contents">
        <div class="image">
          <div v-if="user.thumbnail">
            <img :src="user.thumbnail" alt="">
          </div>
          <div v-else>
            <img src="~assets/imgs/noimage.png" alt="">
          </div>
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
        </div>
        <div class="btns">
          <div>
            <nuxt-link :to="`/management/user/${user.id}/edit`">
              <el-button type="primary" icon="el-icon-edit"></el-button>
            </nuxt-link>
            <el-button type="danger" icon="el-icon-delete" @click="open" class="delete"></el-button>
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
      fullname () {
        return `${this.user.last_name} ${this.user.first_name}`
      },
      fullnameKana () {
        return `${this.user.last_name_kana} ${this.user.first_name_kana}`
      },
      position () {
        return this.user.position
      },
      email () {
        return this.user.email
      },
      tel () {
        return this.user.tel
      },
      gender () {
        return this.user.gender === 'male' ? '男性' : '女性'
      },
      authority () {
        return this.user.manager_flag === 'manager' ? 'マネージャー' : '一般ユーザ'
      },
      address () {
        return `〒${this.user.postal_code} ${this.user.address}`
      },
      birthday () {
        return moment(this.user.birthday).format("YYYY年MM月DD日")
      },
      user () {
        const id = this.$route.params.id
        return this.$store.state.users.find(user => user.id === Number(id))
      },
    },
    methods: {
      open () {
        this.$confirm('アカウントが停止します', 'ユーザを退会させますか？', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$http.delete(`/user/${this.$route.params.id}`).then(({data}) => {
            if (data.success) {
              this.$notify.success('退会が完了しました')
              this.fetchUser()
              this.$router.push('/management/user')
            } else {
              this.$notify.error('退会に失敗しました')
            }
          })
        }).catch(() => {
          this.$message({type: 'warning', message: 'キャンセルしました'});
        });
      },
      async fetchUser(){
        const {data} = await this.$http.get('user')
        this.$store.commit('SET_USERS', data.users)
      }
    },
    async fetch({app, store}){
      if (!store.state.users) {
        const {data} = await app.$http.get('/user')
        store.commit('SET_USERS', data.users)
      }
    }
  }
</script>

<style scoped>
  .delete {
    margin-left: 10px;
  }

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
