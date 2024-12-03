import React, { useEffect, useState } from "react";
import { useAuth } from "../auth/context/AuthContext";
import { getDatabase, ref, onValue } from "firebase/database";
import ProductCard from "../components/ProductCard";

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
          const items = Object.entries(historyData).map(
            ([productCode, item]) => ({
              productCode,
              ...item,
            })
          );
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
      <h1>History | {user.email}</h1>
      {historyItems.length > 0 ? (
        <div className="historyGrid">
          {historyItems.map((item) => (
            <div className="cardWrapper active">
              <div className="content">
                <ProductCard
                  key={item.productCode}
                  productName={item.product}
                  imageUrl={item.img}
                  isHalal={item.halal}
                  allergens={item.allergens}
                  nutriscoreData={item.nutriscore}
                  isHistory={true}
                  status={1}
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No history was found!</p>
      )}
    </div>
  );
}
