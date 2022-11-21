import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, addDoc, getDocs } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

export default class BetterModel {
    constructor() {
        this.firebaseConfig = {
            apiKey: "AIzaSyDHvfzLoOzSzsZuS6C-4cM43hsNxbzpNSY",
            authDomain: "bettereveryday-2bdc8.firebaseapp.com",
            projectId: "bettereveryday-2bdc8",
            storageBucket: "bettereveryday-2bdc8.appspot.com",
            messagingSenderId: "636949545943",
            appId: "1:636949545943:web:9d1af63f74ad4fe6bf4192"
        };
        this.app = initializeApp(this.firebaseConfig);
        this.db = getFirestore(this.app);        
    }

    // Test method
    async addUserRecord(user) {
        try {
            const docRef = await addDoc(collection(this.db, "users"), {
                first: user.first,
                last: user.last,
                born: user.born
            });
            console.log("Document written with ID: ", docRef.id);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    // More Model Methods Here

}
