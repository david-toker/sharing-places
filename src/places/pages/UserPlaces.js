import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import PlaceList from '../components/PlaceList';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';

// const DUMMY_PLACES = [
//   {
//     id: 'p1',
//     title: 'Tashkent Circus',
//     description: 'One of the most famous circus in the world!',
//     imageUrl: 'https://i.pinimg.com/originals/35/15/47/3515479b98ee1572eddf3cdf7898b2e5.jpg',
//     address: '1, Hadra Square, Tashkent 100011, Uzbekistan',
//     location: {
//       lat: 41.3248018,
//       lng: 69.2429806
//     },
//     creator: 'u1'
//   },
//   {
//     id: 'p2',
//     title: 'Empire State Building',
//     description: 'One of the most famous sky scrapers in the world!',
//     imageUrl: 'https://media2.trover.com/T/5459955326c48d783f000450/fixedw_large_4x.jpg',
//     address: '20 W 34th St, New York, NY 10001',
//     location: {
//       lat: 40.7484284,
//       lng: -73.9856546
//     },
//     creator: 'u2'
//   }
// ];

const UserPlaces = () => {
  const [loadedPlaces, setLoadedPlaces] = useState();
  const {isLoading, error, sendRequest, clearError} = useHttpClient();

  const userId = useParams().userId;

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const responseData = await sendRequest(`http://localhost:5000/api/places/user/${userId}`);
        setLoadedPlaces(responseData.places);
      } catch (err) {}
    };
    fetchPlaces();
  }, [sendRequest, userId]);

  const placeDeletedHandler = (deletedPlaceId) => {
    setLoadedPlaces(prevPlaces => prevPlaces.filter(place => place.id !== deletedPlaceId))
  };

  return (
    <React.Fragment>
      <ErrorModal error={error} onClear={clearError} />
      {isLoading && (
        <div className="center">
          <LoadingSpinner/>
        </div>
      )}
      {!isLoading && loadedPlaces && <PlaceList items={loadedPlaces} onDeletePlace={placeDeletedHandler} />}
    </React.Fragment>
  )
};

export default UserPlaces;