import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import { useAuth } from "../auth/context/AuthContext";
// import app from "../auth/firebase";

const Result = ({ payload }) => {
  const { user } = useAuth();

  const [isImageCovered, setIsImageCovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const allergenMapping = {
    Milk: [
      "Milk",
      "Lactose",
      "Skimmed Milk Powder",
      "Milk Fat",
      "Whey Powder",
      "Cheese",
      "Butter",
      "Cream",
      "Yogurt",
    ],
    Eggs: ["Eggs", "Egg White Powder", "Egg Yolk", "Albumin", "Lysozyme"],
    Wheat: [
      "Wheat",
      "Wheat Flour",
      "Whole Wheat Flour",
      "Barley",
      "Rye",
      "Oats",
      "Triticale",
      "Spelt",
    ],
    Soy: ["Soy", "Soy Lecithin", "Soy Flour", "Soy Protein", "Edamame", "Tofu"],
    Nuts: [
      "Almonds",
      "Hazelnuts",
      "Cashews",
      "Walnuts",
      "Nut Oils",
      "Nut Butters",
      "Pecans",
      "Macadamia Nuts",
      "Brazil Nuts",
      "Pine Nuts",
    ],
    Peanuts: ["Peanuts", "Peanut Oil", "Groundnuts", "Arachis Oil"],
    Fish: [
      "Fish",
      "Fish Oil",
      "Anchovy Extract",
      "Cod",
      "Tuna",
      "Salmon",
      "Haddock",
    ],
    Shellfish: ["Shrimp", "Crab", "Lobster", "Scallops", "Clams", "Mussels"],
    Sesame: ["Sesame Seeds", "Sesame Oil", "Tahini"],
    Mustard: ["Mustard Seeds", "Mustard Powder", "Prepared Mustard"],
    Celery: ["Celery", "Celery Root", "Celery Salt", "Celeriac"],
    Lupin: ["Lupin Flour", "Lupin Seeds", "Lupini Beans"],
    Sulfites: [
      "Sodium Bisulfite",
      "Sulfur Dioxide",
      "Sulfites",
      "Potassium Metabisulfite",
    ],
    Mollusks: ["Octopus", "Squid", "Snails", "Clams", "Oysters"],
    Corn: ["Corn", "Corn Starch", "Corn Syrup", "Popcorn", "Masa Flour"],
    Gluten: ["Wheat", "Barley", "Rye", "Spelt", "Triticale", "Semolina"],
    TreeNuts: ["Chestnuts", "Beechnuts", "Coconut", "Shea Nuts"],
  };
  function getProductAllergens(data) {
    const allergensFound = new Set(); // Use a Set to avoid duplicates

    data.product.ingredients.forEach((ingredient) => {
      for (const [allergen, ingredients] of Object.entries(allergenMapping)) {
        if (ingredients.includes(ingredient.text)) {
          allergensFound.add(allergen);
        }
      }
    });

    if (allergensFound.size > 0) {
      console.log(`Allergens found: ${[...allergensFound].join(", ")}`);
    } else {
      console.log("No allergens found for this product.");
    }
  }

  console.log(JSON.stringify(payload));
  const productName = payload?.product?.product_name || "Unknown Product";
  const imageUrl =
    payload?.product?.image_url || "https://via.placeholder.com/600";
  const isHalal = true;

  if (payload && payload?.status !== 0 && user) {
    const db = getDatabase(); //connection to the db
    const newRef = ref(db, "history/" + user.uid + "/" + payload?.code); //reference to the db path, to store data in the firebase.
    const historyData = {
      //
      email: user.email,
      productCode: payload?.code,
      product: productName,
      img: imageUrl,
    };
    set(newRef, historyData)
      .then(() => {
        console.log("User history data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user history data:", error);
      });
  }

  const allergensList = payload?.product?.allergens_hierarchy || [];
  const formattedAllergens =
    allergensList.length > 0
      ? allergensList.map((allergen) =>
          allergen.replace("en:", "").replace(/_/g, " ").toUpperCase()
        )
      : ["No allergens listed"];
  const nutriscoreData = payload?.product?.nutriscore_data || null;

  return (
    <div className={`cardWrapper${payload ? " active" : ""}`}>
      <div className="content">
        <div className="cardWrapperHover">
          <div className={`card ${isFlipped ? "flipped" : ""}`}>
            {!payload || payload?.status === 0 ? (
              <div className="cardContent">
                <h1 className="name">Product not found</h1>
              </div>
            ) : (
              <>
                <div className="frontFace">
                  <div className="imageContent">
                    <div
                      className="cardImage"
                      onDoubleClick={() => {
                        setIsImageCovered(!isImageCovered);
                      }}
                    >
                      <img
                        src={imageUrl}
                        alt={productName}
                        className={`cardImg${isImageCovered ? " cover" : ""}`}
                      />
                    </div>
                  </div>

                  <div className="cardContent">
                    <h1 className="name">{productName}</h1>
                    <h2 className={`halal${isHalal ? "" : " not"}`}>{`${
                      isHalal ? "Halal" : "Haram"
                    }`}</h2>
                    <div className="allergens">
                      <h2>Allergens:</h2>
                      <ul>
                        {formattedAllergens.map((allergen, index) => (
                          <li key={index}>{allergen}</li>
                        ))}
                      </ul>
                    </div>
                    <button
                      className="button"
                      onClick={() => {
                        setIsFlipped(true);
                      }}
                    >
                      View Nutrition
                    </button>
                  </div>
                </div>
                <div
                  className="backFace"
                  onClick={() => {
                    setIsFlipped(false);
                  }}
                >
                  {nutriscoreData ? (
                    <div className="nutrition">
                      <h2>Nutrition Data:</h2>
                      <ul>
                        <li>Energy: {nutriscoreData.energy} kJ</li>
                        <li>Fiber: {nutriscoreData.fiber} g</li>
                        <li>Proteins: {nutriscoreData.proteins} g</li>
                        <li>Saturated Fat: {nutriscoreData.saturated_fat} g</li>
                        <li>Sodium: {nutriscoreData.sodium} mg</li>
                        <li>Sugars: {nutriscoreData.sugars} g</li>
                        <li>Score: {nutriscoreData.score}</li>
                        <li>Grade: {nutriscoreData.grade.toUpperCase()}</li>
                      </ul>
                    </div>
                  ) : (
                    <div className="nutrition">
                      <h2>No Nutrition Data Available</h2>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Result;
