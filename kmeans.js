var cluster_change;
const canvas1 = document.querySelector('canvas')
const cn = canvas1.getContext('2d')
canvas1.width = innerWidth;
canvas1.height = innerHeight;
const canvas = document.querySelector('canvas')
const c1 = canvas.getContext('2d')
canvas.width = canvas1.width/3;
canvas.height = canvas1.height/1.75; //creating canvas

let dataset=[
    {x:50,y:90,c:0,cc:0},{x:99,y:100,c:0,cc:0},{x:150,y:290,c:0,cc:0},{x:225,y:245,c:0,cc:0},{x:190,y:290,c:0,cc:0},{x:250,y:200,c:0,cc:0},{x:310,y:310,c:0,cc:0},{x:350,y:222,c:0,cc:0},{x:50,y:210,c:0,cc:0},{x:380,y:240,c:0,cc:0}
];//declaring a dataset
var centroid=[{x:80,y:80,c:"#FF0000"},{x:200,y:200,c:"#FFFF00"},{x:350,y:350,c:"#00FF00"}];//declaring initial centroid


class Dot{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }
    draw(){
        c1.beginPath();
        c1.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c1.fillStyle = this.color;
        c1.fill();}}//declaring a class for datapoint construction
        
    let R=10;let dot=[];
    for(let j = 0; j<dataset.length; j++){
        setTimeout(()=>{
             dot[j] = new Dot(dataset[j].x, dataset[j].y, R);
            dot[j].draw();
        }, 1000);
    }//constructing datapoints



class C1{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color}
    draw(){
        c1.beginPath()
        c1.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c1.fillStyle = this.color
        c1.fill()}}
        
    class C2{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color}
    
    draw(){
        c1.beginPath()
        c1.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c1.fillStyle = this.color
        c1.fill()}}
        
    class C3{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color}
    
    draw(){
        c1.beginPath()
        c1.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c1.fillStyle = this.color
        c1.fill()}}//creating three separate classes for each centroids
        
    let cent=[];var CR=15;

for(let j = 0; j<centroid.length; j++){
    
        if(j==0){
            
            setTimeout(()=>{
            cent[j]=new C1(centroid[j].x,centroid[j].y,CR,centroid[j].c);
            cent[j].draw();},1500)
        }
       else if(j==1){
        setTimeout(()=>{
            cent[j]=new C2(centroid[j].x,centroid[j].y,CR,centroid[j].c);
            cent[j].draw();},1600)
            
        }
        else{
            setTimeout(()=>{
                cent[j]=new C3(centroid[j].x,centroid[j].y,CR,centroid[j].c);
                cent[j].draw();},1700)
            
        }
        
    }//creating centroids
    
    var pos, val,iter=1;
    
    do{
    setTimeout(()=>{
if(iter>1){
    var c1_sumx=0,c2_sumx=0,c3_sumx=0,c1_sumy=0,c2_sumy=0,c3_sumy=0,cntc1=0,cntc2=0,cntc3=0;
for(var i=0;i<dataset.length;i++){
if(dataset[i].c==0){
    c1_sumx+=dataset[i].x;c1_sumy+=dataset[i].y;cntc1+=1;
}
else if(dataset[i].c==1){
    c2_sumx+=dataset[i].x;c2_sumy+=dataset[i].y;cntc2+=1;
}
else{
    c3_sumx+=dataset[i].x;c3_sumy+=dataset[i].y;cntc3+=1;
}}
centroid[0].x=c1_sumx/cntc1;
centroid[0].y=c1_sumy/cntc1;
centroid[1].x=c2_sumx/cntc2;
centroid[1].y=c2_sumy/cntc2;
centroid[2].x=c3_sumx/cntc3;
centroid[2].y=c3_sumy/cntc3;
    //drawing updated centroids
    for(var j=0;j<3;j++){
        if(j==0){cent[j]=new C1(centroid[j].x,centroid[j].y,CR,centroid[j].c);
            cent[j].draw()}
        else if(j==1){cent[j]=new C1(centroid[j].x,centroid[j].y,CR,centroid[j].c);
            cent[j].draw()}
        else {cent[j]=new C1(centroid[j].x,centroid[j].y,CR,centroid[j].c);
            cent[j].draw()}
    }}
//update centroid starting from second iteration
for(var j=0;j<dataset.length;j++){
        let d=[];
        for(var i=0;i<centroid.length;i++){
            d[i]=Math.sqrt(Math.pow((dataset[j].x-centroid[i].x),2)+Math.pow((dataset[j].y-centroid[i].y),2));//finding euclidean distance
         }
var min=d[0];pos=0;
for(var i=1;i<3;i++){
    if(d[i]<min){
    min=d[i];
     pos=i;
}}//finding minimum distance 
if(pos==0){
    dot[j] = new Dot(dataset[j].x, dataset[j].y, R,centroid[pos].c);
       dot[j].draw();
       if(dataset[j].c!=pos){
            dataset[j].c=pos;dataset[j].cc=1;
        }
        else   {dataset[j].cc=0} 
   }
else if(pos==1){
    dot[j] = new Dot(dataset[j].x, dataset[j].y, R,centroid[pos].c);
       dot[j].draw();
       if(dataset[j].c!=pos){
        dataset[j].c=pos;dataset[j].cc=1;
    }
    else   {dataset[j].cc=0} 
}
else {
    dot[j] = new Dot(dataset[j].x, dataset[j].y, R,centroid[pos].c);
       dot[j].draw();
       if(dataset[j].c!=pos){
        dataset[j].c=pos;dataset[j].cc=1;
    }
    else   {dataset[j].cc=0} }//changing the color of datapoint according to nearest cluster
    }

iter+=1; cluster_chang=0;
for(var i=0;i<dataset.length;i++){
if(dataset[i].cc==1)
cluster_change=1;
}//to check whether iteration is needed again

    },3000);
    

}while(cluster_change!=0);