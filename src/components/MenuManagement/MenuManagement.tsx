"use client";

import React, { useState } from "react";

// Define the structure for a menu item
type MenuItem = {
  id: number;
  name: string;
  price: number;
  description: string;
  category?: string;
  imageUrl?: string;
  nutritionalFacts: string;
  allergens: string;
};

export const MenuManagement = () => {
  // Hardcoded sample menu items
  const [menuItems, setMenuItems] = useState<MenuItem[]>([
    {
      id: 1,
      name: "Chicken, Pork, or Vegetable Dumpling (6pcs)",
      price: 6.95,
      description:
        "Six traditional Korean dumplings, filled with your choice of chicken, pork or vegetables.",
      imageUrl: "menu1",
      nutritionalFacts:
        "Chicken Dumplings: ~250 kcal, 15g protein, 9g fat, 30g carbs. Pork Dumplings: ~290 kcal, 13g protein, 13g fat, 29g carbs. Vegetable Dumplings: ~210 kcal, 9g protein, 7g fat, 33g carbs.",
      allergens: "Wheat (gluten), soy, egg, optional sesame",
    },
    {
      id: 2,
      name: "Vegetarian Spring Rolls (5pcs)",
      price: 6.95,
      description: "Five traditional vegetarian spring rolls.",
      imageUrl: "menu2",
      nutritionalFacts:
        "Calories: ~200-250 kcal, Protein: 4-6g, Fat: 8-10g, Carbohydrates: 30-35g, Sodium: ~400-500mg.",
      allergens:
        "Wheat (gluten), soy, cross-contamination with peanuts, sesame, shellfish",
    },
    {
      id: 3,
      name: "Sundubu Jjigae",
      price: 17.95,
      description: "Spicy soft tofu stew with seafood or beef.",
      imageUrl: "menu3",
      nutritionalFacts:
        "Seafood: ~250-300 kcal, 20-25g protein, 10-12g fat, 12-15g carbs. Beef: ~300-350 kcal, 25-30g protein, 15-18g fat, 12-15g carbs.",
      allergens: "Soy (tofu), shellfish/fish (seafood), wheat (soy sauce), sesame",
    },
    {
      id: 4,
      name: "Kimchi Jjigae",
      price: 17.95,
      description: "Spicy stew made with aged kimchi, pork, and tofu.",
      imageUrl: "menu4",
      nutritionalFacts:
        "~300-350 kcal, ~20-25g protein, ~15-18g fat, ~15-20g carbs.",
      allergens: "Soy (tofu), wheat (soy sauce), fish (anchovy stock)",
    },
    {
      id: 5,
      name: "Gamjatang",
      price: 16.95,
      description: "Pork back bone & potato soup with vegetables.",
      imageUrl: "menu5",
      nutritionalFacts:
        "~400-450 kcal, ~25-30g protein, ~15-20g fat, ~25-30g carbs.",
      allergens: "Soy (sauces), sesame, wheat (seasonings)",
    },
    {
      id: 6,
      name: "Soondae Gukbob",
      price: 18.95,
      description:
        "Spicy pork broth soup with house-made Korean pork sausage.",
      imageUrl: "menu6",
      nutritionalFacts:
        "~450-500 kcal, ~25-30g protein, ~20-25g fat, ~30-35g carbs.",
      allergens: "Wheat (sausage/seasoning), soy, sesame",
    },
  ]);

  const [newItem, setNewItem] = useState<MenuItem>({
    id: 0,
    name: "",
    price: 0,
    description: "",
    category: "",
    imageUrl: "",
    nutritionalFacts: "",
    allergens: "",
  });

  // Handle input changes for the form
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Restrict numbers in the name field
    if (name === "name" && /\d/.test(value)) {
      alert("Item name cannot contain numbers.");
      return;
    }

    // Update newItem state
    if (name === "price") {
      setNewItem({ ...newItem, [name]: value ? Number(value) : 0 });
    } else {
      setNewItem({ ...newItem, [name]: value });
    }
  };

  // Handle adding a new menu item
  const handleAddItem = () => {
    if (!newItem.name || !newItem.price || !newItem.description || !newItem.nutritionalFacts) {
      alert("Please fill out all required fields.");
      return;
    }

    if (newItem.price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    setMenuItems((prev) => [
      ...prev,
      { ...newItem, id: Math.max(0, ...prev.map((item) => item.id)) + 1 },
    ]);
    resetForm();
  };

  // Handle deleting a menu item
  const handleDeleteItem = (id: number) => {
    setMenuItems((prev) => prev.filter((item) => item.id !== id));
  };

  // Handle editing an existing menu item
  const handleEditItem = (item: MenuItem) => {
    setNewItem(item);
  };

  // Handle saving changes to an edited menu item
  const handleSaveEdit = () => {
    if (!newItem.name || !newItem.price || !newItem.description || !newItem.nutritionalFacts) {
      alert("Please fill out all required fields.");
      return;
    }

    if (newItem.price <= 0) {
      alert("Price must be greater than 0.");
      return;
    }

    setMenuItems((prev) =>
      prev.map((item) => (item.id === newItem.id ? newItem : item))
    );
    resetForm();
  };

  // Reset the form to empty values
  const resetForm = () => {
    setNewItem({
      id: 0,
      name: "",
      price: 0,
      description: "",
      category: "",
      imageUrl: "",
      nutritionalFacts: "",
      allergens: "",
    });
  };

  return (
    <div className="p-8 space-y-8 bg-gray-50">
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-800">Menu Management</h1>
        <p className="text-lg text-gray-600">
          Add, Edit, and Remove items from the menu
        </p>
      </div>

      {/* Add/Edit Menu Item Form */}
      <div className="bg-white p-8 rounded-xl shadow-xl max-w-4xl mx-auto">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">
          {newItem.id ? "Edit" : "Add"} Menu Item
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Item Name */}
          <div>
            <label htmlFor="name" className="text-gray-600 font-medium">
              Item Name<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="name"
              value={newItem.name}
              onChange={handleChange}
              placeholder="Enter item name"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="text-gray-600 font-medium">
              Price<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              name="price"
              value={newItem.price || ""}
              onChange={handleChange}
              placeholder="Enter price"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Description */}
          <div className="sm:col-span-2">
            <label htmlFor="description" className="text-gray-600 font-medium">
              Description<span className="text-red-500">*</span>
            </label>
            <textarea
              name="description"
              value={newItem.description}
              onChange={handleChange}
              placeholder="Enter item description"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-gray-600 font-medium">
              Category (optional)
            </label>
            <input
              type="text"
              name="category"
              value={newItem.category || ""}
              onChange={handleChange}
              placeholder="Enter category"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          {/* Allergens */}
          <div>
            <label htmlFor="allergens" className="text-gray-600 font-medium">
              Allergens (optional)
            </label>
            <input
              type="text"
              name="allergens"
              value={newItem.allergens || ""}
              onChange={handleChange}
              placeholder="Enter allergens if necessary"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Nutritional Facts */}
          <div className="sm:col-span-2">
            <label htmlFor="nutritionalFacts" className="text-gray-600 font-medium">
              Nutritional Facts<span className="text-red-500">*</span>
            </label>
            <textarea
              name="nutritionalFacts"
              value={newItem.nutritionalFacts}
              onChange={handleChange}
              placeholder="Enter nutritional facts"
              className="mt-2 w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
            ></textarea>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-6 flex justify-center">
          <button
            onClick={newItem.id ? handleSaveEdit : handleAddItem}
            className="bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 transition-colors duration-300"
          >
            {newItem.id ? "Save Changes" : "Add Item"}
          </button>
        </div>
      </div>

      {/* Menu Items List */}
      <div className="space-y-6">
        <h2 className="text-2xl font-medium text-gray-800 mb-6">Menu Items</h2>
        {menuItems.length === 0 ? (
          <p className="text-gray-500">
            No menu items added yet. Add a new item above!
          </p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {menuItems.map((item) => (
              <div
                key={item.id}
                className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-start hover:shadow-xl transition-shadow duration-200"
              >
                <h3 className="font-semibold text-xl text-gray-800">
                  {item.name}
                </h3>
                <p className="text-sm text-gray-600">
                  ${Number(item.price).toFixed(2)}
                </p>
                <p className="text-sm text-gray-500">
                  Nutritional Facts: {item.nutritionalFacts}
                </p>
                <p className="text-gray-600">{item.description}</p>
                <div className="mt-4 flex justify-between space-x-2">
                  <button
                    onClick={() => handleEditItem(item)}
                    className="px-3 py-2 bg-blue-500 text-white rounded-md"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteItem(item.id)}
                    className="px-3 py-2 bg-red-500 text-white rounded-md"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MenuManagement;
