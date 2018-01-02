<template>
  <div class="inviting">
    <div class="inviting-users">
      <div class="head">
        <h3 class="title">招待中のユーザ一覧</h3>
        <nuxt-link to="/management/user/invite">
          <el-button type="primary" icon="el-icon-plus"></el-button>
        </nuxt-link>
      </div>
      <div class="search">
        <el-form class="search-form">
          <el-form-item label="ユーザ検索">
            <el-autocomplete
                class="inline-input"
                v-model="search.name"
                :fetch-suggestions="querySearch"
                placeholder="name"
                :trigger-on-focus="false"
                @select="handleSelect"
                icon="search"
            ></el-autocomplete>
          </el-form-item>
        </el-form>
      </div>

      <div v-if="displayUsers.length">
        <div class="inviting-user" v-for="user in displayUsers" :key="user.id">
          <span class="name">{{ user.last_name }}{{ user.first_name }}</span>
          <el-button icon="el-icon-close" type="danger" class="close"></el-button>
        </div>
      </div>
      <div v-else>
        <div class="err">
          <p>User Not Found !</p>
          <icon scale="4" name="frown-o"></icon>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default{
    computed: {
      displayUsers () {
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
    data () {
      return {
        search: {
          'name': '',
          'email': ''
        }
      }
    },
    methods: {
      fullName (last, first) {
        return `${last}${first}`
      },
      querySearch (queryString, cb) {
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
      handleSelect (user) {
        this.search.name = user.value
      }
    }
  }
</script>

<style scoped>
  .search {
    padding: 15px 20px 0px 20px;
    box-sizing: border-box;
    background: #fff;
    border-bottom: solid 1px #efefef;
    position: relative;
    bottom: -5px;
  }

  .search .el-autocomplete {
    text-align: right;
    width: 200px;
  }

  .search .search-form {
    text-align: right;
  }

  .inviting {
    width: 45%;
    display: inline-block;
    box-sizing: border-box;
    background: #fff;
  }

  .inviting-users {
    box-sizing: border-box;
  }

  .inviting-users .head {
    border-bottom: solid 1px #efefef;
    padding: 10px 20px;
    display: flex;
    align-items: center;
  }

  .head a {
    margin-left: auto;
  }

  .inviting-user {
    border-bottom: solid 1px #efefef;
    padding: 20px;
    display: flex;
    align-items: center;
  }

  .inviting-user .name {
    color: #8A8A8A;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .inviting-user .close {
    margin-left: auto;
  }

  .inviting-user span:last-child {
    margin: 0;
  }

  .el-form-item__content{
    width:261px;
  }

  .err {
    text-align: center;
    color: #58a8ff;
    padding: 30px 0;
  }

  .err p {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
</style>