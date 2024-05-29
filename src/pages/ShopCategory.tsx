import React from "react";

export interface IShopCategory {
  category: string;
}

const ShopCategory: React.FC<IShopCategory> = ({ category }) => {
  return <div>{category}</div>;
};

export default ShopCategory;
