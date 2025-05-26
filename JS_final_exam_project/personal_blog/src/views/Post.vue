<script setup>
import { reactive } from 'vue';
import { useRoute } from 'vue-router'
import { store } from "../store"
import { db } from '../firebase'
import { doc, getDoc } from 'firebase/firestore'

const route = useRoute()
let post = reactive({})

const fetchPost = async(id) => {
    // 先檢查 store 中是否已有該文章
    const found = store.posts.find(x => x.id === id)
    if(found) {
        Object.assign(post, found)
        return
    }

    // 從 Firebase 獲取文章
    const docRef = doc(db, 'posts', id)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
        const data = { id: docSnap.id, ...docSnap.data() }
        Object.assign(post, data)
        store.posts = [...store.posts, post]
    }
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