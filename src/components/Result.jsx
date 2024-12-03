import React from "react";

const Result = ({ payload }) => {
  console.log(JSON.stringify(payload));
  const productName = payload?.product?.product_name || "Unknown Product";
  const imageUrl = payload?.product?.image_url || "https://via.placeholder.com/600";
  const isHalal = true;

  const allergensList = payload?.product?.allergens_hierarchy || [];
  const formattedAllergens =
    allergensList.length > 0
      ? allergensList.map((allergen) =>
          allergen.replace("en:", "").replace(/_/g, " ").toUpperCase()
        )
      : ["No allergens specified"];

  return (
    <div className={`cardWrapper${payload ? " active" : ""}`}>
      <div className="content">
        <div className="card">
          <div className="imageContent">
            <span className="overlay"></span>
            <div className="cardImage">
              <img src={imageUrl} alt={productName} className="cardImg" />
            </div>
          </div>

          <div className="cardContent">
            <h1 className="name">{productName}</h1>
            <h2 className={`halal${isHalal ? "" : " not"}`}>{`${isHalal ? "Halal" : "Haram"}`}</h2>
            <div className="allergens">
              <h2>Allergens:</h2>
              <ul>
                {formattedAllergens.map((allergen, index) => (
                  <li key={index}>{allergen}</li>
                ))}
              </ul>
            </div>
            <button className="button">View Nutrition</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
