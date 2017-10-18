<template>
    <section>
        <div class="invite-form">
            <table>
                <tr>
                    <th>苗字</th>
                    <td>
                        <el-input placeholder="苗字" v-model="context.last_name"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>名前</th>
                    <td>
                        <el-input placeholder="名前" v-model="context.first_name"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>苗字（カナ）</th>
                    <td>
                        <el-input placeholder="苗字（カナ）" v-model="context.last_name_kana"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>名前（カナ）</th>
                    <td>
                        <el-input placeholder="名前（カナ）" v-model="context.first_name_kana"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>Eメール</th>
                    <td>
                        <el-input placeholder="Eメール" v-model="context.email"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>性別</th>
                    <td>
                        <el-radio class="radio" v-model="context.gender" label="male">男性</el-radio>
                        <el-radio class="radio" v-model="context.gender" label="female">女性</el-radio>
                    </td>
                </tr>
                <tr>
                    <th>マネージャフラグ</th>
                    <td>
                        <el-input placeholder="マネージャフラグ" v-model="context.manager_flag"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>電話番号</th>
                    <td>
                        <el-input placeholder="電話番号" v-model="context.tel"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>サムネイル</th>
                    <td>
                        <el-upload
                                class="avatar-uploader"
                                action="//0.0.0.0:3333/api/v1/image/resize"
                                :show-file-list="false"
                                :on-success="handleAvatarSuccess"
                                :before-upload="beforeAvatarUpload">
                            <img v-if="context.thumbnail" :src="context.thumbnail" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </td>
                </tr>
                <tr>
                    <th>住所</th>
                    <td>
                        <el-input placeholder="住所" v-model="context.address"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>郵便番号</th>
                    <td>
                        <el-input placeholder="郵便番号" v-model="context.postal_code"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>パスワード</th>
                    <td>
                        <el-input placeholder="パスワード" v-model="context.password"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>役職</th>
                    <td>
                        <el-input placeholder="役職" v-model="context.position"></el-input>
                    </td>
                </tr>
                <tr>
                    <th>グループ</th>
                    <td>
                        <el-select v-model="context.group_id" placeholder="Select">
                            <el-option
                                    v-for="item in groups"
                                    action="http://0.0.0.0:3333"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </td>
                </tr>
            </table>
            <div class="invite-button">
                <el-button @click="invite">招待</el-button>
            </div>
        </div>
    </section>
</template>
<script>
  export default {
    async asyncData({app}){
      const {data} = await app.$http.get('group')
      var groups = []
      data.groups.forEach((group, index) => {
        groups[index] = {value: group.id, label: group.name}
      })
      return {groups: groups}
    },
    data() {
      return {
        context: {
          "last_name": "山田",
          "first_name": "太郎",
          "last_name_kana": "ヤマダ",
          "first_name_kana": "タロウ",
          "email": "mailsend.manager@gmail.com",
          "gender": "male",
          "manager_flag": "normal",
          "password": "pw",
          "postal_code": "000-0000",
          "address": "大阪府大阪市ほげほげ町",
          "thumbnail": "",
          "tel": "123-4567",
          "position": "係長",
          "group_id": ""
        },
        isSend: false
      }
    },
    methods: {
      async invite(){
        if (!this.isSend) {
          this.isSend = true;
          this.$store.commit('SET_IS_LOADING', true)
          const {data} = await this.$http.post('/manager/invite', this.context).catch(err => {
            if (err.response.data.message === 'overlapping') {
              this.isSend = false;
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error('このEmailアドレスはすでに登録されています。')
              return
            }
            if (!err.response.data.success) {
              this.isSend = false;
              this.$store.commit('SET_IS_LOADING', false)
              this.$notify.error('招待メールの送信に失敗しました')
            }
          })
          if (data.success) {
            this.isSend = false;
            this.clear();
            this.$store.commit('SET_IS_LOADING', false)
            this.$notify.success('招待メールの送信が完了しました')
          }
        }
      },
      clear(){
        this.context.last_name = ""
        this.context.first_name = ""
        this.context.last_name_kana = ""
        this.context.first_name_kana = ""
        this.context.email = ""
        this.context.gender = ""
        this.context.manager_flag = ""
        this.context.password = ""
        this.context.postal_code = ""
        this.context.address = ""
        this.context.thumbnail = ""
        this.context.tel = ""
        this.context.position = ""
        this.context.group_id = ""
      },
      handleAvatarSuccess(res, file) {
        this.context.thumbnail = res.dataUrl
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('Avatar picture must be JPG format!');
        }
        if (!isLt2M) {
          this.$message.error('Avatar picture size can not exceed 2MB!');
        }
        return isJPG && isLt2M;
      }
    }
  }
</script>

<style scoped>
    .invite-form {
        margin: 0 auto;
        width: 100%;
        padding: 40px 120px;
        position: relative;
    }

    .invite-form table {
        width: 100%;
        background: #fff;
    }

    .invite-form table th {
        border: 1px solid #ccc;
        width: 20%;
        color: #777;
    }

    .invite-form table td {
        padding: 15px;
        border: 1px solid #ccc;
        width: 80%;
    }

    .invite-button {
        margin-top: 20px;
        margin-left: 90%;
    }
</style>

<style>
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }

    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }

    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
    }

    .avatar {
        width: 178px;
        height: 178px;
        display: block;
    }
</style>