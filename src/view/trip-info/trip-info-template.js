import {MAX_POINTS} from "../../const";

export const createTripInfoTemplate = (events) => {
  const route = new Set();
  for (let event of events) {
    route.add(event.destination);
  }

  const startDate = events[0].startTime.format(`MMM DD`);
  const endDate = events[events.length - 1].startTime.format(`MMM DD`);
  const routeArray = Array.from(route);
  let routePoints;
  if (routeArray.length > MAX_POINTS) {
    routePoints = `${routeArray[0]} &mdash; ... &mdash; ${routeArray[routeArray.length - 1]}`
  } else {
    routePoints = routeArray.join(` &mdash; `);
  }

  return `<section class="trip-main__trip-info  trip-info">
           <div class="trip-info__main">
             <h1 class="trip-info__title">${routePoints}</h1>

             <p class="trip-info__dates">${startDate} &mdash;&nbsp;${endDate}</p>
           </div>`;
};
