export const renderDescription = (event) => {
  const renderPhotos = (event) => {
    return event.photos
      .map((photo) => {
        return `<img class="event__photo" src="${photo}" alt="Event photo">`;
      })
      .join(``);
  };
  return `<section class="event__section  event__section--destination">
                    <h3 class="event__section-title  event__section-title--destination">Destination</h3>
                    <p class="event__destination-description">${event.description}</p>

                    <div class="event__photos-container">
                      <div class="event__photos-tape">
                        ${renderPhotos(event)}
                      </div>
                    </div>
                  </section>`
}
