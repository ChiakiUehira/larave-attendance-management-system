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
                        <label class="upload-file">
                            <h1><i class="el-icon-plus"></i></h1>
                            <div class="photo">
                                <img :src="context.thumbnail" alt="">
                            </div>
                            <input type="file" @change="preview" required>
                        </label>
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
                        <el-select v-model="context.group" placeholder="Select">
                            <el-option
                                    v-for="item in options.groups"
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
//      const {data} = await app.$http.get('groups')
//      console.log(data)
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
          "group": "総務部"
        },
        options: {
          groups: [{
            value: '1',
            label: '営業部'
          }, {
            value: '1',
            label: '人事部'
          }, {
            value: '1',
            label: '総務部'
          }]
        },
        isSend: false
      }
    },
    methods: {
      async invite(){
        if (!this.isSend) {
          this.isSend = true;
          const {data} = await this.$http.post('/manager/invite', this.context).catch(err => {
            if (err.response.data.message === 'overlapping') {
              this.isSend = false;
              this.$notify.error('このEmailアドレスはすでに登録されています。')
              return
            }
            if (!err.response.data.success) {
              this.isSend = false;
              this.$notify.error('招待メールの送信に失敗しました')
            }
          })
          if (data.success) {
            this.isSend = false;
            this.clear();
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
        this.context.group = ""
      },
      preview (e) {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onload = (e) => {
          this.context.thumbnail = reader.result
        }
        if (file) reader.readAsDataURL(file)
        e.target.value = null
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

    .upload-file {
        max-height: 330px;
        min-height:330px;
        max-width: 330px;
        min-width:330px;
        border: solid 1px #bfcbd9;
        display: block;
        margin: 40px auto;
        border-radius: 3px;
        position: relative;
    }
    .upload-file:hover {
        border: solid 1px #8391a5;
    }
    .upload-file h1 {
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: -1;
    }
    .upload-file input {
        display: none;
    }

    .photo {
        width: 100%;
        height: 100%;
        margin: 0 auto;
        margin-bottom: 50px;
        z-index: 999;
    }
    .photo img {
        height: 100%;
        width: 100%;
        object-fit: contain;
    }

</style>