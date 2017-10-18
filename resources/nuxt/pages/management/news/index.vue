<template>
    <section name="news" class="news">
        <h3>※投稿はマークダウン形式になります</h3>
        <div class="before">
            <textarea name="" rows="28" class="before-edit" v-model="before">
            </textarea>
        </div>

        <div class="after markdown-body" v-html="after">

        </div>
    </section>
</template>

<script>
  import marked from 'marked'
  import mdCss from 'github-markdown-css'

  export default{
    data(){
      return {
        before: `## 今日のお話
うんたらかんたらうんたらかんたら<br>
こんな感じで記事をかく

| Tables        | Are           | Cool  |
| ------------- |:-------------:| -----:|
| col 3 is      | right-aligned |       |
| col 2 is      | centered      |       |
| zebra stripes | are neat      |  cool |

* 卵焼き
* 味噌汁
* ポテト

##  焼肉食べたい`
      }
    },
    computed: {
      after(){
        return marked(this.before)
      }
    }
  }
</script>

<style scoped>
    h3 {
        color: rgb(131, 145, 165);
        margin-bottom: 10px;
    }

    .news {
        max-width: 90%;
        margin: 0 auto;
        position: relative;
    }

    .before {
        display: inline-block;
        width: 49.5%;
        letter-spacing: 2px;
    }

    .before-edit {
        resize: none;
        width: 100%;
        border-color: rgb(191, 203, 217);
        border-radius: 3px;
        outline: none;
        transition: ease .3s;
        box-sizing: border-box;
        font-size: 20px;
        color:#334257;
        padding:15px;
    }

    .before-edit:hover {
        border-color: rgb(131, 145, 165);
    }

    .after {
        display: inline-block;
        width: 49.5%;
        height: 100%;
        margin-left: 1%;
        vertical-align: top;
        letter-spacing: 2px;
        color:#334257;
    }
</style>
<style>
    .markdown-body {
        box-sizing: border-box;
        min-width: 200px;
        max-width: 980px;
        margin: 0 auto;
        padding: 45px;
    }

    @media (max-width: 767px) {
        .markdown-body {
            padding: 15px;
        }
    }
</style>