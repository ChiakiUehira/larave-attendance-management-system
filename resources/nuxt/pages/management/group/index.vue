<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item>グループ管理</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="groups">
        <div class="groups__head">
          <span>グループ一覧</span>
          <el-button @click="isDialogOpen = true" class="groups__head--btn" type="primary" icon="el-icon-plus"></el-button>
        </div>
        <div class="groups__body">
          <div class="groups__body--item" v-for="group in groups" :key="group.id" @dragover.prevent="handleDragOver" @dragleave.prevent="handleDragLeave" @drop="handleDrop($event, group.id)">
            <nuxt-link :to="`/management/group/${group.id}`">
              {{group.name}}
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="users">
        <div class="users__head">
          <span>未所属ユーザ一覧</span>
        </div>
        <div class="users__controller">
          <el-form class="users__controller--search">
            <el-form-item label="ユーザ検索">
              <el-autocomplete
                  v-model="search.word"
                  :fetch-suggestions="querySearch"
                  placeholder="name"
                  @select="handleSelect"
                  icon="search"
              ></el-autocomplete>
            </el-form-item>
          </el-form>
        </div>
        <div v-if="displayUnAffiliatedUsers.length" class="users__body">
          <div class="users__body--item" v-for="user in displayUnAffiliatedUsers" :key="user.id" draggable="true" @dragend="handleDragend" @dragstart="handleDragStart(user.id)">
            <div class="users__body--img">
              <span v-if="user.thumbnail"><img :src="user.thumbnail" alt=""></span>
              <span v-else><img src="~assets/imgs/noimage.png" alt=""></span>
            </div>
            <span class="users__body--name">{{user.last_name}} {{user.first_name}}</span>
          </div>
        </div>
        <div v-else class="users__body">
          <div class="users__body--err">
            <p>User Not Found !</p>
            <icon scale="4" name="frown-o"></icon>
          </div>
        </div>
      </div>
    </div>

    <el-dialog title="グループの作成" :visible.sync="isDialogOpen">
      <el-form :model="form">
        <el-form-item label="グループ名" required>
          <el-input v-model="form.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="説明">
          <el-input v-model="form.detail" type="textarea" :rows="4"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="isDialogOpen = false">Cancel</el-button>
        <el-button type="primary" @click="createGroup">Confirm</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
  import ContentsName from '~/components/ContentsName.vue'
  import UserCard from '~/components/UserCard.vue'
  export default{
    async fetch ({app, store}) {
      const {data} = await app.$http.get('group')
      const obj = await app.$http.get('user')
      store.commit('SET_GROUPS', data.groups)
      store.commit('SET_USERS', obj.data.users)
    },
    computed: {
      groups () {
        return this.$store.state.groups
      },
      users () {
        return this.$store.state.users
      },
      unAffiliatedUsers () {
        return this.users.filter((user) => {
          return !Boolean(user.group_id)
        })
      },
      displayUnAffiliatedUsers () {
        return this.unAffiliatedUsers.filter((user) => {{
          const fullName = this.fullName(user.first_name, user.last_name)
          const fullNameKana = this.fullName(user.first_name_kana, user.last_name_kana)
          return fullName.indexOf(this.search.word) >= 0 || fullNameKana.indexOf(this.search.word) >= 0
        }})
      },
      toValueFormUnAffiliatedUsers  () {
        const users = this.unAffiliatedUsers
        return users.map((user) => {
          return {
            value: this.fullName(user.first_name, user.last_name),
            nameKana: this.fullName(user.first_name_kana, user.last_name_kana)
          }
        })
      }
    },
    data () {
      return {
        search: {
          word: ''
        },
        form: {
          name: '',
          detail: ''
        },
        draggedId: null,
        isDialogOpen: false,
        isSending: false
      }
    },
    components: {
      ContentsName
    },
    methods: {
      async createGroup () {
        if (!this.isSending) {
          try {
            this.isSending = true
            await this.$http.post(`/group`, this.form)
            const resGroup = await this.$http.get('/group')
            this.$store.commit('SET_GROUPS', resGroup.data.groups)
            this.isDialogOpen = false
            this.isSending = false
            this.form.name = ''
            this.form.detail = ''
            this.$notify.success('新しいグループを作成しました')
          } catch (error) {
            this.isSending = false
            this.$notify.error('エラーが発生しました')
          }
        }
      },
      async handleDrop (e, id) {
        if (this.draggedId) {
          e.target.style = ''
          const context = {
            user_id: this.draggedId,
            group_id: id
          }
          try {
            await this.$http.put(`/user/group`, context)
            this.$notify.success('追加しました')
          } catch (error) {
            this.$notify.error('エラーが発生しました')
          }
          const resUser = await this.$http.get('user')
          this.$store.commit('SET_USERS', resUser.data.users)
        }
      },
      handleDragStart (id) {
        this.draggedId = id
      },
      handleDragOver (e) {
        if (this.draggedId) {
          e.target.style.backgroundColor = "#ECF5FF"
        }
      },
      handleDragLeave (e) {
        e.target.style = ''
      },
      handleDragend () {
        this.draggedId = null
      },
      fullName (first, last) {
        return `${last}${first}`
      },
      querySearch (queryString, cb) {
        let results = this.toValueFormUnAffiliatedUsers
        if (queryString) {
          results = this.toValueFormUnAffiliatedUsers.filter((user) => {
            return (user.value.indexOf(queryString) >= 0 || user.nameKana.indexOf(queryString) >= 0)
          })
        }
        if (results.length) {
          return cb(results)
        }
        return cb(this.toValueFormUnAffiliatedUsers)
      },
      handleSelect (user) {
        this.search.word = user.value
      }
    }
  }
