import React from "react";
import {
  Menu, // 🍔 burger
  Search, // 🔍 loupe
  User, // 👤 utilisateur
  Heart, // ❤️ favori
  ShoppingBag, // 🛍️ panier
} from "lucide-react";

const ClothingStore = () => {
  return (
    <div className="clothing-store">
      <header>
        <div className="menu-left">
          <div id="menu">
            <Menu />
          </div>
          <div className="NameBrand">
            <h1>ClothingStore</h1>
          </div>
        </div>
        <div className="menu-right">
          <div className="search">
            <input
              type="search"
              placeholder="Search by product, collection..."
            />
            <Search id="iconSearch" />
          </div>
          <div className="three-icons">
            <User />
            <Heart />
            <ShoppingBag />
          </div>
        </div>
      </header>
    </div>
  );
};

export default ClothingStore;
