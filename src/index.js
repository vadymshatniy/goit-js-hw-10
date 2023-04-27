import './css/styles.css';
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';

const input = document.querySelector('#search-box');
const list = document.querySelector('.country-list');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(() => {
    onInput();
}, DEBOUNCE_DELAY));

function onInput(evt) {
    const name = input.value.trim();
    fetchCountries(name)
    .then((data) => (list.innerHTML = createCountry(data)))
        .catch((err) => console.log(err));
}

function fetchCountries(name) {
    const URL = 'https://restcountries.com/v3.1/'
    return fetch(`${URL}name/${name}?fields=name,capital,population,flags,languages`)
        .then(resp => {
            if (resp.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
            };
            if (!resp.ok) {
                throw new Error(resp.statusText)
            } else {
                return resp.json();
            }
    })
}

function createCountry(arr) {
    if (arr.length === 1) {
        return arr.map(({ name, flags, capital, population, languages }) =>
            `<p class="country-name" style="font-weight: bold">
            <img src="${flags.png}" alt="country ${name}" width="60"/>
            ${name.official}</p>
            <p style="font-weight: bold">Capital: <span style="font-weight: normal">${capital}</span></p>
            <p style="font-weight: bold">Population: <span style="font-weight: normal">${population}</span></p>
            <p style="font-weight: bold">Languages: <span style="font-weight: normal">${Object.values(languages)}</span></p>`).join('');
    } else if (arr.length >= 2 && arr.length <= 10) {
        return arr.map(({ name, flags, capital, population, languages }) =>
            `<p class="country-name" style="font-weight: bold">
            <img src="${flags.png}" alt="country ${name}" width="60"/>
            ${name.official}</p>`).join('');
    } else {
        Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
}