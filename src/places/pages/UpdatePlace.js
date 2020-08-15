import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import Input from '../../shared/components/FormElements/Input';
import Button from '../../shared/components/FormElements/Button';
import Card from '../../shared/components/UIElements/Card';
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH
} from '../../shared/util/validators';
import { useForm } from '../../shared/hooks/form-hook';

import './PlaceForm.css';


const DUMMY_PLACES = [
  {
    id: 'p1',
    title: 'Tashkent Circus',
    description: 'One of the most famous circus in the world!',
    imageUrl: 'https://i.pinimg.com/originals/35/15/47/3515479b98ee1572eddf3cdf7898b2e5.jpg',
    address: '1, Hadra Square, Tashkent 100011, Uzbekistan',
    location: {
      lat: 41.3248018,
      lng: 69.2429806
    },
    creator: 'u1'
  },
  {
    id: 'p2',
    title: 'Empire State Building',
    description: 'One of the most famous sky scrapers in the world!',
    imageUrl: 'https://media2.trover.com/T/5459955326c48d783f000450/fixedw_large_4x.jpg',
    address: '20 W 34th St, New York, NY 10001',
    location: {
      lat: 40.7484284,
      lng: -73.9856546
    },
    creator: 'u2'
  }
];

const UpdatePlace = () => {
  const [isLoading, setIsLoading] = useState(true);

  const placeId = useParams().placeId;

  const [formState, inputHandler, setFormData] = useForm({
    title: {
      value: '',
      isValid: false
    },
    description: {
        value: '',
        isValid: false
    }
  }, false);

  const identifiedPlace = DUMMY_PLACES.find(p => p.id === placeId);

  useEffect(() => {
    if(identifiedPlace) {
      setFormData({
        title: {
          value: identifiedPlace.title,
          isValid: true
        },
        description: {
            value: identifiedPlace.description,
            isValid: true
        }
      }, true);
    }
    setIsLoading(false);
  }, [setFormData, identifiedPlace]);

  const placeUpdateSubmitHandler = event => {
    event.preventDefault();
    console.log(formState.inputs);

  }

  if(!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }

  if(isLoading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className="place-form" onSubmit={placeUpdateSubmitHandler} >
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enter a valid title."
        onInput={inputHandler}
        initialValue={formState.inputs.title.value}
        initialValid={formState.inputs.title.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enter a valid description (min. 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description.value}
        initialValid={formState.inputs.description.isValid}
      />
      <Button type="submit" disabled={!formState.isValid} >
        UPDATE PLACE
      </Button>
    </form>
  )
};

export default UpdatePlace;