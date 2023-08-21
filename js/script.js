// fetching movies from the api 
async function fetchMovies(query){
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=94bc2489&s=${query}`);
    const data = await response.json();
    return data.Search || [];
}

// fetching necessary elements 
var searchInput = document.getElementById("search-input");
var autoComplete = document.getElementById("autocomplete-dropdown");

// adding input listener to search bar 
searchInput.addEventListener('input', async(event)=>{
    const query = event.target.value;
    autoComplete.innerHTML = '';

    if(query.length > 2){
        var movieSuggestions = await fetchMovies(query);
        console.log(movieSuggestions);
        for(const movie of movieSuggestions){
            const link = document.createElement('a');
            link.setAttribute("href", "/views/movie.html")
            const movieList = document.createElement('div');
            movieList.classList.add('movie-list');
            movieList.innerHTML += `
                <div class="autocomplete-image">
                    <img src="${movie.Poster}" alt="">
                </div>
                <div class="movie-text">
                    <span>${movie.Title}</span>
                </div>
            `
            movieList.addEventListener('click', function(){
                searchInput.value = movie.Title;
                autoComplete.innerHTML = '';
                localStorage.setItem("currentMovie", movie.Title);
            })
            link.append(movieList);
            autoComplete.append(link);
        }   
    }
})

// adding listener to search icon 
var searchBtn = document.getElementById("search-icon-box");
searchBtn.addEventListener('click', function(){
    if(!searchInput.value){
        alert("Please input something");
    }

    localStorage.setItem("currentMovie", searchInput.value);
})


