import React, { useState } from "react";

const ProductCard = ({
  productName,
  imageUrl,
  isHalal,
  allergens,
  nutriscoreData,
  isHistory,
  status,
}) => {
  const [isImageCovered, setIsImageCovered] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className={`cardWrapperHover`}>
      <div
        className={`card ${isHistory ? " historyCursor" : ""} ${
          isFlipped ? "flipped" : ""
        }`}
      >
        {status === 0 ? (
          <div className="cardContent">
            <h1 className="name">Product not found</h1>
          </div>
        ) : (
          <>
            <div
              className="frontFace"
              onClick={
                isHistory
                  ? () => {
                      setIsExpanded(!isExpanded);
                    }
                  : undefined
              }
            >
              <div className="imageContent">
                <div
                  className="cardImage"
                  onDoubleClick={() => setIsImageCovered(!isImageCovered)}
                >
                  <img
                    src={imageUrl}
                    alt={productName}
                    className={`cardImg${isImageCovered ? " cover" : ""}`}
                  />
                </div>
              </div>
              <div className="cardContent">
                <h1 className="name">
                  {!isHistory || isExpanded
                    ? productName
                    : truncateText(productName, 30)}
                </h1>
                <h2 className={`halal${isHalal ? "" : " not"}`}>
                  {isHalal ? "Halal" : "Haram"}
                </h2>
                {!isHistory || isExpanded ? (
                  <>
                    <div className="allergens">
                      <h2>Might Contain:</h2>
                      <ul>
                        {allergens.map((allergen, index) => (
                          <li key={index}>{allergen.toUpperCase()}</li>
                        ))}
                      </ul>
                    </div>
                  </>
                ) : null}
                <button
                  className="button"
                  onClick={(event) => {
                    event.stopPropagation();
                    setIsFlipped(true);
                  }}
                >
                  View Nutrition
                </button>
              </div>
            </div>
            <div className="backFace" onClick={() => setIsFlipped(false)}>
              {nutriscoreData && Object.keys(nutriscoreData).length >= 8 ? (
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
  );
};

export default ProductCard;
