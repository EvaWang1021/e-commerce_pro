<template>
    <div class="login_container">
        <div class="login_box">
            <div class="avatar_box">
            <img src="../assets/logo.png" alt="">
            </div > 
            <!-- 我真tnd无语了，:rules少写一个‘s’啊啊啊啊啊，rel定义的是绑定对象可以有可以没有 -->
            <el-form :rules="loginFormRules" :model="loginForm" ref="loginFormRef" class="login_form" >
                <!-- 用户名 -->
                <!--妈妈呀呀呀，我把v-model绑到el-form-item上了，导致输入框的值不能输入  -->
                <el-form-item prop="username">
                    <el-input v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                <!-- 密码 -->
                <el-form-item prop="password">
                    <el-input v-model="loginForm.password"  prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                <!-- 登陆重置按钮 -->
                <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetLoginForm">重置</el-button>
                </el-form-item>               
            </el-form>             
        </div>       
    </div>
</template>
<script>
export default {
    // 定义一个data对象
    data(){
        // 返回它的data数据
        return{
            // 实现数据的双向绑定
            loginForm:{
                username:'admin',
                password:'123456'
            },
            loginFormRules:{
                username:[
                { required: true, message: "请输入用户名", trigger: 'blur' },
                { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                ],
                password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
           
        };
    },
   methods:{
    // 定义重置按钮
       resetLoginForm(){
            // congsole.log(this);打印ref对象属性
            // 点击-resetLoginForm()-this.$refs.'表单ref里面的绑定的引用对象'.'重置方法'
            this.$refs.loginFormRef.resetFields();
       },
       login(){
           this.$refs.loginFormRef.validate(async valid=>{            
                if(!valid) return;
                // valid为true 发起请求
                // const拿到服务器返回数据，post发送登录请求，axios已经配好,所以直接用this.$http
                // await用来简化post接收到的promise，await必须用async来修饰
                // data才是从服务器获取的数据对象，然后重命名为res,
                const {data:res} = await this.$http.post("login",this.loginForm);
                // 再用meta属性判断是否登录成功
                if(res.meta.status !==200) return this.$message.error('对不起，登录失败！');
                this.$message.success('恭喜您，登陆成功！');
                // 1.将登陆成功之后的token，保存到客户端的sessionStorage中
                //   1.1项目中出了登陆之外的其他API接口，必须在登陆之后才能访问
                //   1.2token只应在当前网站打开期间生肖，所以将token保存在sessionStorage中
                // 2.通过编程式导航跳转到后台主页，路由地址是/home
                console.log(res);
                // 打开控制台显示res 有data属性，data下有token值
                window.sessionStorage.setItem('token',res.data.token);
                // 编程式导航界面
                this.$router.push("/home");
           });
       }
   }
    
}
</script>
<style lang="less" scoped>
.login_container{
    background-color: rgb(49, 17, 109);
    height:100%;
}
.login_box{
    width:450px;
    height: 300px;
    background-color:#fff;
    border-radius:3px;
    position:absolute;
    left:50%;
    top:50%;
    transform:translate(-50%,-50%);
    padding:5px;
    .avatar_box{
        height: 130px;
        width: 130px;
        background-color: #fff;
        border: 1px solid #eee;
        box-shadow:0 0 10px #ddd;
        border-radius: 50%;
        padding:10px;
        // absolute必须加上要不然盒子不动
        position:absolute;
        left:50%;
        transform:translate(-50%,-50%);
    img{
         height:100%;
         width:100%;
         border-radius:50%;        
         background: #eee;
        }

    }
}
.btns{
    //弹性盒模型
    display:flex;
    // 横轴上尾部对齐
    justify-content: flex-end;
}
.login_form{
    position:absolute;
    bottom:0;
    // 输入框没有占满表单
    width:100%;
    padding:20px;
    // 规定填充和边框在盒子内
    box-sizing: border-box;
}
</style>