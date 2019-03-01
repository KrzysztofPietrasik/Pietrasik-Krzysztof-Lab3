var canvas = document.querySelector('canvas');
    canvas.width = this.canvas.scrollWidth;
    canvas.height = this.canvas.scrollHeight;
var context = canvas.getContext('2d');

var mouseIsDown = false;

var imgFile = document.getElementById('img-file'); //dodanie eventow dla poszruszania, klikania myszka
canvas.addEventListener('mousedown', mouseDown);
canvas.addEventListener('mouseup', mouseUp);
canvas.addEventListener('mousemove', mouseMove);
imgFile.addEventListener('change', uploadImage);

var sliderBrightness = document.getElementById('slider'); //pobranie slidera 1
var brightness = 100;
sliderBrightness.addEventListener('mousemove', ()=>{ //dodanie evntow 
  brightness = sliderBrightness.value; //ustawienie jasnosci na ta pobrana z slidera
  context.filter = "brightness(" + brightness + "%)"; //doanie do context canvasu
  uploadImage();
})

var sliderContrast = document.getElementById('slider2'); //pobranie slidera 2
var contrast = 100;
sliderContrast.addEventListener('mousemove', ()=>{
  contrast = sliderContrast.value;
  context.filter = "contrast(" + contrast + "%)";
  uploadImage();
})

var sliderSaturate = document.getElementById('slider3'); //pobranie slidera 3
var saturate = 0;
sliderSaturate.addEventListener('mousemove', ()=>{
  saturate = sliderSaturate.value;
  context.filter = "saturate(" + saturate + "%)";
  uploadImage();
})

var imgName;

  function uploadImage(e){
    try {
      imgName = imgFile.files[0].name; //jesli jest plik jesli nie, suwaki nic nie robia
    } catch (e) {
      return 0;
    }
    const image = new Image; //stworz nowe zdj
    image.src = imgName;
    image.onload = () =>{ //po zaladowaniu wymaluj obraz
      context.drawImage(image, canvas.width/4, canvas.height/4); 
    }
  }
  function mouseDown(){
    mouseIsDown = true;
  }
  function  mouseUp(){
    mouseIsDown = false;
  }

  function draw(canvasX, canvasY){

    if (mouseIsDown) {
      context.lineTo(canvasX, canvasY); //jeali myszka wcisnieta rysuj do okreslonej linii
      context.stroke();
    }
    context.moveTo(canvasX,canvasY);
  }
  function mouseMove(e){
     var rect = this.getBoundingClientRect(); //pobierz wspolrzedne canvasa i wspolrzedne poruszonej myszki
     var canvasX = (e.clientX - rect.left);
     var canvasY = (e.clientY - rect.top);
     draw(canvasX, canvasY);
  }

  function clearCanvasF() { //wyczysczenie canvasa
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
  var clearCanvas = document.getElementById('clearCanvas');
  clearCanvas.addEventListener('click', clearCanvasF);
