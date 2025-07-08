import React, { useState, useEffect } from 'react';

const PriceComparisonTable = ({ ingredients }) => {
  const [priceData, setPriceData] = useState({});
  const [loading, setLoading] = useState(false);

  // Mock data for popular markets - in a real app, this would come from an API
  const markets = [
    { name: 'Walmart', color: 'blue', icon: '🛒', type: 'Budget' },
    { name: 'Target', color: 'red', icon: '🎯', type: 'Value' },
    { name: 'Kroger', color: 'green', icon: '🥬', type: 'Standard' },
    { name: 'Safeway', color: 'orange', icon: '🛍️', type: 'Standard' },
    { name: 'Whole Foods', color: 'emerald', icon: '🌱', type: 'Premium' },
    { name: 'Trader Joe\'s', color: 'yellow', icon: '🏪', type: 'Value' },
    { name: 'Costco', color: 'purple', icon: '📦', type: 'Bulk' },
    { name: 'Albertsons', color: 'indigo', icon: '🏬', type: 'Standard' },
    { name: 'Publix', color: 'teal', icon: '🛒', type: 'Premium' },
    { name: 'Meijer', color: 'pink', icon: '🛍️', type: 'Value' },
    { name: 'Food Lion', color: 'lime', icon: '🦁', type: 'Budget' },
    { name: 'Aldi', color: 'amber', icon: '💰', type: 'Budget' }
  ];

  // Generate mock price data for ingredients
  useEffect(() => {
    if (ingredients.length === 0) return;

    setLoading(true);
    
    // Simulate API call delay
    const timer = setTimeout(() => {
      const mockPrices = {};
      
      ingredients.forEach(ingredient => {
        const basePrice = Math.random() * 5 + 1; // Random price between $1-$6
        
        // Define price multipliers for different store types
        const storePriceMultipliers = {
          'Walmart': 0.85, // Generally lower prices
          'Target': 0.95, // Slightly lower than average
          'Kroger': 1.0, // Average price
          'Safeway': 1.05, // Slightly higher
          'Whole Foods': 1.4, // Premium prices
          'Trader Joe\'s': 0.9, // Good value
          'Costco': 0.75, // Bulk pricing, lower per unit
          'Albertsons': 1.1, // Slightly higher
          'Publix': 1.15, // Higher end
          'Meijer': 0.9, // Good value
          'Food Lion': 0.8, // Budget-friendly
          'Aldi': 0.7 // Very budget-friendly
        };
        
        mockPrices[ingredient.name] = markets.map(market => {
          const multiplier = storePriceMultipliers[market.name] || 1.0;
          const adjustedBasePrice = basePrice * multiplier;
          const variation = 0.9 + Math.random() * 0.2; // ±10% variation
          const finalPrice = adjustedBasePrice * variation;
          
          return {
            market: market.name,
            price: finalPrice.toFixed(2),
            unit: 'lb', // Default unit
            inStock: Math.random() > 0.1 // 90% chance of being in stock
          };
        });
      });
      
      setPriceData(mockPrices);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ingredients]);

  if (ingredients.length === 0) {
    return null;
  }

  const getLowestPrice = (prices) => {
    return Math.min(...prices.map(p => parseFloat(p.price)));
  };

  const getHighestPrice = (prices) => {
    return Math.max(...prices.map(p => parseFloat(p.price)));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 px-6 py-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
          </svg>
          Price Comparison
        </h2>
        <p className="text-sm text-gray-600 mt-1">Compare prices across popular markets</p>
        <div className="flex items-center gap-2 mt-2">
          <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="text-xs text-blue-600">Scroll to see all markets</span>
        </div>
      </div>

      <div className="p-6">
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-3 text-gray-600">Loading price data...</span>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 px-4 font-medium text-gray-700 sticky left-0 bg-white z-10">Ingredient</th>
                  {markets.map(market => (
                    <th key={market.name} className="text-center py-3 px-2 font-medium text-gray-700 min-w-[80px]">
                      <div className="flex flex-col items-center">
                        <span className="text-lg">{market.icon}</span>
                        <span className="text-xs mt-1 leading-tight">{market.name}</span>
                        <span className={`text-xs mt-1 px-1 py-0.5 rounded-full ${
                          market.type === 'Budget' ? 'bg-green-100 text-green-700' :
                          market.type === 'Value' ? 'bg-blue-100 text-blue-700' :
                          market.type === 'Premium' ? 'bg-purple-100 text-purple-700' :
                          market.type === 'Bulk' ? 'bg-orange-100 text-orange-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {market.type}
                        </span>
                      </div>
                    </th>
                  ))}
                  <th className="text-center py-3 px-4 font-medium text-gray-700 sticky right-0 bg-white z-10">Best Deal</th>
                </tr>
              </thead>
              <tbody>
                {ingredients.map((ingredient, index) => {
                  const prices = priceData[ingredient.name] || [];
                  const lowestPrice = getLowestPrice(prices);
                  const highestPrice = getHighestPrice(prices);
                  
                  return (
                    <tr key={ingredient.name} className={`border-b border-gray-100 ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                      <td className="py-3 px-4 sticky left-0 bg-inherit z-10">
                        <span className="font-medium text-gray-800">{ingredient.name}</span>
                      </td>
                      {markets.map(market => {
                        const priceInfo = prices.find(p => p.market === market.name);
                        const price = priceInfo ? parseFloat(priceInfo.price) : null;
                        const isLowest = price === lowestPrice;
                        const isHighest = price === highestPrice;
                        
                        return (
                          <td key={market.name} className="text-center py-3 px-2">
                            {priceInfo ? (
                              <div className="flex flex-col items-center">
                                <span className={`font-semibold ${
                                  isLowest ? 'text-green-600' : 
                                  isHighest ? 'text-red-600' : 
                                  'text-gray-800'
                                }`}>
                                  ${priceInfo.price}
                                </span>
                                <span className="text-xs text-gray-500">{priceInfo.unit}</span>
                                {!priceInfo.inStock && (
                                  <span className="text-xs text-red-500 mt-1">Out of stock</span>
                                )}
                              </div>
                            ) : (
                              <span className="text-gray-400 text-sm">-</span>
                            )}
                          </td>
                        );
                      })}
                      <td className="text-center py-3 px-4 sticky right-0 bg-inherit z-10">
                        {prices.length > 0 && (
                          <div className="flex flex-col items-center">
                            <span className="font-semibold text-green-600">
                              ${lowestPrice.toFixed(2)}
                            </span>
                            <span className="text-xs text-gray-500">
                              {prices.find(p => parseFloat(p.price) === lowestPrice)?.market}
                            </span>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Summary */}
        {!loading && ingredients.length > 0 && (
          <div className="mt-6 p-4 bg-gray-50 rounded-lg">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-600">Total Items</p>
                <p className="text-lg font-semibold text-gray-800">{ingredients.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Estimated Total</p>
                <p className="text-lg font-semibold text-blue-600">
                  ${ingredients.reduce((total, ingredient) => {
                    const prices = priceData[ingredient.name] || [];
                    const lowestPrice = prices.length > 0 ? getLowestPrice(prices) : 0;
                    return total + lowestPrice;
                  }, 0).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Potential Savings</p>
                <p className="text-lg font-semibold text-green-600">
                  ${ingredients.reduce((total, ingredient) => {
                    const prices = priceData[ingredient.name] || [];
                    if (prices.length === 0) return total;
                    const lowestPrice = getLowestPrice(prices);
                    const highestPrice = getHighestPrice(prices);
                    return total + (highestPrice - lowestPrice);
                  }, 0).toFixed(2)}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PriceComparisonTable; 