<template>
  <div>
    <contents-name>
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/management/company'}">企業詳細</el-breadcrumb-item>
        <el-breadcrumb-item>グループ管理</el-breadcrumb-item>
      </el-breadcrumb>
    </contents-name>
    <div class="group-users">
      <div class="search">
        <span class="title">所属グループ: </span>
        <el-select v-model="search.group" placeholder="グループ">
          <el-option label="未所属" value=""></el-option>
          <el-option v-for="group in toValueFromGroups" :label="group.label"
                     :value="group.value"
                     :key="group.id">
          </el-option>
        </el-select>
      </div>
      <div v-if="displayUsers.length">
        <div class="group-user" v-for="user in displayUsers" :key="user.id">
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

    <div class="groups">
      <div class="group">
        <el-input
            class="input-new-tag"
            v-if="inputVisible"
            v-model="inputValue"
            ref="saveTagInput"
            size="mini"
            @keyup.enter.native="handleInputConfirm"
            @blur="handleInputConfirm"
        >
        </el-input>
        <el-button v-else class="button-new-tag" size="small" @click="showInput">+ 新しく作る</el-button>
        <el-card class="group-elm" :key="group.id" v-for="(group,index) in groups">
          <span class="name">{{group.name}}</span>
          <el-button class="delete" icon="el-icon-delete" @click="dialogVisible(group.id)"></el-button>
        </el-card>
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
  </div>
</template>

<script>
  import ContentsName from '~/components/ContentsName.vue'
  import UserCard from '~/components/UserCard.vue'
  export default{
    async fetch ({app, store}){
      const {data} = await app.$http.get('group')
      const obj = await app.$http.get('user')
      store.commit('SET_GROUPS', data.groups)
      store.commit('SET_USERS', obj.data.users)
    },
    computed: {
      groups(){
        return this.$store.state.groups
      },
      users(){
        return this.$store.state.users
      },
      toValueFromGroups () {
        const groups = this.$store.state.groups
        return groups.map((group) => {
          return {
            value: group.id,
            label: group.name
          }
        })
      },
      displayUsers () {
        let users = this.users
        users = users.filter((user) => {
          if (!this.search.group) {
            return user.group_id === null
          }
          return user.group_id === this.search.group
        })

        return users
      }
    },
    data(){
      return {
        inputVisible: false,
        inputValue: '',
        search: {
          group: ''
        },
        centerDialogVisible: false,
        group_id: ''
      }
    },
    components: {
      ContentsName,
      UserCard
    },
    methods: {
      showInput() {
        this.inputVisible = true;
        this.$nextTick(_ => {
          this.$refs.saveTagInput.$refs.input.focus();
        });
      },
      async handleInputConfirm() {
        let inputValue = this.inputValue;
        if (inputValue) {
          const {data} = await this.$http.post('group', {name: inputValue})
          this.$store.commit('UPDATE_GROUPS', data.group)
        }
        this.inputVisible = false;
        this.inputValue = '';
      },
      dialogVisible(id){
        this.centerDialogVisible = true
        this.group_id = id
      },
      async deleteGroup(){
        await this.$http.delete(`group/${this.group_id}`).catch((e) => {
          return this.$message.error('グループの削除に失敗しました')
        })
        const {data} = await this.$http.get('group')
        this.$store.commit('SET_GROUPS', data.groups)
        const res = await this.$http.get('user')
        this.$store.commit('SET_USERS', res.data.users)
        this.search.group = ''
        this.centerDialogVisible = false
        this.$message.success('グループを削除しました。')
      }
    }
  }
</script>

<style scoped>
  .groups {
    background: #fff;
    padding: 20px;
    margin-bottom: 10px;
    display: inline-block;
    width: 60%;
    margin-left: 1%;
    vertical-align: top;
  }

  .group {
    width: 70%;
    margin: 0 auto;
  }

  .group .el-input {
    margin-bottom: 10px;
  }

  .group .el-card {
    margin-bottom: 10px;
  }

  .group .name {
    width: 80%;
    display: inline-block;
  }

  .group .delete {
    width: 20%;
  }

  .button-new-tag {
    margin-left: 10px;
    height: 32px;
    line-height: 30px;
    padding-top: 0;
    padding-bottom: 0;
    margin-bottom: 10px;
    margin-top: 10px;
  }

  .input-new-tag {
    width: 90px;
    margin-left: 10px;
    margin-top: 10px;
  }

  .group-users {
    min-height: auto;
    max-height: 80vh;
    width: 39%;
    display: inline-block;
    box-sizing: border-box;
    background: #fff;
    overflow: auto;
    padding: 15px;
    box-sizing: border-box;
  }

  .group-users .search {
    text-align: center;
    padding: 15px;
  }

  .search .title {
    color: gray;
    font-size: 14px;
  }

  .group-user {
    text-align: center;
    margin-bottom: 10px;
    border-radius: 5px;
    border: 1px solid #e6e6e6;
    border-bottom: solid 5px gray;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    padding: 12px;
    box-sizing: border-box;
  }

  .group-user span {
    color: #8A8A8A;
    display: block;
    margin-bottom: 10px;
    font-size: 16px;
  }

  .group-user span:last-child {
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

