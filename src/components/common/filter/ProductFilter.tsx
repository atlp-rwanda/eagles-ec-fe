import React, { useState, useEffect } from "react";
import { TextField } from "@mui/material";

import { ICategory, IProduct } from "../../../types";

interface IProductFilterProps {
  products: IProduct[];
  onFilter: (filteredProducts: IProduct[]) => void;
}

const priceRanges = [
  { label: "All", value: [0, Infinity] },
  { label: "30000 RWF - 60000 RWF", value: [30000, 60000] },
  { label: "60000 RWF - 90000 RWF", value: [60000, 90000] },
  { label: "90000 RWF - 120000 RWF", value: [90000, 120000] },
];

const ProductFilter: React.FC<IProductFilterProps> = ({
  products,
  onFilter,
}) => {
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    if (products) {
      const categorySet = new Set<ICategory>();
      products.forEach((product) => {
        categorySet.add(product.category);
      });
      const filteredCategories: ICategory[] = Array.from(categorySet);

      const uniqueCategories = filteredCategories.filter(
        (category, index, self) => self.findIndex(
          (otherCategory) => otherCategory.id === category.id,
        ) === index,
      );

      setCategories(uniqueCategories);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const filterProducts = () => {
      const filtered = products.filter(
        (product) => product.name.toLowerCase().includes(query.toLowerCase())
          && product.price >= priceRange[0]
          && product.price <= priceRange[1]
          && (selectedCategories.length === 0
            || selectedCategories.includes(product.category.name)),
      );

      if (sort === "priceLowToHigh") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (sort === "priceHighToLow") {
        filtered.sort((a, b) => b.price - a.price);
      }

      onFilter(filtered);
    };

    filterProducts();
  }, [query, sort, priceRange, selectedCategories, products]);

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSort(event.target.value);
  };

  const handlePriceRangeChange = (range: [number, number]) => {
    setPriceRange(range);
  };

  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const { options } = event.target;
    const selected: string[] = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setSelectedCategories(selected);
  };

  return (
    <div className="filters p-4">
      <div className="flex flex-wrap justify-between">
        <div className="space-y-2">
          <h5 className="text-lg" data-testid="SORT BY">
            SORT BY
          </h5>
          <div>
            <label>
              <input
                type="radio"
                className="mr-1"
                value="popularity"
                checked={sort === "popularity"}
                onChange={handleSortChange}
              />
              Popularity
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="mr-1"
                value="newness"
                checked={sort === "newness"}
                onChange={handleSortChange}
              />
              Newness
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="mr-1"
                value="priceLowToHigh"
                checked={sort === "priceLowToHigh"}
                onChange={handleSortChange}
              />
              Price: Low to high
            </label>
            <br />
            <label>
              <input
                type="radio"
                className="mr-1"
                value="priceHighToLow"
                checked={sort === "priceHighToLow"}
                onChange={handleSortChange}
              />
              Price: High to low
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-lg" data-testid="PRICE FILTER">
            PRICE FILTER
          </h5>
          <div className="flex flex-col">
            {priceRanges.map((range) => (
              <label key={range.label}>
                <input
                  type="checkbox"
                  className="mr-1"
                  // hidden
                  checked={
                    priceRange[0] === range.value[0]
                    && priceRange[1] === range.value[1]
                  }
                  onChange={() => handlePriceRangeChange([range.value[0], range.value[1]])}
                />
                {range.label}
              </label>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <h5 className="text-lg" data-testid="Filter By Category">
            Filter By Category
          </h5>
          {isLoading && <p>Loading categories...</p>}
          {isError && <p>Error fetching categories</p>}
          <select
            multiple
            value={selectedCategories}
            className=" w-full "
            onChange={handleCategoryChange}
          >
            {categories.map((category, i) => (
              <option key={i} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
          {/* <TextField select size="small"
             value={selectedCategories}
             className="w-[200px]"
             onChange={handleCategoryChange}>
            <option value="">All</option>
            {categories.map((category,i) => (
              <option key={i} value={category.name}>
                {category.name}
              </option>
            ))}
          </TextField> */}
        </div>
      </div>
    </div>
  );
};

export default ProductFilter;
