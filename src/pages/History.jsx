import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/context/AuthContext";
import { getDatabase, ref, onValue } from "firebase/database";

export default function History() {
  const { user } = useAuth();
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    if (user) {
      const db = getDatabase();
      const historyResultsRef = ref(db, "history/" + user.uid);

      const unsubscribe = onValue(historyResultsRef, (snapshot) => {
        const historyData = snapshot.val();
        if (historyData) {
          const items = Object.entries(historyData).map(([productCode, item]) => ({
            productCode,
            ...item,
          }));
          setHistoryItems(items);
        } else {
          setHistoryItems([]); 
        }
      });
      return () => unsubscribe();
    }
  }, [user]); 

  return (
    <div className="main">
      <h1>History</h1>
      {historyItems.length > 0 ? (
        <ul>
          {historyItems.map((item) => (
            <li key={item.productCode}>
              <h3>{item.product}</h3>
              <img src={item.img} alt={item.product} style={{ width: "100px", height: "100px" }} />
              <p>{item.halal ? "Hallal!" : "Haram!"}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No history was found!</p>
      )}
    </div>
  );
}
