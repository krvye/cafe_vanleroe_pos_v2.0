import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import app from "../firebaseConfig";


export const NoteTemplates = () => {
    const [noteTemplates, setNoteTemplates] = useState([]); 

    useEffect(() => {
        const db = getFirestore(app); 
        const NOTE_TEMPLATES_COLLECTION = collection(db, "POS_NOTE_TEMPLATES"); 

        const subscribeNoteTemplates = onSnapshot(NOTE_TEMPLATES_COLLECTION, 
            (snapshot) => {
                const noteTempInfo = []; 
                snapshot.forEach((doc)=> {
                    noteTempInfo.push({doc_id: doc.id, ...doc.data()}); 
                }); 
                setNoteTemplates(noteTempInfo); 
                console.log("NOTE TEMPLATES: ", noteTempInfo); 
            }); 
            return () => subscribeNoteTemplates();
    }, []);
    return noteTemplates;
}