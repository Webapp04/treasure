import React from "react";
import "./style.scss";

const MarketplaceButton = ({
  title,
  isGradient,
  isBlue,
  onClick,
  isWhite,
  isNormal,
  disabled = false,
  withShadow,
  isAnimated,
}) => {
  return (
    <div
      onClick={onClick}
      className={`
            marketplaceButton 
			${isGradient ? "marketplaceButton__gradient" : ""} 
			${isWhite ? "marketplaceButton__white" : ""} 
			${isBlue ? "marketplaceButton__blue" : ""}
			${disabled ? "disabledEl" : ""}
			${withShadow ? "marketplaceButton__withShadow" : ""}
			${isAnimated ? "marketplaceButton__isAnimated" : ""}
            ${isNormal ? "marketplaceButton__isNormal" : ""}
			`}
    >
      {title}
    </div>
  );
};

export default MarketplaceButton;
