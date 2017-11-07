<template>
  <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      action="//0.0.0.0:3333/api/v1/image/resize"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      name="thumbnail"
  >
    <img v-if="thumbnail" :src="thumbnail" class="avatar">
    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
  </el-upload>
</template>

<script>
  export default{
    props: ["thumbnail"],
    methods: {
      handleAvatarSuccess(res, file) {
        this.$emit('uploaded', res.dataUrl)
        this.$store.commit('SET_IS_LOADING', false)
      },
      beforeAvatarUpload(file) {
        this.$store.commit('SET_IS_LOADING', true)
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$store.commit('SET_IS_LOADING', false)
          this.$message.error('Avatar picture must be JPG or PNG format!');
          return isJPG
        }
        if (!isLt2M) {
          this.$store.commit('SET_IS_LOADING', false)
          this.$message.error('Avatar picture size can not exceed 2MB!');
          return isLt2M
        }
      }
    }
  }
</script>

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
    width: 250px;
    height: 250px;
    display: block;
  }
</style>