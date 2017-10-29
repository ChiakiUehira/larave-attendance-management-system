<template>
    <div class="page">
        <el-card class="me-state">
            <div class="condition">
                <h3>体調</h3>
                <el-rate
                        v-model="value4"
                        :icon-classes="['icon-rate-face-1', 'icon-rate-face-2', 'icon-rate-face-3']"
                        void-icon-class="icon-rate-face-off"
                        :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
                </el-rate>
            </div>
            <div class="now">
                <h3>なにしてる?</h3>
                <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        closable
                        :type="tag.type">
                    {{tag.name}}
                </el-tag>
                <div>
                    <el-button>えらぶ</el-button>
                    <el-button>つくる</el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>
<script>
  export default {
    data() {
      return {
        value4: null,
        tags: [
          {name: '外出中', type: ''},
          {name: '帰ったらどうぶつの森する', type: 'success'},
          {name: 'ほげほげ', type: 'info'},
          {name: 'ぴよぴよ', type: 'warning'},
          {name: 'ふがふが', type: 'danger'}
        ]
      }
    }
  }
</script>
<style scoped>
    .page {
        background: #fff;
        padding: 40px;
    }
    .me-state{
        margin: 0 auto;
        width:70%;
        padding:5px;
    }
    .condition h3 {
        padding:5px 0px;
        margin-bottom:20px;
        color:#8a8a8a;
        border-bottom:solid 5px;
        letter-spacing: 2px;
    }
    .now h3{
        padding:5px 0px;
        margin-top:50px;
        margin-bottom:20px;
        color:#8a8a8a;
        border-bottom:solid 5px;
    }
    .now .el-tag{
        margin-right:10px;
    }
    .now .el-tag:last-child{
        margin-right:0px;
    }
    .el-button{
        margin-top:20px;
    }
</style>