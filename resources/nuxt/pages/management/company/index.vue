<template>
    <section>
        <div class="management-item">
            <nuxt-link to="/management/company/edit">
                <el-card>
                    <p>編集</p>
                </el-card>
            </nuxt-link>
        </div>
        <div class="management-item">
            <nuxt-link to="/management/company/unsubscribe">
                <el-card>
                    <p>退会</p>
                </el-card>
            </nuxt-link>
        </div>
    </section>
</template>

<style scoped>
    .management-item {
        width: 49%;
        display: inline-block;
        margin-bottom: 25px;
        box-sizing: border-box;
        -webkit-transition: ease .3s;
        -moz-transition: ease .3s;
        transition: ease .3s;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
        border-radius: 4px;
    }

    .management-item:hover {
        box-shadow: 0 6px 12px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    }

    .management-item:nth-child(2n) {
        margin-left: 2%;
    }

    .el-card {
        width: 100%;
        padding: 60px 0px;
    }

    .el-card p {
        text-align: center;
        font-size: 20px;
        letter-spacing: 2px;
        color: #8a8a8a;
    }
</style>