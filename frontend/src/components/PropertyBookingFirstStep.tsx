"use client"
import useAuth from '@/src/hooks/useAuth';
import { EStatus, IProperty } from '@/src/types/properties';
import { BiGrid } from 'react-icons/bi';
import Button from '@/src/components/ui/Button';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import * as Dialog from '@radix-ui/react-dialog';
import { IoClose } from 'react-icons/io5';
import AuthModel from './ui/AuthModel';
import { useRouter } from 'next/navigation';

interface PropertyBookingProps {
  property?: IProperty;
  onNext: () => void;
}

const PropertyBookingFirstStep: React.FC<PropertyBookingProps> = ({
  property,
  onNext,
}) => {
  const { user: userInfo, isAuthenticated } = useAuth();
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-6">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="relative">
          {property?.images && property?.images?.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 p-2">
              <div className="md:row-span-2 h-64 md:h-96 relative rounded-lg overflow-hidden">
                <img
                  src={property?.images[0]}
                  alt={`${property.title} - Main Image`}
                  className="w-full h-full"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 h-full">
                {property.images.slice(1, 4).map((img, index) => (
                  <div key={index} className="h-32 md:h-48 relative rounded-lg overflow-hidden">
                    <img
                      src={img}
                      alt={`${property.title} - Image ${index + 2}`}
                      className="w-full h-full"
                    />
                  </div>
                ))}

                {property.images.length > 4 && (
                  <MosaicDialog property={property} />
                )}
              </div>
            </div>
          ) : (
            <div className="h-64 bg-gray-200 flex items-center justify-center">
              <p className="text-gray-500">No images available</p>
            </div>
          )}
        </div>

        <div className="p-6">
          <h1 className="text-2xl font-bold text-gray-800">{property?.title}</h1>
          <p className="text-gray-600 mb-2">{property?.location}</p>
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">{property?.propertyType}</span>
            <span className={`text-xs px-2 py-1 rounded-full ${property?.status === EStatus.ACTIVE ? 'bg-green-100 text-green-800' :
              property?.status === EStatus.INACTIVE ? 'bg-yellow-100 text-yellow-800' :
                'bg-gray-100 text-gray-800'
              }`}>
              {property?.status}
            </span>
          </div>
          <p className="text-blue-500 font-bold text-xl mb-4">${property?.pricePerNight} per night</p>

          <div className="mb-6">
            <p className="text-gray-700">{property?.description}</p>
          </div>
          {
            isAuthenticated && (

              <Button
                onClick={onNext}
                disabled={!isAuthenticated}
                className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
              >
                Book Now
                <FaArrowRight size={16} />
              </Button>
            )
          }
        </div>
      </div>

      {isAuthenticated && userInfo && (
        <div className="mt-6 bg-blue-50 rounded-lg p-6 border border-blue-100">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Hello, {userInfo.name}</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Contact Email</p>
              <p className="text-gray-700">{userInfo.email}</p>
            </div>
          </div>
        </div>
      )}

      {!isAuthenticated && (
        <div className="mt-6 bg-blue-50 rounded-lg flex flex-col items-center p-6 border border-blue-100 text-center">
          <h2 className="text-xl font-semibold text-gray-800 mb-2">Login to Continue</h2>
          <p className="text-gray-600 mb-4">You need to be logged in to proceed with booking this property.</p>
          <AuthModel type='login' trigger={
            <Button className="bg-blue-500 hover:bg-blue-600 text-white">
              Login
            </Button>
          } />
        </div>
      )}

      <div className="mt-6 flex justify-between">
        <Button
          outline
          onClick={() => router.push('/')}
          className="flex items-center gap-2"
        >
          <FaArrowLeft size={16} />
          Previous
        </Button>

        <Button
          onClick={onNext}
          disabled={!isAuthenticated}
          className="bg-blue-500 hover:bg-blue-600 text-white flex items-center gap-2"
        >
          Book Now
          <FaArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};


function MosaicDialog({ property }: { property?: IProperty }) {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <div className="h-32 md:h-48 relative rounded-lg overflow-hidden bg-blue-500 flex items-center justify-center cursor-pointer hover:bg-blue-600 transition-colors">
          <div className="text-white text-center p-4">
            <BiGrid size={24} className="mx-auto mb-2" />
            <p className="font-semibold">View All</p>
            <p className="text-sm">{property?.images.length} Images</p>
          </div>
        </div>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-[95%] w-[95%] max-w-4xl bg-white rounded-md shadow-xl z-50 focus:outline-none overflow-auto p-4">
          <Dialog.Title className="text-xl font-bold">
            All Images - {property?.title}
          </Dialog.Title>

          <Dialog.Close asChild>
            <button className="absolute top-2 right-2 p-2 bg-white rounded-md">
              <IoClose />
            </button>
          </Dialog.Close>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {property?.images.map((img, index) => (
              <div
                key={index}
                className={`relative rounded-lg overflow-hidden ${index % 5 === 0 ? "md:col-span-2 md:row-span-2" : ""
                  }`}
              >
                <img
                  src={img}
                  alt={`${property.title} - Image ${index + 1}`}
                  className="w-full h-full hover:scale-105 transition-transform duration-300"
                />
              </div>
            ))}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default PropertyBookingFirstStep;