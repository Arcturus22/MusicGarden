console.log("Welcome to Music Garden");


//Initializing Variables
let songIndex = 0;
let audioElement = new Audio('Songs/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progbar = document.getElementById('progbar');
let gif = document.getElementById('giffy');
let cover=document.querySelector('.cover');
let masterSongName=document.querySelector('.masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay=Array.from(document.getElementsByClassName('songItemPlay'));


let songs = [
    { songName: "Shinunoga e-wa by Fuji Kaze", filePath: "Songs/1.mp3", coverPath: "Covers/1.jpeg" },
    { songName: "Suzume no Tojimari", filePath: "Songs/2.mp3", coverPath: "Covers/2.jpeg" },
    { songName: "Love Story by Taylor Swift", filePath: "Songs/3.mp3", coverPath: "Covers/3.jpeg" },
    { songName: "2002 by Anne-Marie", filePath: "Songs/4.mp3", coverPath: "Covers/4.jpeg" },
    { songName: "Double Take by dhruv", filePath: "Songs/5.mp3", coverPath: "Covers/5.jpeg" },
    { songName: "Darkside by Neoni", filePath: "Songs/6.mp3", coverPath: "Covers/6.jpeg" },
    { songName: "SNAP by Rosa Linn", filePath: "Songs/7.mp3", coverPath: "Covers/7.jpeg" },
]

songItems.forEach((element, i) => {
    console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerHTML = songs[i].songName;

    const audio= new Audio(songs[i].filePath);
    audio.load();

    audio.onloadedmetadata = ()=> {
    const duration = parseInt(audio.duration);
    const mins=parseInt(duration/60);
    const secs= duration%60;
    const minutes = String(mins).padStart(2, '0');
    const seconds = String(secs).padStart(2, '0');
    // console.log(`${minutes}:${seconds}`);
    const time=`${minutes}:${seconds}`;
    element.getElementsByClassName('length')[0].innerHTML=time;
};

});


// audioElement.play();


//Handle Play/Pause click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');
        songItemPlay[songIndex].classList.remove('fa-play');
        songItemPlay[songIndex].classList.add('fa-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        songItemPlay[songIndex].classList.remove('fa-pause');
        songItemPlay[songIndex].classList.add('fa-play');
        gif.style.opacity = 0;
    }

})

//Listening Events
audioElement.addEventListener('timeupdate', () => {
    console.log('timeupdate');
    //Update Seekbar 
    progress = parseFloat((audioElement.currentTime / audioElement.duration) * 100);
    console.log(progress);
    progbar.value = progress;
})

progbar.addEventListener('change', () => {
    audioElement.currentTime = progbar.value * audioElement.duration / 100;
})
const makeAllPlays = () => {
    Array.from(songItemPlay).forEach((element) => {
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
    })
}
Array.from(songItemPlay).forEach((element) => {

    element.addEventListener('click', (e) => {

        songIndex = parseInt(e.target.id);
        if(songItemPlay[songIndex].classList.contains('fa-pause')){
            audioElement.pause();
            console.log(e.target);
            songItemPlay[songIndex].classList.remove('fa-pause');
            songItemPlay[songIndex].classList.add('fa-play');
            gif.style.opacity=0;
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            
        }
        else{
        console.log(e.target);
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play');
        e.target.classList.add('fa-pause');
        
        audioElement.src = `Songs/${songIndex + 1}.mp3`;
        masterSongName.innerHTML=songs[songIndex].songName;
        cover.src=songs[songIndex].coverPath;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play');
        masterPlay.classList.add('fa-pause');}
    })
})

document.getElementById('next').addEventListener('click',()=>{

    if(songIndex>=6){
        songIndex=0;
    }
    else{
        songIndex=songIndex+1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    cover.src=songs[songIndex].coverPath;
    gif.style.opacity=1;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    songItemPlay[songIndex].classList.remove('fa-play');
    songItemPlay[songIndex].classList.add('fa-pause');


})

document.getElementById('previous').addEventListener('click',()=>{

    if(songIndex<=0){
        songIndex=6;
    }
    else{
        songIndex=songIndex-1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerHTML=songs[songIndex].songName;
    cover.src=songs[songIndex].coverPath;
    gif.style.opacity=1;
    audioElement.currentTime = 0;
    audioElement.play();
    makeAllPlays();
    masterPlay.classList.remove('fa-play');
    masterPlay.classList.add('fa-pause');
    songItemPlay[songIndex].classList.remove('fa-play');
    songItemPlay[songIndex].classList.add('fa-pause');
})