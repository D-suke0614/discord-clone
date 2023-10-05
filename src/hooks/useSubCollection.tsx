import {
  DocumentData,
  Query,
  Timestamp,
  collection,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useAppSelector } from "../app/hooks";

interface Messages {
  timestamp: Timestamp;
  message: string;
  user: {
    uid: string;
    photo: string;
    email: string;
    displayName: string;
  };
}

function useSubCollection(collectionName: string, subCollectionName: string) {
  const [subDocuments, setSubDocuments] = useState<Messages[]>([]);
  const channelId = useAppSelector((state) => state.channel.channelId);

  useEffect(() => {
    let collectionRef = collection(
      db,
      collectionName,
      String(channelId),
      subCollectionName
    );

    const collectionRefOrderBy = query(
      collectionRef,
      orderBy("timestamp", "desc")
    );

    onSnapshot(collectionRefOrderBy, (snapShot) => {
      const results: Messages[] = [];
      snapShot.docs.forEach((doc) => {
        results.push({
          timestamp: doc.data().timestamp,
          message: doc.data().message,
          user: doc.data().user,
        });
      });
      setSubDocuments(results);
      console.log(results);
    });
  }, [channelId]);

  return { subDocuments };
}

export default useSubCollection;
