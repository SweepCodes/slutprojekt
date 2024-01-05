/*
 * Abdulla Jamal, 2023 
 * 
 * Search Movies and Actors with the help of TheMovieDataBase API.
 * API Link - https://developer.themoviedb.org/reference/intro/getting-started
 * 
 * Fetches All Movies and Actors based on user search input.
 * Fetches current Top10 list of Movies and a list of the Top10 most popular movies of all time by a simply clicking on them.
 * User can search by Movie name or actor name.
 * HOVER OVER THE MOVIE PICTURES TO SEE: 
 * Information displayed for each Movie:
 * - Movie Title:
 * - Release date:
 * - Overview:
 * - Movie Poster.
 * - A Details button can be clicked to display:
 * - Budget: 
 * - Revenue: 
 * - Runtime: 
 * - What Genres the movie have:
 * - What companies the movie is Produced by:
 * Information displayed for each Actor:
 * - Actor name:
 * - Department that they are know to be working in.
 * - a list of the top movies or TV-show they have worked on.
 * - a Details button can be clicked to display.
 * - Actor name 
 * - A clickable Link to the actors imdb Page
 * - Actors Biography.
 * - Links used as help for building this website are listed below.
 * https://www.w3schools.com/
 * https://devdevout.com/css/css-cards
 * https://getcssscan.com/css-buttons-examples
 * https://underscorejs.org/#
 */

/*Importing functions from modules and declaring variables for accessability*/
import { fetchMovieDB } from "./modules/fetches.js";
import { displayResultsMovie } from "./modules/functionality.js";
import { displayResultsPerson } from "./modules/functionality.js";
import { displayErrorMsg } from "./modules/fetches.js";
import { movieListFetch } from "./modules/fetches.js";
import { removePrevSearchResult } from "./modules/functionality.js";
const form = document.querySelector('form');
const listEls = document.querySelectorAll('.list-el')

form.addEventListener('submit', searchHandler)

/*Creating the function "searchHandler" to add as a parameter for my submit event above*/
/*Besed on the user choice and input display certin information */
async function searchHandler(event) {
    event.preventDefault();
    removePrevSearchResult();
    const searchInput = document.querySelector('#input').value;
    const searchType = document.querySelector('input[type="radio"]:checked').value;
    if (searchType === 'movie') {
        await fetchMovieDB(searchInput, searchType).then(displayResultsMovie).catch(displayErrorMsg)
    }
    else if (searchType === 'person') {
        await fetchMovieDB(searchInput, searchType).then(displayResultsPerson).catch(displayErrorMsg)
    }
    form.reset();
}



/*ListEls contains 2 HTML-elements that are "top Rated" and "Popular" movies when clicked excute a fetch function and display information*/
listEls.forEach((element) => {
    element.addEventListener('click', () => {
        if (element.textContent === 'Top Rated') {
            removePrevSearchResult();
            movieListFetch("top_rated").then(displayResultsMovie).catch(displayErrorMsg)
        }
        else if (element.textContent === 'Popular') {
            removePrevSearchResult();
            movieListFetch("popular").then(displayResultsMovie).catch(displayErrorMsg)
        }
    })
})










