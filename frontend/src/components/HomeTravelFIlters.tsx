import React from 'react'
import HomeSearchBar from './HomeSearch';

export default function HomeTravelFIlters({handleFilters}: {handleFilters?: ({category, location, dateRange, guests}:{category?: string, location?: string,
    dateRange?: {start: string, end: string},
    guests?: Record<string, number>}) => void}) {
    const [activeCategory, setActiveCategory] = React.useState('APARTMENT');
    const [otherFilters, setOtherFilters] = React.useState<{
        location: string;
        dateRange: {
            start: string;
            end: string;
        };
        guests: Record<string, number>;
    }>();

    React.useEffect(() => {
        handleFilters && handleFilters({category: activeCategory, ...otherFilters});
    }, [activeCategory, otherFilters]);

    return (
        <div className="w-full bg-white shadow-sm">
            <HomeSearchBar handleFilters={(filters)=>setOtherFilters(filters)}/>
            <div className="max-w-7xl mx-auto px-4 pt-5 pb-4">
                <div className="flex items-center space-x-8 overflow-x-auto scrollbar-hide pb-4">
                <CategoryButton icon="🏢" label="APARTMENT" active={activeCategory === 'APARTMENT'} onClick={() => setActiveCategory('APARTMENT')} />
                <CategoryButton icon="🏠" label="HOUSE" active={activeCategory === 'HOUSE'} onClick={() => setActiveCategory('HOUSE')} />
                <CategoryButton icon="🛋️" label="STUDIO" active={activeCategory === 'STUDIO'} onClick={() => setActiveCategory('STUDIO')} />
                <CategoryButton icon="🏛️" label="VILLA" active={activeCategory === 'VILLA'} onClick={() => setActiveCategory('VILLA')} />
                <CategoryButton icon="🏙️" label="CONDO" active={activeCategory === 'CONDO'} onClick={() => setActiveCategory('CONDO')} />
                <CategoryButton icon="🏘️" label="TOWNHOUSE" active={activeCategory === 'TOWNHOUSE'} onClick={() => setActiveCategory('TOWNHOUSE')} />
                <CategoryButton icon="🌲" label="CABIN" active={activeCategory === 'CABIN'} onClick={() => setActiveCategory('CABIN')} />
                <CategoryButton icon="🪟" label="LOFT" active={activeCategory === 'LOFT'} onClick={() => setActiveCategory('LOFT')} />
                <CategoryButton icon="🧱" label="COTTAGE" active={activeCategory === 'COTTAGE'} onClick={() => setActiveCategory('COTTAGE')} />
                <CategoryButton icon="🏰" label="MANSION" active={activeCategory === 'MANSION'} onClick={() => setActiveCategory('MANSION')} />
                <CategoryButton icon="🏨" label="HOTEL" active={activeCategory === 'HOTEL'} onClick={() => setActiveCategory('HOTEL')} />
                </div>

                <div className="flex items-center justify-between">
                    <button className="flex items-center space-x-2 px-4 py-2 border rounded-md text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="4" y1="21" x2="4" y2="14" />
                            <line x1="4" y1="10" x2="4" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="12" />
                            <line x1="12" y1="8" x2="12" y2="3" />
                            <line x1="20" y1="21" x2="20" y2="16" />
                            <line x1="20" y1="12" x2="20" y2="3" />
                            <line x1="1" y1="14" x2="7" y2="14" />
                            <line x1="9" y1="8" x2="15" y2="8" />
                            <line x1="17" y1="16" x2="23" y2="16" />
                        </svg>
                        <span>Filters</span>
                    </button>

                </div>
            </div>
        </div>
    );
};

const CategoryButton = ({ icon, label, active = false, onClick }: {
    icon: string;
    label: string;
    active?: boolean;
    onClick?: () => void;
}) => {
    return (
        <button onClick={onClick} className={`flex flex-col items-center justify-center space-y-1 min-w-16 py-2 opacity-80 hover:opacity-100 ${active ? 'border-b-2 border-blue-600 text-blue-600' : 'text-gray-500'}`}>
            <div className="text-center text-xl">{icon}</div>
            <span className="text-xs whitespace-nowrap">{label}</span>
        </button>
    );
};

