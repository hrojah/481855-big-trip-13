export const createTripCostTemplate = (events) => {
  const offers = events.reduce((c, a) => c.concat(a.offers), []);
  const offersPrice = offers.reduce((price, offer) => {
    return price + offer.price;
  }, 0);
  const pointsPrice = events.reduce((price, event) => {
    return price + event.price;
  }, 0);
  const totalPrice = offersPrice + pointsPrice;
  return `<p class="trip-info__cost">
              Total: &euro;&nbsp;<span class="trip-info__cost-value">${totalPrice}</span>
            </p>`;
};
