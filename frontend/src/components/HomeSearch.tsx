import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';

const SearchBar = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [location, setLocation] = useState('');
  const [dates, setDates] = useState({ checkIn: '', checkOut: '' });
  const [guests, setGuests] = useState({
    adults: 0,
    children: 0,
    infants: 0,
    pets: 0
  });

  const suggestedDestinations = [
    {
      city: 'Nairobi, Kenya',
      description: 'For sights like Uhuru Park',
      icon: '🏛️'
    },
    {
      city: 'Dar es Salaam, Tanzania',
      description: 'For a trip abroad',
      icon: '🌊'
    },
    {
      city: 'Gisenyi, Rwanda',
      description: 'Known for its lakes',
      icon: '🏖️'
    },
    {
      city: 'Mombasa, Kenya',
      description: 'For its seaside allure',
      icon: '🏖️'
    }
  ];

  const toggleDropdown = (dropdown) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const updateGuests = (type, operation) => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="relative bg-white rounded-full shadow-lg p-2 flex items-center">
        {/* Location Section */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleDropdown('location')}
            className="w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none"
          >
            <div className="text-sm font-semibold">Where</div>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full text-gray-600 focus:outline-none bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </button>
          
          {activeDropdown === 'location' && (
            <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-xl p-6 z-50">
              <div className="mb-4">
                <h3 className="text-lg font-semibold mb-2">Nearby</h3>
                <p className="text-gray-500">Find what's around you</p>
              </div>
              <div className="space-y-4">
                {suggestedDestinations.map((dest, index) => (
                  <div key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                    <span className="text-2xl">{dest.icon}</span>
                    <div>
                      <div className="font-medium">{dest.city}</div>
                      <div className="text-sm text-gray-500">{dest.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Dates Section */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleDropdown('dates')}
            className="w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none"
          >
            <div className="text-sm font-semibold">Check in</div>
            <div className="text-gray-600">Add dates</div>
          </button>
          
          {activeDropdown === 'dates' && (
            <div className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-xl p-6 z-50">
              <div className="flex space-x-4 mb-4">
                <button className="px-4 py-2 bg-gray-100 rounded-full text-sm font-medium">Dates</button>
                <button className="px-4 py-2 rounded-full text-sm">Months</button>
                <button className="px-4 py-2 rounded-full text-sm">Flexible</button>
              </div>
              <div className="grid grid-cols-2 gap-8">
                {/* Calendar would go here */}
                <div className="text-center text-gray-400">Calendar functionality to be implemented</div>
              </div>
            </div>
          )}
        </div>

        {/* Guests Section */}
        <div className="flex-1 relative">
          <button
            onClick={() => toggleDropdown('guests')}
            className="w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none"
          >
            <div className="text-sm font-semibold">Who</div>
            <div className="text-gray-600">Add guests</div>
          </button>
          
          {activeDropdown === 'guests' && (
            <div className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl p-6 z-50">
              {Object.entries({
                'Adults': 'Ages 13 or above',
                'Children': 'Ages 2-12',
                'Infants': 'Under 2',
                'Pets': 'Bringing a service animal?'
              }).map(([type, description]) => (
                <div key={type} className="flex items-center justify-between py-4 border-b">
                  <div>
                    <div className="font-medium">{type}</div>
                    <div className="text-sm text-gray-500">{description}</div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => updateGuests(type.toLowerCase(), 'subtract')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      -
                    </button>
                    <span>{guests[type.toLowerCase()]}</span>
                    <button
                      onClick={() => updateGuests(type.toLowerCase(), 'add')}
                      className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:border-gray-400"
                    >
                      +
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="bg-pink-500 text-white p-4 rounded-full hover:bg-pink-600 focus:outline-none flex items-center justify-center">
          <BiSearch className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;