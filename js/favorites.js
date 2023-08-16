
document.addEventListener('DOMContentLoaded', () => {
// let ls = JSON.parse(localStorage.getItem("favMovieList"));
// console.log(ls);
// const bdy = document.getElementsByTagName('body')[0];

// ls.forEach(element => {
//     bdy.innerHTML += `${element.Title}<br>`
// });

// fetching the fav movie list from local storage 
let ls = JSON.parse(localStorage.getItem("favMovieList"));
if(ls == null){
    ls = [];
}

// fetching the necessary elements 
const main = document.getElementById('main');
const movieCard = document.getElementsByClassName("movie-card");
const removeBtn = document.getElementsByClassName("remove-btn");
const movieImage = document.getElementsByClassName("movie-card-img");

// function to render List 
function renderList(){
    main.innerHTML = '';
    for(let movie of ls){
        main.innerHTML += `
            <div class="movie-card">
                <a href='./movie.html'><div class="movie-card-img" data-value='${movie.Title}'><img src="${movie.Poster}"></div></a>    
                <div class="text-area">
                    <div class="movie-name"><span>${movie.Title}</span></div>
                    <div class="remove-btn" data-value='${movie.Title}'><i class="fa-solid fa-circle-minus"></i></div>
                </div>
            </div>
        `
    }
}

// function to remove the movie 
function removeMovie(btnValue){
    let index = ls.findIndex(ele => ele.Title == btnValue);
    console.log(btnValue)
    ls.splice(index, 1);
    localStorage.setItem("favMovieList", JSON.stringify(ls));
    renderList();
    location.reload();
}

renderList();

// adding event listeners 
for (let i = 0; i < removeBtn.length; i++) {
    // const removeBtn = document.getElementsByClassName("remove-btn");
    console.log(removeBtn[i]);
    removeBtn[i].addEventListener('click', (function(index) {
        return () => {
            console.log(index);
            let btnValue = removeBtn[index].getAttribute('data-value');
            console.log(btnValue);
            removeMovie(btnValue);
        };
    })(i));
}


for(let i=0; i<movieImage.length; i++){
    movieImage[i].addEventListener('click', ()=>{
        let dataValue = movieImage[i].getAttribute('data-value');
        console.log(dataValue);
        localStorage.setItem("currentMovie", dataValue);
    })
}
});

