import { useEffect, useState } from "react";
import { firebase } from "./firebase";
import { ItemDoc } from "./types";

interface Props {
  collection: string;
  doc: string;
}

export const useData = ({ collection, doc }: Props) => {
  const [data, setData] = useState<ItemDoc>({ id: "", items: [] });

  useEffect(() => {
    const db = firebase.firestore();
    const unsubscribe = db
      .collection(collection)
      .doc(doc)
      .onSnapshot(doc => {
        const docData = doc.data();

        const items = {
          items: docData?.items || [],
          id: doc.id
        };
        setData(items);
      });
    return () => {
      unsubscribe();
    };
  }, [collection, doc]);

  return [data];
};

export const useFirebase = ({ collection, doc }: Props) => {
  const [data, setData] = useState<ItemDoc>({ id: "", items: [] });

  useEffect(() => {
    const db = firebase.firestore();
    db.collection(collection)
      .doc(doc)
      .get()
      .then(doc => {
        const docData = doc.data();

        const items = {
          items: docData?.items || [],
          id: doc.id
        };
        setData(items);
      });
  }, [collection, doc]);

  return [data];
};
