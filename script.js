let songsIndex =0;
let audioElement=new Audio('1.mp3');
let gif=document.querySelector("#gif");
let masterPlay=document.querySelector("#masterPlay");
let progressBar=document.querySelector("#myProgressBar");
let songItems = Array.from(document.querySelectorAll(".songItem"));
let smallPlayer=Array.from(document.querySelectorAll("#smallPlayer"));
let songTitle=document.querySelector("#titleOfSong");
let endTime=document.querySelector(".endTime");
let start=document.querySelector(".Start");

let songs=[
    {songName:"DESI KALAKAR", filePath:"1.mp3", coverPath:"cover1.jpeg",duration:"4:18"},
    {songName:"CHHAMAK CHALLO", filePath:"2.mp3", coverPath:"cover2.jpeg",duration:"3:46"},
    {songName:"BUTTA BOMMA", filePath:"3.mp3", coverPath:"cover3.jpeg",duration:"3:16"},
    {songName:"ENEMY", filePath:"4.mp3", coverPath:"cover4.jpg",duration:"2:53"},
    {songName:"HANUMAN CHALISA", filePath:"5.mp3", coverPath:"cover5.jpg",duration:"9:48"},
    {songName:"KHALASHI", filePath:"6.mp3", coverPath:"cover6.jpeg",duration:"4:18"},
    {songName:"OO ANTAVA", filePath:"7.mp3", coverPath:"cover7.jpg",duration:"3:43"},
    {songName:"ONE BOTTLE DOWN", filePath:"8.mp3", coverPath:"cover8.jpg",duration:"3:16"},
]

songItems.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src=songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;
    element.getElementsByClassName("timeDuration")[0].innerText=songs[i].duration;
})
masterPlay.addEventListener('click',()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        gif.style.opacity="1";
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        songTitle.innerText=songs[songsIndex].songName;
        Makeonepause();
    }
    else{
        gif.style.opacity="0";
        masterPlay.classList.remove('fa-pause');
        masterPlay.classList.add('fa-play');
        audioElement.pause();
        MakeAllplays();
    }
})
audioElement.addEventListener('timeupdate',()=>{
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
    progressBar.value=progress;

    //

    let minutes = Math.floor(audioElement.currentTime / 60);
    let seconds = Math.floor(audioElement.currentTime % 60);

    start.innerText = `${minutes}:${String(seconds).padStart(2,'0')}`;
    
})
progressBar.addEventListener('change',()=>{
    audioElement.currentTime=progressBar.value*audioElement.duration/100;
})

const MakeAllplays=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-play');
        element.parentElement.parentElement.style.backgroundColor="white";
        element.parentElement.parentElement.style.transform="translateX(0px)";
        
    })
}
const Makeonepause=()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        if(element.id==songsIndex){
        element.classList.add('fa-pause');
        element.classList.remove('fa-play');
        element.parentElement.parentElement.style.backgroundColor="#1ED760";
        element.parentElement.parentElement.style.transform="translateX(20px)";
        endTime.innerText=songs[songsIndex].duration;

        console.log(audioElement.currentTime/60);
        }
    })
} 

let mode=true;
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        if(mode){
        MakeAllplays();
        songsIndex =parseInt(e.target.id);
        e.target.classList.add('fa-pause');
        e.target.classList.remove('fa-play');
        endTime.innerText=songs[songsIndex].duration;
        
        element.parentElement.parentElement.style.transform="translateX(20px)";
        element.parentElement.parentElement.style.backgroundColor="#1ED760";
        audioElement.src=`${songsIndex+1}.mp3`;
        audioElement.play();
        audioElement.currentTime=0;
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        songTitle.innerText=songs[songsIndex].songName;
        gif.style.opacity="1";
        mode=false; 
        }   
        else if(mode==false){
            mode=true;
            e.target.classList.add('fa-pause');
            e.target.classList.remove('fa-play');
            masterPlay.classList.remove('fa-pause');
            masterPlay.classList.add('fa-play');
            audioElement.pause();
            gif.style.opacity="0";
            MakeAllplays();
        }   
    })
    
   
})

document.getElementById("previous").addEventListener('click',()=>{
   if(songsIndex<=0){
    songsIndex=7;
   }
   else{
    songsIndex-=1;
   }  
      
        audioElement.src=`${songsIndex +1}.mp3`;
        audioElement.play();
        audioElement.currentTime=0;
        if(masterPlay.classList=="fa-play"){
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        songTitle.innerText=songs[songsIndex].songName;
        gif.style.opacity="1";}
        songTitle.innerText=songs[songsIndex].songName;
        MakeAllplays();
        Makeonepause();
        // songItems.style.backgroundColor="#1ED760";
})
document.getElementById('forward').addEventListener('click',(e)=>{
    if(songsIndex>=7){
        songsIndex=0;
    }  
    else{
        songsIndex+=1;
    }
    songs[songsIndex]
    gif.style.opacity="1";
    audioElement.src=`${songsIndex +1}.mp3`;
        audioElement.play();
        audioElement.currentTime=0;
        masterPlay.classList.add('fa-pause');
        masterPlay.classList.remove('fa-play');
        songTitle.innerText=songs[songsIndex].songName;
        MakeAllplays();
        Makeonepause();
        // songItems[songsIndex]="#1ED760";
})
