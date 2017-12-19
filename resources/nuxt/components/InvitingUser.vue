<template>
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
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    border-bottom: solid 5px gray;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    padding: 12px;
    box-sizing: border-box;
  }

  .inviting-user span {
    color: #8A8A8A;
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .inviting-user span:last-child {
    margin: 0;
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