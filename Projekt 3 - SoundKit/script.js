let body = document.querySelector('body');
let keyboardSongs = document.querySelectorAll('.keyboard ul li');

let keyboardSongsIndexes = {};
keyboardSongs.forEach((data)=>{
  keyboardSongsIndexes[data.dataset.key] = data.dataset.songname; //obiekt przechowuje tytuly piosenek pobrane z dataset html
});

body.addEventListener('keydown', (e)=>{
  let key = e.keyCode;
  key = key.toString();
  if (keyboardSongsIndexes.hasOwnProperty(key)) {
    var song = new Audio('sound/' + keyboardSongsIndexes[key]); //nazwa piosenki pobrana po nazwie z enentu
    song.play();  //graj w zaleznosci jaki zostal nacisniety przycisk
  }
  }
);

//
//
//
let audioChunks; //obsluga audio, nie ma za bardzo co tlumaczyc wiekszosc to kod z dokumentacji, tworzy sie obiekty audio asynchronicznie
  const recordAudio = () =>
    new Promise(async resolve => {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      const start = () => mediaRecorder.start();

      const stop = () =>
        new Promise(resolve => {
          mediaRecorder.addEventListener("stop", () => {
            const audioBlob = new Blob(audioChunks);
            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            const play = () => audio.play();
            resolve({ audioBlob, audioUrl, play });
          });

          mediaRecorder.stop();
        });

      resolve({ start, stop });
    });

  const sleep = time => new Promise(resolve => setTimeout(resolve, time));

let rec = document.getElementById('rec'), recEnd = document.getElementById('recEnd'),
    playAudio = document.getElementById('playAudio');
let recorder;
let audio;
let channel = document.getElementById('audioChannel');
let channelsData = {};
rec.addEventListener('click', ()=>{ //dodanie eventu wlacz muzyke do przycisku z id #rec
  (async () => {
    recorder = await recordAudio();
    recorder.start();
  })();
});
let recorderAudios = document.querySelector('.recorderAudios'); //dodanie danych, muzyki nagranej do tablicy 
recEnd.addEventListener('click', ()=>{
  (async () => {
    audio = await recorder.stop();
    channelsData[channel.value] = audio;
    console.log(channelsData);
  })();
  createRecordedRow();
  audioChunks = [];
});

function createRecordedRow(){ //dodanie kolejnego channela ktory zostal juz nagrany
  let actualChannel = channel.value;
  let newButton = document.createElement('button');
  newButton.setAttribute('class', 'recorded');
  newButton.innerText = 'Kanal ' + actualChannel;
  newButton.dataset.channel = actualChannel; //dodanie nazwy kanalu do dataset
  recorderAudios.appendChild(newButton);
}

recorderAudios.addEventListener('click', (e)=>{
    channelsData[e.target.dataset.channel].play(); //granie myuzyki na podstawie dataset, powyzej przypisanego
});