</script>

<style scoped>
  .page {
    letter-spacing: -.4em;
  }
  .groups {
    background: #fff;
    display: inline-block;
    width: 50%;
    vertical-align: top;
    border-radius: 2px;
    color: #5A5E66;
    margin-right: 10px;
    letter-spacing: normal;
  }
  .groups__head {
    position: relative;
    padding: 20px 20px;
    border-bottom: solid 1px #efefef;
    font-size: 14px;
  }
  .groups__head--btn {
    position: absolute;
    top: 7px;
    right: 20px;
  }
  .groups__body--item a {
    padding: 30px 20px;
    display: block;
    color: #5A5E66;
  }
  .groups__body--item:not(:last-child) a {
    border-bottom: solid 1px #efefef;
  }

  .groups__body--item a:hover {
    background: #ECF5FF;
  }

  .users {
    background: #fff;
    display: inline-block;
    width: calc(50% - 10px);
    vertical-align: top;
    border-radius: 2px;
    color: #5A5E66;
    letter-spacing: normal;
  }
  .users__head {
    position: relative;
    padding: 20px 20px;
    border-bottom: solid 1px #efefef;
    font-size: 14px;
  }
  .users__head--btn {
    position: absolute;
    top: 8px;
    right: 20px;
  }
  .users__controller {
    border-bottom: 1px solid #efefef;
    position: relative;
    padding: 20px 20px 0;
    text-align: right;
  }
  .users__controller--search {
    width: 261px;
    display: inline-block;
    margin-bottom: -7px;
  }
  .users__body--item {
    padding: 13px 20px;
    display: block;
    color: #5A5E66;
    cursor: pointer;
    transition: .2s;
    box-shadow: 0px 0px 0px 0px #efefef;
  }
  .users__body--item:hover {
    box-shadow: 0 6px 12px 0 rgba(0,0,0,.12), 0 0 6px 0 rgba(0,0,0,.04)
  }
  .users__body--item:not(:last-child) {
    border-bottom: solid 1px #efefef;
  }
  .users__body--img {
    display: inline-block;
    vertical-align: middle;
  }
  .users__body--img img{
    width: 50px;
    border-radius: 100%;
    border: solid 5px #EEEEEE;
  }
  .users__body--name {
    vertical-align: middle;
    margin-left: 20px;
  }
  .users__body--err {
    text-align: center;
    color: #58a8ff;
    padding: 30px 0;
  }
  .users__body--err p {
    margin-bottom: 10px;
    font-size: 20px;
    font-weight: bold;
  }
</style>

