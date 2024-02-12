import { useEffect, useState } from "react";
import { collection, getDocs, where, query } from "firebase/firestore";
import { db } from "./FirebaseConfig";
import { IBMIData, IUserData } from "./types/Types";

type CombinedData = IUserData | IBMIData;

export const useFirestoreCollection = (
  collectionName: string,
  filter?: string,
  whatToFilter?: string
) => {
  const [data, setData] = useState<CombinedData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const collectionRef = collection(db, collectionName);

      let q = query(collectionRef);

      if (filter && whatToFilter) {
        q = query(collectionRef, where(whatToFilter, "==", filter));
      }

      const querySnapshot = await getDocs(q);

      const newData = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as CombinedData)
      );

      setData(newData);
    };

    fetchData();
  }, [collectionName, filter]);

  return data;
};
