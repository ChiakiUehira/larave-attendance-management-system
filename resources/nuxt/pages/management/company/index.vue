<template>
  <div>
    <contents-name name="企業詳細">
        <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/management' }">マネジメント</el-breadcrumb-item>
          <el-breadcrumb-item>企業詳細</el-breadcrumb-item>
        </el-breadcrumb>
    </contents-name>
    <div class="btns">
      <nuxt-link to="/management/group" class="group-management el-icon-edit">
        <span>グループ管理</span>
      </nuxt-link>
    </div>
    <div class="page">
      <div class="contents">
        <div class="profile">
          <div class="rows">
            <my-row v-for="data in toObjects" :key="data.id" :data="data" />
          </div>
          <div class="btns">
            <div>
              <el-button type="danger" icon="delete" @click="open"></el-button>
            </div>
            <div>
              <nuxt-link :to="`/management/company/edit`"><el-button type="primary" icon="edit"></el-button></nuxt-link>
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
import { remove } from '../../../../../utils/Token'
export default {
  components: {
    ContentsName,
    MyRow
  },
  async fetch ({app, store}) {
    if (!store.state.company) {
      const { data } = await app.$http.get('/company')
      store.commit('SET_COMPANY', data.company)
    }
  },
  methods: {
    open () {
        this.$confirm('会社を削除するとアプリケーションが使えなくなります', '会社を削除しますか？', {
          confirmButtonText: 'OK',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          this.$http.delete('company').then(({data}) => {
            this.$message({
              type: 'success',
              message: '削除しました',
              onClose () {
                remove()
                window.location = '/'
              }
            });
          })
        }).catch(() => {
          this.$message({type: 'warning',message: 'キャンセルしました'});
        });
    }
  },
  computed: {
    company () {
      return this.$store.state.company
    },
    toObjects () {
      return [
        {
          label: '会社名',
          value: this.company.company_name
        },
        {
          label: '会社名 (かな)',
          value: this.company.company_name_kana
        },
        {
          label: '住所',
          value: this.company.address
        },
        {
          label: 'メールアドレス',
          value: this.company.email
        },
        {
          label: '電話番号',
          value: this.company.tel
        }
      ]
    }
  }
}
</script>

<style scoped>
  .btns{
    background: #fff;
    margin-bottom:10px;
    padding:25px;
    position: relative;
  }
  .group-management{
    display: block;
    width:150px;
    padding: 18px;
    background: #334257;
    right:0px;
    top:0px;
    color:#b2bfcd;
    font-size:14px;
    position: absolute;
    transition: ease .3s;
  }
  .group-management:hover{
    background-color:#48576a;
  }
  .group-management span{
    margin-left:10px;
  }
  .page {
    border-radius: 2px;
  }
  .profile {
    width: 100%;
  }
  .btns {
    margin-top: 10px;
    text-align: right;
  }
  .btns div {
    display: inline-block;
    margin-left: 10px;
  }
</style>
