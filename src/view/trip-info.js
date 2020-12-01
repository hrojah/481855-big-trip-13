import dayjs, { isDayjs } from "dayjs";

export const createTripInfoTemplate = (events, routeList) => {
  const startDate = events[0].startTime.format(`MMM DD`);
  const endDate = events[events.length - 1].startTime.format(`DD`);
  return `<section class="trip-main__trip-info  trip-info">
           <div class="trip-info__main">
             <h1 class="trip-info__title">${routeList[0]} &mdash; ${routeList[1]} &mdash; ${routeList[2]}</h1>

             <p class="trip-info__dates">${startDate} &mdash;&nbsp;${endDate}</p>
           </div>`;
};
