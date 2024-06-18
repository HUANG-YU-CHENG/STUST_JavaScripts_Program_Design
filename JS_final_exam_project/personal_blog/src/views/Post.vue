<script setup>
import { reactive } from 'vue';
import {useRoute} from 'vue-router'
import {store} from "../store"
import supabase from '../supabase';


const route = useRoute()
let post = reactive({});

const fetchPost = async(id) =>{
    const found = store.posts.find(x => x.id === parseInt(route.params.id))
    if(found){ //檢查文章是否有在posts資料庫裡面 若沒有則直接返回 避免重複請求
        return
    }
    let { data, error } = await supabase //抓取文章數據
        .from('posts')
        .select() 
        .eq('id',id)//用文章ID過濾
        .single()//抓取單個文章數據
    if (error) throw new Error(error)
    Object.assign(post,data)
    store.posts = [...store.posts,post]
}

fetchPost(route.params.id)
</script>

<template>
    <div class="Post bg-gray-100 min-h-screen flex flex-col items-center">
        <main class="text-center container mx-auto py-10 flex flex-col items-center">
            <div v-if="!post" class="text-gray-600 text-xl">
                找不到文章
            </div>
            <div v-else class="w-full max-w-3xl border border-slate-300 p-6 rounded-lg shadow-lg"> 
                <h1 class="text-slate-800 text-3xl font-mono mb-4">{{ post.title }}</h1> <!--標題--> 
                <p class="text-xl text-slate-500 mt-4">{{ post.description }}</p> <!--文章敘述-->
            </div>
        </main>
    </div>
</template>