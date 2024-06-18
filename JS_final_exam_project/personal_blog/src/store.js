import { reactive } from 'vue';

const store = reactive({//創建響應式對象store並追蹤posts屬性變化
    posts:[]
})

export {store};//導出store