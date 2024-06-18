<script setup>
import {store} from '../store'
import supabase from '../supabase';

const getWordsNumber = (str) => {//抓取字數
  if (!str){
    return 0;
  }
  const chineseChars = str.match(/[\u4e00-\u9fa5]/g) || [];//抓取中文字
  const englishWords = str.match(/\b\w+\b/g) || [];//抓取英文字
  const chineseCount = chineseChars.length;//計算中文字數
  const englishCount = englishWords.length;//計算英文字數
  return chineseCount + englishCount;
}

const fetchPosts = async() =>{//非同步處理 從supabase資料庫抓取posts表的所有紀錄
let { data: posts, error } = await supabase
    .from('posts')
    .select()
    if (error) throw new Error(error)//錯誤處理
    store.posts = posts
}

fetchPosts()
</script>

<template>
    <div class="Home bg-gray-100 min-h-screen p-6">
        <main class="text-center container mx-auto py-10">
            <div v-if="store.posts.length < 1" class="text-gray-600 text-xl">
                這裡尚未發佈任何文章
            </div>
            <div v-else>
                <div class="PostItem border border-slate-300 mb-6 p-6 rounded-lg shadow-lg cursor-pointer hover:bg-slate-50 transition duration-300 ease-in-out transform hover:-translate-y-1" v-for="item, itemindex in store.posts" :key="itemindex" @click="$router.push(`/post/${item.id}`)">
                    <h1 class="text-slate-800 text-3xl font-mono mb-2">
                        {{ item.title }} <!--文章標題-->
                    </h1>
                    <p class="text-gray-600">
                        {{ getWordsNumber(item.description) }} 個字數 <!--字數顯示-->
                    </p>
                </div>
            </div>
        </main>
    </div>
</template>



