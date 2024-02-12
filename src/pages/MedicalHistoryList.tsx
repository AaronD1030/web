import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { IAllergies, IMedicalData } from "../types/Types";
import { db } from "../FirebaseConfig";

interface Props {
  email: string;
}

const MedicalHistoryList = ({ email }: Props) => {
  const [medicalHistory, setMedicalHistory] = useState<IMedicalData>();
  const [allergies, setAllergies] = useState<IAllergies>();

  const medicalHistoryCollectionRef = collection(db, "medicalHistory");
  const allergiesCollectionRef = collection(db, "allergies");

  useEffect(() => {
    const fetchData = async () => {
      const q = query(medicalHistoryCollectionRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IMedicalData)
      );

      setMedicalHistory(data.length > 0 ? data[0] : undefined);
    };
    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const q = query(allergiesCollectionRef, where("email", "==", email));

      const querySnapshot = await getDocs(q);
      const data = querySnapshot.docs.map(
        (doc) =>
          ({
            id: doc.id,
            ...doc.data(),
          } as IAllergies)
      );

      setAllergies(data.length > 0 ? data[0] : undefined);
    };
    fetchData();
  }, []);

  return (
    <div
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        paddingTop: "50px",
      }}
    >
      {medicalHistory && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            gap: "10px",
            maxWidth: "1100px",
            width: "100%",
            paddingBottom: "20px",
          }}
        >
          <section
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {allergies?.allergies.map((item) => (
                  <span style={{ width: "200px", flexWrap: "wrap" }}>
                    {item}{" "}
                  </span>
                ))}
              </span>
              Allergies
            </label>
          </section>

          <section
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {medicalHistory?.medicalConditions}
              </span>
              Medical Condition
            </label>
          </section>

          <section
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              gap: "15px",
            }}
          >
            <label
              style={{
                color: "#ccc",
                fontSize: "16px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <span
                style={{ color: "black", fontSize: "18px", fontWeight: "bold" }}
              >
                {medicalHistory?.currentMedications}
              </span>
              Medications
            </label>
          </section>
        </div>
      )}
    </div>
  );
};

export default MedicalHistoryList;
