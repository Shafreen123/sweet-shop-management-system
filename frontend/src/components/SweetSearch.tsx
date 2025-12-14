import { useState } from 'react';

interface SweetSearchProps {
  onSearch: (params: any) => void;
}

const SweetSearch = ({ onSearch }: SweetSearchProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    const params: any = {};
    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    onSearch(params);
  };

  const handleReset = () => {
    setName('');
    setCategory('');
    setMinPrice('');
    setMaxPrice('');
    onSearch({});
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Search & Filter Sweets 🍭</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value)}
        style={{ marginRight: 10 }}
      />
      <button onClick={handleSearch} style={{ marginRight: 10 }}>
        Search
      </button>
      <button onClick={handleReset}>Reset</button>
    </div>
  );
};

export default SweetSearch;
