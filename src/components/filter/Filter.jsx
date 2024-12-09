import React, { useContext } from 'react';
import myContext from '../../context/data/myContext';

function Filter() {
    const context = useContext(myContext);
    const { mode, searchKey, setSearchkey, filterType, setFilterType, filterPrice, setFilterPrice, product } = context;

    const uniqueCategories = [...new Set(product.map(item => item.category))];
    const uniquePrices = [...new Set(product.map(item => item.price))];

    const inputStyle = {
        backgroundColor: mode === 'dark' ? 'rgb(64 66 70)' : '',
        color: mode === 'dark' ? 'white' : '',
    };

    const resetFilters = () => {
        setSearchkey('');
        setFilterType('');
        setFilterPrice('');
    };

    return (
        <div className='container mx-auto px-4 mt-5'>
            <div className="p-5 rounded-lg bg-gray-100 drop-shadow-xl border border-gray-200"
                style={{
                    backgroundColor: mode === 'dark' ? '#282c34' : '',
                    color: mode === 'dark' ? 'white' : '',
                }}>
                <div className="relative">
                    <div className="absolute flex items-center ml-2 h-full">
                        {/* Search Icon */}
                    </div>
                    <input
                        type="text"
                        name="searchkey"
                        value={searchKey}
                        onChange={(e) => setSearchkey(e.target.value)}
                        id="searchkey"
                        placeholder="Search here"
                        className="px-8 py-3 w-full rounded-md bg-violet-0 border-transparent outline-0 text-sm"
                        style={inputStyle}
                    />
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="font-medium">Filters</p>
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-200 text-gray-800 text-sm font-medium rounded-md"
                        style={{ color: mode === 'dark' ? 'white' : '' }}
                        onClick={resetFilters}>
                        Reset Filter
                    </button>
                </div>
                <div>
                    <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 mt-4">
                        <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="px-4 py-3 w-full rounded-md bg-gray-50 border-transparent outline-0 focus:border-gray-500 focus:bg-white focus:ring-0 text-sm" style={inputStyle}>
                            <option value="">All Categories</option>
                            {uniqueCategories.map((category, index) => (
                                <option key={`${category}-${index}`} value={category}>{category}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filter;
