import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-app.js';
import { getFirestore, collection, doc, addDoc, getDocs, deleteDoc } from 'https://www.gstatic.com/firebasejs/9.14.0/firebase-firestore-lite.js';

export default class Model {
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

    async readValues(values) {
        const snapshot = await getDocs(collection(this.db, "values"))
        snapshot.forEach(doc => {
            values.push({
                label: doc.data().label,
                target: doc.data().target,
                actual: doc.data().actual,
                id: doc.id
            }); 
        })
    }

    async writeValues(values) {
        try {
            await this.writeValuesToDb(values);
        } catch (e) {
            console.error("Error adding records: ", e);
        }
    }

    writeValuesToDb(values) {
        values.forEach(value => {
            const docRef = addDoc(collection(this.db, "values"), {
                label: value.label,
                target: value.target,
                actual: value.actual
            });
        })
    }
    
    async deleteValues(values) {
        if (!values.length) {
            console.log("empty values array");
            return false;
        }

        try {
            await this.deleteValuesFromDb(values);
        } catch (e) {
            console.error("Error deleting records: ", e);
        }
    }

    deleteValuesFromDb(values) {
        values.forEach(value => {
            deleteDoc(doc(this.db, "values", value.id));
        })
    }

    updateValues(originalValues, changedValues) {
        this.deleteValues(originalValues).then( () => {
            this.writeValues(changedValues).then( () => {
                const values = [];
                this.readValues(values).then()
                localStorage.setItem("values", JSON.stringify(changedValues));    
            });
        });
    }
}
