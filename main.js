status="";
objects=[];
function preload(){
   video= createVideo('video.mp4');
}
 
 function setup(){
   canvas= createCanvas(500,450);
   canvas.position(470,250);
   video.hide();
   }

   function start(){
    objectDetector = ml5.objectDetector("cocossd",modelLoaded);
     document.getElementById("status").innerHTML= "status : detecting objects"
   }

   function modelLoaded(){
    console.log("model loaded");
    status=true;
    video.loop();
    video.speed(1);
    video.volume(0);
   }


function gotResults(error,results){
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    objects=results;
  }
}


function draw(){
  image(video,0,0,500,450);

  if (status != "") {
    
    objectDetector.detect(video,gotResults);
    for (i =0; i < objects.length; i++) {
      document.getElementById("status").innerHTML= "status : Object Detected"
      document.getElementById("number_of_objects").innerHTML="number of object detected are:"+ objects.length;
      
      fill("cyan");
      percantage=Math.floor(objects[i].confidence * 100);
      text(objects[i].label + " " + percantage + "%",objects[i].x + 15,objects[i].y + 15);
      nofill();
      stroke("cyan");
      rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height);
    }
  }
}
