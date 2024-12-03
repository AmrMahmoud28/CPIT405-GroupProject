import React, { useState } from "react";
import { ref, set } from "firebase/database";
import { getDatabase } from "firebase/database";
import { useAuth } from "../auth/context/AuthContext";
// import app from "../auth/firebase";

const Result = ({ payload }) => {
  const { user } = useAuth();

  const [isImageCovered, setIsImageCovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const haramMapping = [
    'pork', 'gelatin', 'alcohol', 'carmine', 'lard', 'ham', 'bacon', 'chorizo', 'blood',
    'carrion', 'dogmeat', 'catmeat', 'pork meat', 'gelatin products',
    'alcohol consumption', 'carmine dye', 'lard fat', 'ham meat', 'bacon strips', 'chorizo sausage',
    'blood sausage', 'dead meat', 'seafood intoxication', 'dog meat', 'cat meat',
    'alcohol-based food', 'non-halal meat', 'haram_food ', 'haram', 'non-halal'
  ]

  const allergenMapping = {
    milk: [
      'milk', 'lactose', 'skimmed milk powder', 'milk fat', 'whey powder', 'cheese', 'butter', 'cream', 'yogurt',
      'skimmed-milk-powder', 'whole-milk-powder', 'butterfat', 'milk-solids', 'cream',
      'skimmed-cow-s-milk-powder', 'whey-powder', 'milk-fat'
    ],
    eggs: ['eggs', 'egg white powder', 'egg yolk', 'albumin', 'lysozyme'],
    wheat: [
      'wheat', 'wheat flour', 'whole wheat flour', 'barley', 'rye', 'oats', 'triticale', 'spelt', 'barley-malt-extract',
      'gluten-from-wheat', 'wheat-rour'
    ],
    soy: ['soy', 'soy lecithin', 'soy flour', 'soy protein', 'edamame', 'tofu', 'soya-lecithin', 'sunflower-lecithin'],
    nuts: [
      'almonds', 'hazelnuts', 'cashews', 'walnuts', 'nut oils', 'nut butters', 'pecans', 'macadamia nuts',
      'brazil nuts', 'pine nuts', 'hazelnut', 'may-contain-soy-et-nuts', 'shea'
    ],
    peanuts: ['peanuts', 'peanut oil', 'groundnuts', 'arachis oil'],
    fish: ['fish', 'fish oil', 'anchovy extract', 'cod', 'tuna', 'salmon', 'haddock'],
    shellfish: ['shrimp', 'crab', 'lobster', 'scallops', 'clams', 'mussels'],
    sesame: ['sesame seeds', 'sesame oil', 'tahini'],
    mustard: ['mustard seeds', 'mustard powder', 'prepared mustard'],
    celery: ['celery', 'celery root', 'celery salt', 'celeriac'],
    lupin: ['lupin flour', 'lupin seeds', 'lupini beans'],
    sulfites: ['sodium bisulfite', 'sulfur dioxide', 'sulfites', 'potassium metabisulfite'],
    mollusks: ['octopus', 'squid', 'snails', 'clams', 'oysters'],
    corn: ['corn', 'corn starch', 'corn syrup', 'popcorn', 'masa flour'],
    gluten: ['wheat', 'barley', 'rye', 'spelt', 'triticale', 'semolina', 'barley-malt-extract', 'gluten-from-wheat'],
    treenuts: ['chestnuts', 'beechnuts', 'coconut', 'shea nuts', 'coconut'],
    cocoa: [
      'cocoa-butter', 'cocoa-paste', 'fat-reduced-cocoa', 'chocolate', 'cocoa-solids',
      'cocoa-mass', 'cocoa-powder'
    ],
    fruit: [
      'fruit-juice-blend', 'guava', 'papaya-purees', 'passionfruit', 'apple', 'concentrated-pineapple-juice'
    ],
    additives: [
      'vanillin', 'emulsifier', 'e150', 'e330', 'e440a', 'e415', 'natural-flavouring', 'e160ai',
      'emulsifier-from-plant-drigin', 'raising-agent', 'sodium-bicarbonatal'
    ],
    oils: [
      'palm-oil', 'vegetable-fat', 'palm-kernel-oil', 'non-hydrogenated-vegetable-oils',
      'palm-kernel', 'palm'
    ],
    salt: ['sea-salt', 'salt', 'fleur-de-sel'],
    aloe: ['aloe-vera']
  };

  function getHalalOrHaram(data) {
    if (data && data?.status !== 0 && data?.product?.ingredients) {
      let halalBoolean = true;

      data.product.ingredients.forEach((ingredient) => {
        const ingredientName = ingredient.id.split(':').pop().toLowerCase(); // remove er:

        if (haramMapping.includes(ingredientName)) {
          halalBoolean = false
        }

      });

      return halalBoolean
    } else {

      return "Missing ingredients"
    }
  }

  function getProductAllergens(data) {
    if (data && data?.status !== 0 && data?.product?.ingredients) {
      const allergensFound = new Set(); // Use a Set to avoid duplicates


      data.product.ingredients.forEach((ingredient) => {
        if (ingredient?.id) {

          const ingredientName = ingredient.id.split(':').pop().toLowerCase(); //remove er:

          for (const [allergen, ingredients] of Object.entries(allergenMapping)) { //get the name of the object with it's elemnts
            if (ingredients.includes(ingredientName)) { //if found add it to the list
              allergensFound.add(allergen);
            }
          }
        }
      });

      // Return allergens found or an empty set
      return allergensFound.size > 0 ? allergensFound : new Set().add("No allergens data available");
    } else {
      // Handle invalid input or missing data
      return new Set().add("No allergens data available");;
    }
  }


  const productName = payload?.product?.product_name || "Unknown Product";
  const imageUrl =
    payload?.product?.image_url || "https://via.placeholder.com/600";
  const isHalal = getHalalOrHaram(payload);

  if (payload && payload?.status !== 0 && user) {
    const db = getDatabase(); //connection to the db
    const newRef = ref(db, "history/" + user.uid + "/" + payload?.code); //reference to the db path, to store data in the firebase.
    const historyData = {
      email: user.email,
      productCode: payload?.code,
      product: productName,
      img: imageUrl,
      halal: isHalal
    };
    set(newRef, historyData)
      .then(() => {
        console.log("User history data saved successfully!");
      })
      .catch((error) => {
        console.error("Error saving user history data:", error);
      });
  }

  const ProductAllergens = Array.from(getProductAllergens(payload));
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
                    <h2 className={`halal${isHalal ? "" : " not"}`}>{`${isHalal ? "Halal" : "Haram"
                      }`}</h2>
                    <div className="allergens">
                      {ProductAllergens ? (
                        <>
                          <h2>Might Contain:</h2>
                          <ul>
                            {ProductAllergens.map((allergen, index) => (
                              <li key={index}>{allergen.toUpperCase()}</li>
                            ))}
                          </ul>
                        </>
                      ) : (
                        <p>No allergens information available.</p>
                      )}



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
