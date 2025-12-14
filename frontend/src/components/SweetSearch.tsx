import { useState } from 'react';

interface SweetSearchProps {
  onSearch: (params: any) => void;
}

const SweetSearch = ({ onSearch }: SweetSearchProps) => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [minPrice, setMinPrice] = useState<number | ''>('');
  const [maxPrice, setMaxPrice] = useState<number | ''>('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      name: name || undefined,
      category: category || undefined,
      minPrice: minPrice !== '' ? minPrice : undefined,
      maxPrice: maxPrice !== '' ? maxPrice : undefined,
    });
  };

  return (
    <form onSubmit={handleSearch} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Name"
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
        onChange={(e) => setMinPrice(e.target.value ? Number(e.target.value) : '')}
      />
      <input
        type="number"
        placeholder="Max Price"
        value={maxPrice}
        onChange={(e) => setMaxPrice(e.target.value ? Number(e.target.value) : '')}
      />
      <button type="submit">Search</button>
    </form>
  );
};

export default SweetSearch;
