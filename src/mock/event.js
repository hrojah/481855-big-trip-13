import {getRandomInteger} from "../utils/common";
import dayjs from "dayjs";

const generateDescription = () => {
  const descriptions = [`Lorem ipsum dolor sit amet, consectetur adipiscing elit.`, `Cras aliquet varius magna, non porta ligula feugiat eget.`, `Fusce tristique felis at fermentum pharetra.`, `Aliquam id orci ut lectus varius viverra.`, `Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.`];
  const descriptionCount = getRandomInteger(0, 4);
  const randomIndex = getRandomInteger(0, descriptions.length - 1);
  const randomDescriptions = [];
  for (let i = 0; i < descriptionCount; i++) {
    randomDescriptions.push(descriptions[randomIndex]);
  }
  return randomDescriptions.join(` `);
};

const generateType = () => {
  const types = [`Taxi`, `Bus`, `Train`, `Ship`, `Transport`, `Drive`, `Flight`, `Check-in`, `Sightseeing`, `Restaurant`];
  const randomIndex = getRandomInteger(0, types.length - 1);
  return types[randomIndex];
};

const generateDestination = () => {
  const cities = [`Amsterdam`, `Chamonix`, `Geneva`];
  const randomIndex = getRandomInteger(0, cities.length - 1);
  return cities[randomIndex];
};

const generateOffers = () => {
  return [
    {
      name: `Add luggage`,
      price: getRandomInteger(0, 200),
      label: `luggage`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Switch to comfort`,
      price: getRandomInteger(5, 200),
      label: `comfort`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Add meal`,
      price: getRandomInteger(5, 200),
      label: `meal`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Choose seats`,
      price: getRandomInteger(5, 200),
      label: `seats`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
    {
      name: `Travel by train`,
      price: getRandomInteger(5, 200),
      label: `train`,
      checked: Boolean(getRandomInteger(0, 1)),
    },
  ];
};

const generatePhotos = () => {
  const photosCount = getRandomInteger(1, 10);
  const randomPhotos = [];
  for (let i = 0; i <= photosCount; i++) {
    randomPhotos.push(`http://picsum.photos/248/152?r=${i}`);
  }
  return randomPhotos;
};

const generateDate = () => {
  const DaysGap = 7;
  const minTime = 30;
  const maxTime = 90;
  const daysGap = getRandomInteger(-DaysGap, DaysGap);
  const timeGap = getRandomInteger(minTime, maxTime);
  const date = dayjs().add(daysGap, `day`).toDate();
  const startTime = dayjs(date).add(timeGap, `minute`);
  const endTime = dayjs(startTime).add(timeGap, `minute`);
  return {
    startTime,
    endTime,
  };
};

export const generateEvent = () => {
  const date = generateDate();
  return {
    type: generateType(),
    destination: generateDestination(),
    offers: generateOffers(),
    startTime: date.startTime,
    endTime: date.endTime,
    description: generateDescription(),
    photos: generatePhotos(),
    price: getRandomInteger(20, 600),
    isFavorite: Boolean(getRandomInteger(0, 1)),
  };
};
