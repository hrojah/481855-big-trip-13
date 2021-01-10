const createFilterItemTemplate = (filter, currentFilterType) => {
  const {name, type} = filter;
  return `<div class="trip-filters__filter">
    <input id="filter-${type}" class="trip-filters__filter-input  visually-hidden" type="radio"
           name="trip-filter" value="${type}" ${type === currentFilterType ? `checked` : ``}>
      <label class="trip-filters__filter-label" for="filter-${type}">${name}</label>
  </div>`
}

export const createFilterTemplate = (filterItems, currentFilterType) => {
  const filterItemsTemplate = filterItems.map((filter) => createFilterItemTemplate(filter, currentFilterType)).join(``);

  return `<form class="trip-filters" action="#" method="get">
               ${filterItemsTemplate}
               <button class="visually-hidden" type="submit">Accept filter</button>
             </form>\``
}
