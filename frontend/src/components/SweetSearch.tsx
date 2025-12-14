import { useState } from 'react';

interface Props {
  onSearch: (params: any) => void;
}

const SweetSearch = ({ onSearch }: Props) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSearch = () => {
    onSearch({
      name,
      category,
      minPrice,
      maxPrice,
    });
  };

  return (
    <div style={{ marginBottom: 20 }}>
      <h3>Search & Filter 🍭</h3>

      <input
        placeholder="Name"
        value={name}
        onChange={e => setName(e.target.value)}
      />

      <input
        placeholder="Category"
        value={category}
        onChange={e => setCategory(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={e => setMinPrice(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={e => setMaxPrice(e.target.value)}
        style={{ marginLeft: 10 }}
      />

      <button onClick={handleSearch} style={{ marginLeft: 10 }}>
        Search
      </button>
    </div>
  );
};

export default SweetSearch;
