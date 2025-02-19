import React, { useState } from 'react';
import { BiSearch } from 'react-icons/bi';
import { DateObject } from 'react-multi-date-picker';
import * as Popover from '@radix-ui/react-popover';
import { Calendar } from 'react-multi-date-picker';

const HomeSearchBar = ({handleFilters}:{handleFilters: ({location, dateRange, guests}:{
  location: string,
  dateRange: {start: string, end: string},
  guests: Record<string, number>
})=>void}) => {
  const [location, setLocation] = useState('');
  const [values, setValues] = useState([new DateObject()]);
  const [guests, setGuests] = useState< Record<string, number>>({
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

  const updateGuests = (type: string, operation: "add"|"subtract") => {
    setGuests(prev => ({
      ...prev,
      [type]: operation === 'add' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };
  const totalGuests = Object.values(guests).reduce((acc, curr) => acc + curr, 0);

  React.useEffect(() => {
    handleFilters({location, dateRange: {
      start: values[0]?.format('YYYY-MM-DD'),
      end: values[1]?.format('YYYY-MM-DD')
    }, guests});
  }, [location, values, guests]);

  return (
    <div className="w-full border max-w-4xl mx-auto bg-white rounded-full shadow-lg p-2 flex items-center">
        <Popover.Root>
          <Popover.Trigger className="flex-1 w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none">
            <div className="text-sm font-semibold">Where</div>
            <input
              type="text"
              placeholder="Search destinations"
              className="w-full text-gray-600 focus:outline-none bg-transparent"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </Popover.Trigger>
          <Popover.Content className="mt-2 w-96 bg-white rounded-2xl shadow-xl p-6 z-50">
            <div className="mb-4">
              <h3 className="text-lg font-semibold mb-2">Nearby</h3>
              <p className="text-gray-500">Find what's around you</p>
            </div>
            <div className="space-y-4">
              {suggestedDestinations.map((dest, index) => (
                <div onClick={()=>setLocation(dest.city)} key={index} className="flex items-center space-x-3 p-2 hover:bg-gray-100 rounded-lg cursor-pointer">
                  <span className="text-2xl">{dest.icon}</span>
                  <div>
                    <div className="font-medium">{dest.city}</div>
                    <div className="text-sm text-gray-500">{dest.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </Popover.Content>
        </Popover.Root>

        <Popover.Root>
          <Popover.Trigger className="flex-1 w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none">
            <div className="text-sm font-semibold">Check in</div>
            <div className="text-gray-600">{values[0] ? values[0].format('MMMM DD, YYYY') : 'Add date'}</div>
          </Popover.Trigger>
          <Popover.Content className="mt-2 w-full bg-white rounded-2xl shadow-xl p-6 z-50">
              <Calendar
                value={values}
                onChange={setValues}
                range
                rangeHover
                numberOfMonths={2}
                className='w-full'
                // @ts-ignore
                style={{ 
                  boxShadow: 'none',
                  border: 'none',
                  borderRadius: 0,
                  background: 'transparent',
                }}
              />
          </Popover.Content>
        </Popover.Root>


        <Popover.Root>
          <Popover.Trigger className="flex-1 w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none">
            <div className="text-sm font-semibold">Check Out</div>
            <div className="text-gray-600">{values[1] ? values[1].format('MMMM DD, YYYY') : 'Add date'}</div>
          </Popover.Trigger>
          <Popover.Content className="mt-2 w-full bg-white rounded-2xl shadow-xl p-6 z-50">
              <Calendar
                value={values}
                onChange={setValues}
                range
                rangeHover
                numberOfMonths={2}
                className='w-full'
                // @ts-ignore
                style={{ 
                  boxShadow: 'none',
                  border: 'none',
                  borderRadius: 0,
                  background: 'transparent',
                }}
              />
          </Popover.Content>
        </Popover.Root>

        <Popover.Root>
          <Popover.Trigger className="flex-1 w-full px-6 py-2 text-left hover:bg-gray-100 rounded-full focus:outline-none">
            <div className="text-sm font-semibold">Who</div>
            <div className="text-gray-600">{
              totalGuests > 0 ? 
                Object.entries(guests).filter(([type, count]) => count > 0).map(([type, count]) => (
                  `${count} ${type}${count > 1 ? 's' : ''}`
                )).join(', ')
               : 'Add guests'
              }</div>
          </Popover.Trigger>
          <Popover.Content className="absolute top-full right-0 mt-2 w-96 bg-white rounded-2xl shadow-xl p-6 z-50">
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
          </Popover.Content>
        </Popover.Root>

        <button className="bg-blue-500 text-white p-4 rounded-full hover:bg-blue-600 focus:outline-none flex gap-2 items-center justify-center">
          <BiSearch className="w-5 h-5" />
          <span>Search</span>
        </button>
    </div>
  );
};

export default HomeSearchBar;
