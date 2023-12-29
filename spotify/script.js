console.log("This is Sotify clone")
//list of all songs 
let song=[
    {Songname:"Let Me Down Slowely",SongPath:"songs/Let Me Down Slowely.mpeg",banner:"bannners/Let Me Down Slowely.webp",durations:"2:49"},
    {Songname:"Closer",SongPath:"songs/Closer.mp3",banner:"bannners/Closer.webp",durations:"4:05"},
    {Songname:"Hope",SongPath:"songs/Hope.mp3",banner:"bannners/hope.webp",durations:"1:50"},
    {Songname:"Hurts So Good",SongPath:"songs/Hurts So Good.mp3",banner:"bannners/Hurts So Good.jpg",durations:"3:28"},
    {Songname:"People",SongPath:"songs/People.mp3",banner:"bannners/people.webp",durations:"3:04"},
    {Songname:"Women",SongPath:"songs/Woman.mp3",banner:"bannners/Woman.webp",durations:"2:52"} 
]


//initialize the variables
let songIndex = 0 ;
let audioSong = new Audio(song[songIndex].SongPath);
let masterplay = document.getElementById('masterplay');
let ProgressBar = document.getElementById('ProgressBar');
let gif = document.getElementById('gif');
let giftext = document.getElementById('masterName');
let progress = 0;
let songItem = Array.from(document.getElementsByClassName("songListItem"));
let backward = document.getElementById('backwardButton')
let forward = document.getElementById('forwardButton')


// songlist name and banner and time
songItem.forEach((element,i) => {
    element.getElementsByTagName("img")[0].src = song[i].banner;
    element.getElementsByClassName("SongName")[0].innerText = song[i].Songname;
});

//main play pause control
masterplay.addEventListener('click' ,()=>{
    if(audioSong.paused || audioSong.currentTime<=0){
        audioSong.play();
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
    }else{
        audioSong.pause();
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity = 0
        makeAllplay();
    }
})

const makeAllplay= ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}


//listen to events & seekbar 
audioSong.addEventListener('timeupdate',()=>{
    progress = parseInt((audioSong.currentTime/audioSong.duration)*100);
    ProgressBar.value = progress
    if(ProgressBar.value == 100){
        makeAllplay();
        masterplay.classList.remove('fa-circle-pause')
        masterplay.classList.add('fa-circle-play')
        gif.style.opacity = 0;
    }
})

//changing song based on seekbar
ProgressBar.addEventListener('change', ()=>{
    audioSong.currentTime =(( ProgressBar.value * audioSong.duration)/100);
})


Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllplay();
        e.target.classList.remove('fa-circle-play')
        e.target.classList.add('fa-circle-pause')
        songIndex=parseInt(e.target.id)
        audioSong.src = song[songIndex].SongPath
        audioSong.play();
        ProgressBar.value = 0;
        masterplay.classList.remove('fa-circle-play')
        masterplay.classList.add('fa-circle-pause')
        gif.style.opacity = 1
        giftext.innerText = song[songIndex].Songname;

    })
})


//previous button
backward.addEventListener('click' , ()=>{
    if(songIndex == 0){
        songIndex = 5;
        
    }else{
        songIndex=songIndex-1;
    }
    makeAllplay();
    audioSong.src = song[songIndex].SongPath
    audioSong.play();
    ProgressBar.value = 0;
    giftext.innerText = song[songIndex].Songname;
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById(songIndex).classList.add('fa-circle-pause')
    gif.style.opacity = 1
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
})
    

//forward button
forward.addEventListener('click' , ()=>{
    if(songIndex == 5){
        songIndex = 0;
        
    }else{
        songIndex=songIndex+1;
    }
    makeAllplay();
    audioSong.src = song[songIndex].SongPath
    audioSong.play();
    ProgressBar.value = 0;
    giftext.innerText = song[songIndex].Songname;
    document.getElementById(songIndex).classList.remove('fa-circle-play')
    document.getElementById(songIndex).classList.add('fa-circle-pause')
    masterplay.classList.remove('fa-circle-play')
    masterplay.classList.add('fa-circle-pause')
    gif.style.opacity = 1
})