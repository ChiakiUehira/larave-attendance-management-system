<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/group' }">グループ管理</el-breadcrumb-item>
        <el-breadcrumb-item>{{group.name}}</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="page">
      <div class="groups">
        <div class="groups__head" v-if="group">
          <span>{{group.name}}</span>
        </div>
        <div class="groups__body" v-if="group">
          <div class="groups__body--item">
            <el-dialog title="グループの編集" :visible.sync="editDialogVisible" class="groups__body--dialog">
              <el-form>
                <el-form-item label="グループ名">
                  <el-input v-model="group.name"></el-input>
                </el-form-item>
                <el-form-item label="説明">
                  <el-input v-model="group.detail" type="textarea" :rows="3" resize="none"></el-input>
                </el-form-item>
              </el-form>
              <span slot="footer" class="dialog-footer">
                <el-button @click="editDialogVisible = !editDialogVisible">Cancel</el-button>
                <el-button type="primary" @click="editGroup">OK</el-button>
              </span>
            </el-dialog>
            <p>{{group.detail}}</p>
          </div>
        </div>
        <div class="group__edit">
          <el-button icon="el-icon-edit" type="primary" @click="editDialogVisible = !editDialogVisible"></el-button>
          <el-button icon="el-icon-delete" type="danger" @click="dialogVisible(group.id)"></el-button>
        </div>
      </div>
      <el-dialog
          title="グループを削除しますか？"
          :visible.sync="centerDialogVisible"
          width="30%"
          center>
        <span>グループに所属しているユーザがいる場合、そのユーザは未所属になります。</span>
        <span slot="footer" class="dialog-footer">
           <el-button @click="centerDialogVisible = false">キャンセル</el-button>
                 <el-button type="primary" @click="deleteGroup()">確認</el-button>
             </span>
      </el-dialog>

      <div class="users">
        <div class="users__head">
          <span>ユーザ一覧</span>
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
        <div v-if="displayUsers.length" class="users__body">
          <div class="users__body--item" v-for="user in displayUsers" :key="user.id">
            <div class="users__body--img">
              <span v-if="user.thumbnail"><img :src="user.thumbnail" alt=""></span>
              <span v-else><img src="~assets/imgs/noimage.png" alt=""></span>
            </div>
            <span class="users__body--name">{{user.last_name}} {{user.first_name}}</span>
            <div class="users__body--not-affiliation">
              <el-button type="danger" icon="el-icon-close" @click="displayUserDialog(user.id)"></el-button>
            </div>
          </div>
        </div>
        <div v-else class="users__body">
          <div class="users__body--err">
            <p>User Not Found !</p>
            <icon scale="4" name="frown-o"></icon>
          </div>
        </div>
        <el-dialog
            title="ユーザをグループから削除しますか？"
            :visible.sync="userDialogVisible"
            width="30%"
            center>
          <span>削除すると未所属になります。</span>
          <span slot="footer" class="dialog-footer">
           <el-button @click="userDialogVisible = false">キャンセル</el-button>
                 <el-button type="primary" @click="deleteAffiliationUser()">確認</el-button>
             </span>
        </el-dialog>
      </div>
    </div>
  </div>
</template>

<script>
  import ContentsName from '~/components/ContentsName.vue'
  import UserCard from '~/components/UserCard.vue'
  export default{
    async fetch ({app, store, params}) {
      const {data} = await app.$http.get('user')
      store.commit('SET_USERS', data.users)
    },
    async asyncData ({app, params}){
      const {data} = await app.$http.get(`group/${params.id}`)
      return {group: data.group}
    },
    computed: {
      users () {
        return this.$store.state.users.filter((user) => {
          return user.group_id == this.$route.params.id
        })
      },
      displayUsers(){
        let users = this.users.filter((user) => {
          const fullName = this.fullName(user.first_name, user.last_name)
          const fullNameKana = this.fullName(user.first_name_kana, user.last_name_kana)
          return fullName.indexOf(this.search.word) >= 0 || fullNameKana.indexOf(this.search.word) >= 0
        })
        return users
      },
      toValueFormUsers () {
        const users = this.users
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
        draggedId: null,
        isDialogOpen: false,
        isSending: false,
        centerDialogVisible: false,
        userDialogVisible: false,
        editDialogVisible: false,
        user_id: null
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
      fullName (first, last) {
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
        return cb(this.toValueFormUnAffiliatedUsers)
      },
      dialogVisible (id) {
        this.centerDialogVisible = true
      },
      async deleteGroup () {
        this.$http.delete(`group/${this.group.id}`).catch((e) => {
          return this.$message.error('グループの削除に失敗しました')
        })
        const {data} = await this.$http.get('group')
        this.$store.commit('SET_GROUPS', data.groups)
        const res = await this.$http.get('user')
        this.$store.commit('SET_USERS', res.data.users)
        this.search.group = ''
        this.centerDialogVisible = false
        this.$message.success('グループを削除しました。')
        this.$router.push('/management/group')
      },
      handleSelect (user) {
        this.search.word = user.value
      },
      async editGroup(){
        const {data} = await this.$http.put(`/group/${this.group.id}`, {name: this.group.name, detail: this.group.detail})
        if (data.success) {
          this.$message.success('グループの詳細を編集しました。')
          this.editDialogVisible = !this.editDialogVisible
        }
      },
      async deleteAffiliationUser(){
        const { data } = await this.$http.put(`/user/group`,{user_id: this.user_id, group_id: null})
        if(data.success){
          this.$message.success('選択したユーザが未所属になりました。')
          const {data} = await this.$http.get('user')
          this.$store.commit('SET_USERS', data.users)
          this.userDialogVisible = !this.userDialogVisible
        }
      },
      displayUserDialog(id){
        this.userDialogVisible = !this.userDialogVisible
        this.user_id = id
      }
    }
  }
</script>

<style scoped>
  .page {
  }

  .groups {
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
    background: #fff;
  }

  .groups__head--btn {
    position: absolute;
    top: 7px;
    right: 20px;
  }

  .groups__body--dialog{
    width:70%;
    margin:0 auto;
  }
  .groups__body--item {
    padding: 30px 20px 20px 20px;
    background: #fff;
    line-height: 23px;
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

  .groups__body--item p {
    font-size: 14px;
  }

  .groups__body--item textarea {
    width: 100%;
    resize: none;
    border-radius: 2px;
    outline: none;
    border: solid 1px #efefef;
    font-size: 14px;
    padding: 10px;
    box-sizing: border-box;
    color: #5a5e66;
  }

  .group__edit {
    background: #fff;
    margin-top: 10px;
    padding: 20px;
    text-align: right;
    border-radius: 2px;
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
    display: flex;
    align-items: center;
    color: #5A5E66;
    transition: .2s;
    box-shadow: 0px 0px 0px 0px #efefef;
  }

  .users__body--not-affiliation {
    margin-left: auto;
  }

  .users__body--item:not(:last-child) {
    border-bottom: solid 1px #efefef;
  }

  .users__body--img {
    display: inline-block;
    vertical-align: middle;
  }

  .users__body--img img {
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
