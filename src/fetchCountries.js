

import Notiflix from 'notiflix';
const list = document.querySelector('.country-list');

function fetchCountries(name) {
    const URL = 'https://restcountries.com/v3.1/'
    return fetch(`${URL}name/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (resp.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                list.remove();
            };
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } else {
                return resp.json();
            }
    })
}

export {fetchCountries};