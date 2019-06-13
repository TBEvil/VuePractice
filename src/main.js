import Vue from "vue";
import App from "./App"; // 导入App组件（为什么这样导入？请看第四段中的第7）

new Vue({
    el:"#app",
    render: h => h(App)
})