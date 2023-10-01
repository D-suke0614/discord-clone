import {
  DocumentData,
  Query,
  collection,
  onSnapshot,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

interface Channels {
  id: string;
  channel: DocumentData;
}

function useCollection(data: string) {
  const [documents, setDocuments] = useState<Channels[]>([]);

  const collectionRef: Query<DocumentData> = query(collection(db, data));

  useEffect(() => {
    onSnapshot(collectionRef, (querySnapshot) => {
      const channelsResults: Channels[] = [];
      querySnapshot.docs.forEach((doc) =>
        channelsResults.push({
          id: doc.id,
          channel: doc.data(),
        })
      );
      setDocuments(channelsResults);
    });
  }, []);
  return { documents };
}

export default useCollection;
