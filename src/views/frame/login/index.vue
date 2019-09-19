<template>
  <div>
    <div id="loginPage">
      <div class="loginDiv">
        <div style="text-align: center;margin-bottom: 20px">
          <h1>登录</h1>
        </div>
        <Form :model="loginForm" style="width: 90%" :label-width="80">
          <FormItem label="用户名" prop="passwd">
            <Vinput type="text" name="用户名" placeholder="用户名"
                    validate="required" validate-scope="login" v-model="loginForm.username"></Vinput>
          </FormItem>
          <FormItem label="密码" prop="passwdCheck">
            <Vinput type="password" name="密码" placeholder="密码"
                    validate="required" validate-scope="login" v-model="loginForm.password"></Vinput>
          </FormItem>
          <FormItem style="margin-top: 40px">
            <Button type="primary" style="width: 70%;height: 36px" @click="handleSubmit">登录</Button>
          </FormItem>
        </Form>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "login",
    components: {},
    data() {
      return {
        loginForm: {
          username: '',
          password: '',
        }
      }
    },
    methods: {
      //登录按钮进行登录
      handleSubmit() {
      	
        // test
        this.$router.push(
          {
            path: "/home"
          }
        );
       
       // 后端验证
//      this.$validator.validate("login.*").then(result => {
//        if (result) {
//          this.$store.dispatch('LoginByUsername',this.loginForm).then(() => {
//            this.$router.push({path: "/home"});
//          });
//        }
//      });
      }
    }
  }
</script>

<style scoped>
  .ivu-tooltip-light .ivu-tooltip-inner {
    background-color: #ecc9e2;
    color: #f30000;
  }

  #loginPage {
    background-image: url("/static/login/images/backgroud.png");
    background-size: cover;
    height: 100%;
    width: 100%;
    position: fixed;
  }

  .loginDiv {
    position: fixed;
    padding-top: 30px;
    right: 12%;
    top: 15%;
    width: 250px;
    height: 300px;
    background: rgba(255, 255, 255, 0.5);
  }
</style>
