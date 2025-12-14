import { useState } from 'react';

interface SweetSearchProps {
  onSearch: (params: any) => void;
}

const SweetSearch = ({ onSearch }: SweetSearchProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const handleSearch = () => {
    const params: any = {};
    if (name) params.name = name;
    if (category) params.category = category;
    if (minPrice !== '') params.minPrice = minPrice;
    if (maxPrice !== '') params.maxPrice = maxPrice;

    onSearch(params);
  };

  return (
    <div
      style={{
        display: 'flex',
        gap: 10,
        flexWrap: 'wrap',
        marginBottom: 20,
        padding: 10,
        border: '1px solid #ccc',
        borderRadius: 8,
        backgroundColor: '#f1f1f1',
      }}
    >
      <input
        type="text"
        placeholder="Search by name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <input
        type="number"
        placeholder="Min Price"
        value={minPrice}
        onChange={(e) => setMinPrice(Number(e.target.value))}
        min={0}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(Number(e.target.value))}
        min={0}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '6px 12px', backgroundColor: '#4caf50', color: '#fff', border: 'none', borderRadius: 4 }}
      >
        Search
      </button>
    </div>
  );
};

export default SweetSearch;
