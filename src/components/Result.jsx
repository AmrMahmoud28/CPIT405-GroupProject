import React from "react";

const Result = ({ payload }) => {

  const allergenMapping = {
    Milk: ['Milk', 'Lactose', 'Skimmed Milk Powder', 'Milk Fat', 'Whey Powder', 'Cheese', 'Butter', 'Cream', 'Yogurt'],
    Eggs: ['Eggs', 'Egg White Powder', 'Egg Yolk', 'Albumin', 'Lysozyme'],
    Wheat: ['Wheat', 'Wheat Flour', 'Whole Wheat Flour', 'Barley', 'Rye', 'Oats', 'Triticale', 'Spelt'],
    Soy: ['Soy', 'Soy Lecithin', 'Soy Flour', 'Soy Protein', 'Edamame', 'Tofu'],
    Nuts: ['Almonds', 'Hazelnuts', 'Cashews', 'Walnuts', 'Nut Oils', 'Nut Butters', 'Pecans', 'Macadamia Nuts', 'Brazil Nuts', 'Pine Nuts'],
    Peanuts: ['Peanuts', 'Peanut Oil', 'Groundnuts', 'Arachis Oil'],
    Fish: ['Fish', 'Fish Oil', 'Anchovy Extract', 'Cod', 'Tuna', 'Salmon', 'Haddock'],
    Shellfish: ['Shrimp', 'Crab', 'Lobster', 'Scallops', 'Clams', 'Mussels'],
    Sesame: ['Sesame Seeds', 'Sesame Oil', 'Tahini'],
    Mustard: ['Mustard Seeds', 'Mustard Powder', 'Prepared Mustard'],
    Celery: ['Celery', 'Celery Root', 'Celery Salt', 'Celeriac'],
    Lupin: ['Lupin Flour', 'Lupin Seeds', 'Lupini Beans'],
    Sulfites: ['Sodium Bisulfite', 'Sulfur Dioxide', 'Sulfites', 'Potassium Metabisulfite'],
    Mollusks: ['Octopus', 'Squid', 'Snails', 'Clams', 'Oysters'],
    Corn: ['Corn', 'Corn Starch', 'Corn Syrup', 'Popcorn', 'Masa Flour'],
    Gluten: ['Wheat', 'Barley', 'Rye', 'Spelt', 'Triticale', 'Semolina'],
    TreeNuts: ['Chestnuts', 'Beechnuts', 'Coconut', 'Shea Nuts']
};


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
            <h2 className="halal">{`${isHalal ? "Halal" : "Haram"}`}</h2>
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
