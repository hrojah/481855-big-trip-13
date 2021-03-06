import {DAY, HOUR} from "../const";

export const createEventDate = (startTime, endTime) => {
  const monthDayString = startTime.format(`MMM DD`);
  const fullStartDateString = startTime.format(`YYYY-MM-DDTHH:mm`);
  const hoursMinutesEndString = endTime.format(`HH:mm`);
  const hoursMinutesStartString = startTime.format(`HH:mm`);
  const fullEndDayString = endTime.format(`YYYY-MM-DDTHH:mm`);
  const totalMinutes = endTime.diff(startTime, `minute`);
  const totalHours = Math.floor(totalMinutes / HOUR);
  const totalDays = Math.floor(totalMinutes / DAY);

  const minutesLeft = totalMinutes - totalHours * 60;
  const hoursLeft = totalHours - totalDays * 24;
  const daysLeft = totalDays;

  const minutesLeftFormatted = minutesLeft.toString().padStart(2, `0`);
  const hoursLeftFormatted = hoursLeft.toString().padStart(2, `0`);
  const dayLeftFormatted = daysLeft.toString().padStart(2, `0`);

  let duration;
  if (daysLeft > 0) {
    duration = `${dayLeftFormatted}D ${hoursLeftFormatted}H ${minutesLeftFormatted}M`;
  } else if (hoursLeft > 0) {
    duration = `${hoursLeftFormatted}H ${minutesLeftFormatted}M`;
  } else if (minutesLeft > 0) {
    duration = `${minutesLeftFormatted}M`;
  }
  return {
    monthDayString,
    fullStartDateString,
    hoursMinutesEndString,
    hoursMinutesStartString,
    fullEndDayString,
    duration,
  };
};
