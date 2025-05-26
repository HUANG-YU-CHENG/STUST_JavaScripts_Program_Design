import { reactive } from 'vue';
import { db } from './firebase';
import { collection, addDoc, getDocs, doc, deleteDoc } from 'firebase/firestore';

const store = reactive({//創建響應式對象store並追蹤posts屬性變化
    posts: [],
    
    // 獲取所有文章
    async fetchPosts() {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        this.posts = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    },

    // 新增文章
    async addPost(post) {
        const docRef = await addDoc(collection(db, 'posts'), post);
        const newPost = { id: docRef.id, ...post };
        this.posts.push(newPost);
        return newPost;
    },

    // 刪除文章
    async deletePost(id) {
        await deleteDoc(doc(db, 'posts', id));
        const index = this.posts.findIndex(post => post.id === id);
        if (index > -1) {
            this.posts.splice(index, 1);
        }
    }
})

export {store};//導出store