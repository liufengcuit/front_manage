import App from './App.vue';
import router from './router';

//进度条
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

Vue.prototype.$size = "small";

Vue.config.productionTip = false;


router.beforeEach((to, from, next) => {
    NProgress.start();
    if (to.path !== "/login") {
        // let user = getSession("xk-user") ? JSON.parse(getSession("xk-user")) : {};
        // if (user.token) {
        //     if (to.path !== "/welcome") {
        //         let arr = to.path.split("/");
        //         let map = JSON.parse(getSession("permission")) ? new Map(JSON.parse(getSession("permission"))) : null;
        //         if (!map.get(arr[1])) {
        //             Message.error("你的权限不足，请联系管理员");
        //             next({path: "/welcome"});
        //             NProgress.done()
        //         } else {
        //             next();
        //         }
        //     } else {
        //         next();
        //     }
        // } else {
        //     //防止浏览器回退按钮
        //     window.history.forward(1);
        //     next({path: "/login"});
        // }
        next();
    } else {
        next();
    }
})

router.afterEach(() => {
    NProgress.done()
})


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
