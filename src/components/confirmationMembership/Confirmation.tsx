import { Check, Close } from "@mui/icons-material";
import "./Confirmation.css";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../FirebaseConfig";
import moment from "moment";
import { useEffect, useState } from "react";
import { IUserData } from "../../types/Types";

interface confirmationInterface {
  closeModal: () => void;
  nameOfPerson: string;
  email: string;
}

const Confirmation = ({
  closeModal,
  nameOfPerson,
  email,
}: confirmationInterface) => {
  const [userData, setUserData] = useState<IUserData | undefined>();

  const userCollectionList = collection(db, "users");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(userCollectionList, where("email", "==", email));
      const querySnapshot = await getDocs(q);

      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IUserData)
      );

      setUserData(data.length > 0 ? data[0] : undefined);
    };
    fetchData();
  }, []);

  const handleAddMembership = async () => {
    try {
      await addDoc(collection(db, "monthlyMembership"), {
        email: email,
        name: nameOfPerson,
        date: moment(new Date()).format("YYYY-MM-DD hh:mm A"),
        amount: 400,
      });

      handleMembershipUpdate();

      window.location.reload();
    } catch (error) {
      console.error("Error saving:", error);
    }
  };

  const handleMembershipUpdate = async () => {
    if (!userData) return;

    try {
      const userDocRef = doc(db, "users", userData.id);
      await updateDoc(userDocRef, { membership: "Member" });
      window.location.reload();
    } catch (error) {
      console.error("Error updating membership:", error);
    }
  };

  return (
    <div className="confirmation">
      <div className="confirmationHeader">&nbsp; Confirm</div>
      <div className="confirmationBody">
        <span>Are you sure you want to add payment to {nameOfPerson}?</span>
        <div className="confirmationDivBtns">
          <button className="confirmationBtnYes" onClick={handleAddMembership}>
            <Check />
          </button>
          <button className="confirmationBtnNo" onClick={closeModal}>
            <Close />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
