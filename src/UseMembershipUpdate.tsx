import { useEffect, useRef, useCallback } from "react";
import { doc, updateDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./FirebaseConfig";

const useMembershipUpdate = () => {
  const updateTriggerRef = useRef(false);
  const timeoutIdRef = useRef<NodeJS.Timeout | undefined>();
  const updateAllUsersToNonMemberRef = useRef<
    (() => Promise<void>) | undefined
  >();

  // Use useCallback to memoize the updateAllUsersToNonMember function
  const updateAllUsersToNonMember = useCallback(async () => {
    const usersCollection = collection(db, "users");

    try {
      // Fetch all users
      const querySnapshot = await getDocs(usersCollection);

      // Update membership to "Non-member" for each user
      const updatePromises = querySnapshot.docs.map(async (userDoc) => {
        const userDocRef = doc(db, "users", userDoc.id);
        await updateDoc(userDocRef, { membership: "Non-member" });
      });

      // Wait for all updates to complete
      await Promise.all(updatePromises);

      // Set the ref to trigger a refresh after updating all users
      updateTriggerRef.current = true;
    } catch (error) {
      console.error("Error updating all users to Non-member:", error);
    }
  }, []); // No dependencies for this function

  useEffect(() => {
    // Update the ref with the latest function
    updateAllUsersToNonMemberRef.current = updateAllUsersToNonMember;

    // Set a timeout to update all users after 1 minute
    timeoutIdRef.current = setTimeout(() => {
      // Call the function using the ref
      updateAllUsersToNonMemberRef.current?.();
    }, 600000); // 60000 milliseconds = 1 minute

    // Clean up the timeout to avoid unnecessary updates
    return () => clearTimeout(timeoutIdRef.current!);
  }, [updateAllUsersToNonMember]); // Pass the memoized function as a dependency

  // Use the ref value as a dependency for the effect
  useEffect(() => {
    if (updateTriggerRef.current) {
      // Set a new timeout when updateTriggerRef changes
      timeoutIdRef.current = setTimeout(() => {
        // Call the function using the ref
        updateAllUsersToNonMemberRef.current?.();
      }, 60000);
      // Reset the ref value
      updateTriggerRef.current = false;
    }
  }, [updateTriggerRef.current]);

  return null; // You can return something meaningful if needed
};

export default useMembershipUpdate;
