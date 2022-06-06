let PAGENUMBER = 1;
let LANGUAGE = 'en';
let APIURL =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${PAGENUMBER}&query=`;
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
    "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";


    window.addEventListener('load',()=>{
        document.getElementById('loader').remove()
        document.querySelector('#main').style.display="flex";
        
        getMovies(APIURL,null);
});


const myform  = document.getElementById('myform');
const inputsearch  = document.querySelector('#search');
var main = document.querySelector('#main');
var error = document.querySelector('.error');

var nextbtn = document.querySelector('.nextbtn');
var prevbtn = document.querySelector('.prevbtn');
var language = document.querySelector('#language');


nextbtn.addEventListener('click',()=>{
    PAGENUMBER++;
    main.innerHTML="";
    getMovies(APIURL);
})
prevbtn.addEventListener('click',()=>{
    if(PAGENUMBER !=1){
        PAGENUMBER--;
    }
    main.innerHTML="";
    getMovies(APIURL);
})


async function getMovies(url,Searchinput){
    
    APIURL =
    `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=${PAGENUMBER}`;

    let fetchurl = (Searchinput == null)? APIURL : url;
      
    //  alert(fetchurl);
    const response = await fetch(fetchurl);
    const data = await response.json();
    
    console.log(data);
    if(data.results.length==0){

        error.innerHTML =` <h1>Sorry! No result found for keyword "${Searchinput}"</h1> 
        <button class="btn" onClick="reload()"> Reload </button>
        `;
    }
    data.results.map(movieObj=>{
        showMovies(movieObj);
    })
    document.getElementById('currentpage').innerHTML=PAGENUMBER;

}


function reload(){
    document.location.reload();
}

function showMovies(res,lang){
    var style="";
    if(lang==undefined){
        lang = LANGUAGE;
    }
    
    if(res.original_language !=lang){
        return;
    }

    if(res.vote_average >=8){
        vote_class = "hit";
    }else
    if(res.vote_average >=6){
        vote_class = 'avg';
    }else
    {
        vote_class = 'poor';
    }



    let div = document.createElement('div');
    div.classList.add('movie_wrapper');
    
    div.innerHTML=`<img src="${IMGPATH + res.poster_path}" alt="${res.title}" />                <div class="info">    <p>${res.title}</p> <P class="${vote_class}" >${res.vote_average.toFixed(1)}</P>  </div>   <div class="overview" > 
        <h3>Overview</h3>
    ${res.overview}  </div>`;
    
    main.appendChild(div);
}



myform.addEventListener('submit',(event)=>{
    event.preventDefault();
    if(inputsearch.value.length > 0){
        main.innerHTML="";
        getMovies(SEARCHAPI+inputsearch.value, inputsearch.value );
    }
})


// let movie  = document.querySelectorAll('.movie_wrapper');
// movie.addEventListener('click',(e)=>{

// })

language.addEventListener('change',(e)=>{
    LANGUAGE=e.target.value;
    main.innerHTML="";
    getMovies();
})