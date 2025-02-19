import React from 'react';
import { EStatus, IProperty } from '../types/properties';
import { BiChevronLeft, BiChevronRight, BiHeart } from 'react-icons/bi';

const DEFAULT_IMAGE = "https://cornerstonepropertymgmt.com/wp-content/themes/cornerstone/assets/img/nofeaturedimage.jpg";

const HomePropertyCard = ({ property }: { property: IProperty }) => {
  const [isFavorite, setIsFavorite] = React.useState(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);
  const [isTransitioning, setIsTransitioning] = React.useState(false);
  const [failedImages, setFailedImages] = React.useState<Set<number>>(new Set());

  const handleImageError = (index: number) => {
    setFailedImages(prev => new Set([...prev, index]));
  };

  const handleNextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning || !property.images?.length) return;
    
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev + 1) % property.images!.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const handlePrevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isTransitioning || !property.images?.length) return;
    
    setIsTransitioning(true);
    setCurrentImageIndex((prev) => (prev - 1 + property.images!.length) % property.images!.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const hasImages = property.images && property.images.length > 0;


  return (
    <div className="relative group">
      <div className="overflow-hidden rounded-xl aspect-square">
        {hasImages ? (
          <div className="relative w-full h-full">
            {failedImages.has(currentImageIndex) ? (
              <img 
                src={DEFAULT_IMAGE}
                alt="No image available"
                className="w-full h-full object-cover"
              />
            ) : (
              <img 
                src={property.images[currentImageIndex]} 
                alt={`${property.title} - Image ${currentImageIndex + 1}`}
                className={`object-cover w-full h-full transition-transform duration-300 ${
                  isTransitioning ? 'scale-105' : 'group-hover:scale-105'
                }`}
                onError={() => handleImageError(currentImageIndex)}
              />
            )}
            {property.images.length > 1 && (
              <>
                <button 
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                  <BiChevronLeft className="w-5 h-5 text-gray-700" />
                </button>
                <button 
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
                >
                  <BiChevronRight className="w-5 h-5 text-gray-700" />
                </button>
              </>
            )}
            
            {property.images.length > 1 && (
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
                {property.images.map((_, index) => (
                  <div
                    key={index}
                    className={`w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
                      currentImageIndex === index ? 'bg-white' : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="w-full h-full bg-gray-100">
            <img 
              src={DEFAULT_IMAGE}
              alt="No image available"
              className="w-full h-full object-cover"
            />
          </div>
        )}
      </div>
      
      <button 
        className="absolute top-3 right-3 text-gray-100 hover:text-blue-500 z-10"
        onClick={() => setIsFavorite(!isFavorite)}
      >
        <BiHeart 
          className={`h-6 w-6 transition-colors ${
            isFavorite ? 'fill-blue-500 text-blue-500' : 'fill-transparent stroke-current'
          }`} 
        />
      </button>
      
      {property.status === EStatus.ACTIVE && (
        <div className="absolute top-3 left-3 bg-white px-2 py-1 rounded-md text-xs font-medium z-10">
          Available
        </div>
      )}
      
      <div className="mt-2">
        <div className="flex justify-between items-start">
          <h3 className="font-medium">{property.title}</h3>
          <div className="flex items-center space-x-1 text-blue-600">
            <span>★</span>
            <span>4.9</span>
          </div>
        </div>
        <p className="text-gray-500 text-sm">{property.location}</p>
        <p className="text-gray-500 text-sm">{property.propertyType}</p>
        <p className="font-medium mt-1">${property.pricePerNight} <span className="font-normal text-gray-500">night</span></p>
      </div>
    </div>
  );
};

export default HomePropertyCard;