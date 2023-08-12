status= "";
objects=[];
song="";
function preload(){
 song= loadSound("music.mp3");
}
function setup(){
 canvas= createCanvas(400, 400);
 canvas.center();
 video= createCapture(VIDEO);
 video.hide();
objdetector= ml5.objectDetector("cocossd",modelloaded);
document.getElementById("status").innerHTML="status: detecting objects";
}
function draw(){
 image(video,0,0,400,400);
 if(status!= ""){
   objdetector.detect(video,gotresults);
   for(i=0;i<objects.length;i++){
      document.getElementById("status").innerHTML="status: objects detected";
     fill("palevioletred");
      stroke("blue");
      percent= floor(objects[i].confidence*100);
      text(objects[i].label+ " "+ percent+ "%", objects[i].x, objects[i].y);
      noFill();
      rect(objects[i].x, objects[i].y,objects[i].width, objects[i].height);
      if(objects[i].label=="person"){
         document.getElementById("objects").innerHTML="baby found";
         song.stop()
      }
      else{ 
         document.getElementById("objects").innerHTML="baby not found";
         song.play()
      }
   }
 }

}
function modelloaded(){
    console.log("model is loaded");
    status= true;
}
function gotresults(error, results){
 if(error){
    console.log(error)
 }
 else{
    console.log(results);
    objects= results;
 }
}