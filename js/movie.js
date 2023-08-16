// fetching the movie from local storage that was clicked to come to this page
const query = localStorage.getItem("currentMovie");


// fetching movie from api 
async function fetchMovie(query){
    const response = await fetch(`https://www.omdbapi.com/?i=tt3896198&apikey=94bc2489&t=${query}`);
    const data = await response.json();
    return data || [];
}

// adding plot of the movie 
function addPlotinDiv(data){
    const plot = document.getElementById("plot-container");
    plot.innerHTML = `
        <h2>${data.Title}</h2>
        <p>${data.Plot}</p>
    `;
}

// adding poster 
function addImagetoDiv(data){
    const img = document.getElementById("poster");
    img.innerHTML += `<img src = ${data.Poster}> `
}

// adding movie info 
function addInfotoDiv(data){
    const info = document.getElementById('info-container');
    info.innerHTML = `
        <ul>
            <li>Released: ${data.Released}</li>
            <li>Director: ${data.Director}</li>
            <li>Country: ${data.Country}</li>
            <li>Language: ${data.Language}</li>
            <li>Rated: ${data.Rated}</li>
            <li>Genre: ${data.Genre}</li>
            <li>imdbRating: ${data.imdbRating}</li>
            <li>Actors: ${data.Actors}</li>
            <li>Awards: ${data.Awards}</li>
        </ul>
    `
}

// adding movie to favorites 
function addFavMovie(data, list, index){
    if(index==-1){
        list.push(data);
        list = JSON.stringify(list);
        localStorage.setItem("favMovieList", list);
    }
    console.log(list);
}

// removing movie from favorites 
function removeFavMovie(data, list, index){
    
    list.splice(index, 1);
    list = JSON.stringify(list);
    localStorage.setItem("favMovieList", list);

}

// display function : this acts like main 
async function display(){
    const data = await fetchMovie(query);
    console.log(data);  
    addPlotinDiv(data); 
    addImagetoDiv(data);
    addInfotoDiv(data);
    const fav = document.getElementById('fav-btn');
    var list = JSON.parse(localStorage.getItem("favMovieList"));
    if(list == null){
        list = [];
    }
    let index = list.findIndex(item => item.Title == data.Title);
    console.log(index);
    console.log(list);
    if(index!=-1){
        fav.style.color = 'red';
    }
    fav.addEventListener('click', ()=>{
        var list = JSON.parse(localStorage.getItem("favMovieList"));
        if(list == null){
            list = [];
        }
        let index = list.findIndex(item => item.Title == data.Title);
        if(index==-1){
            fav.style.color = 'red';
            console.log("Adding Movie");
            addFavMovie(data, list, index);
        }else{
            fav.style.color = 'black';
            console.log("Removing Movie");
            removeFavMovie(data, list, index);
        }
    })

}

// calling the function 
display();