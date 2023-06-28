
////////////////function to convert csv to array of objects
function csvToArray(str, delimiter = ",") {
    const headers = str.slice(0, str.indexOf("\n")).split(delimiter);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");
    const arr = rows.map(function (row) {
        const values = row.split(delimiter);
        const el = headers.reduce(function (object, header, index) {
        object[header] = values[index];
        return object;
        }, {});
        return el;
    });
    return arr;
}
////////////////////////file reader
window.onload = () => {// (A) FILE PICKER
    
    const csvFile = document.getElementById("csvFile");
    let picker = document.getElementById("csvFile");// (B) READ CSV FILE
    picker.onchange = () => {// (B1) GET SELECTED CSV FILE
        let selected = picker.files[0];// (B2) READ CSV INTO ARRAY
        let reader = new FileReader();
        reader.addEventListener("loadend", () => {
            data = csvToArray(reader.result);
            console.log(data)
            negative(data)
            adding_dataTo_table(data)
            setting(data);
            maximize(data)
            datapoints(data)
            dbscan(data)
            color_of_cluster(data)
        });
        reader.readAsText(selected);
    };
  };

//////////////////////////
function setting(data){
    for(let i = 0; i < data.length; i++){
        A = Object.keys(data[i])[0]
        data[i].X = data[i][A];
        delete data[i].A;
        B = Object.keys(data[i])[1]
        data[i].Y = data[i][B];
        delete data[i].B;
    
        data[i]['N'] = 0;
        data[i]['C'] = '';
    }
}

//////////////////////canvas construction
const canvas1 = document.querySelector('canvas')
const cn = canvas1.getContext('2d')
canvas1.width = innerWidth;
canvas1.height = innerHeight;
const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
canvas.width = canvas1.width/3;
canvas.height = canvas1.height/1.75;

// const W = c.canvas.width, H = c.canvas.height;
// c.setTransform(1,0,0,1,0,0); // resets the transform to clear
// c.clearRect(0,0,W,H); // clears the canvas
// c.setTransform(1, 0, 0, 1, W / 2, H / 2); 

//////////////////////class defenition
class Dot{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius
        this.color = color
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.fillStyle = this.color
        c.fill()
        
    }
}

class Radius{
    constructor(x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color
    }
    draw(){
        c.beginPath()
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false)
        c.lineWidth = 2;
        c.strokeStyle = this.color
        c.stroke()
    }
}

///////////////////variable setting
let minpts = 3;
let colr = 'blue'
let d = 2
let r = 16;
let eps = r+r;
////////////////////
function negative(data){
    for(let i = 0; i< data.length; i+=10){
        if(Object.values(data[i]).some(x => x < 0)){
            const W = c.canvas.width, H = c.canvas.height;
            c.setTransform(1,0,0,1,0,0); // resets the transform to clear
            c.clearRect(0,0,W,H); // clears the canvas
            
            c.setTransform(1, 0, 0, 1, W / 2, H / 2); // moves the origin to the center of the canvas
        }
    }
    
}

function maximize(data){
    let max = Math.max(...data.map(o => o.X))
    let min = Math.min(...data.map(o => o.X))
    let abs = Math.abs(max-min)
    if(abs < 5){
        for(let i = 0; i<data.length; i+=10){
            data[i].X*=100;
            data[i].Y*=100;
        }
    }
    if((abs > 5) && (abs<10)){
        for(let i = 0; i<data.length; i+=10){
            data[i].X*=10;
            data[i].Y*=10;
        }
    }
}

////////////////////drawing data points
function datapoints(data){
    for(let i = 0; i<data.length; i+=10){
        setTimeout(()=>{
            let dot = new Dot(data[i].X, data[i].Y, d, 'black')
            dot.draw()
        }, 500)
    }
}


/////////////////////random color generating function
let col = []
function colour() {
    const randomColor = Math.floor(Math.random()*16777215).toString(16);
    col.push("#" + randomColor)
    return  "#" + randomColor;
}

////////////////////////////function to find near points

function findingNeigbours(id){
    let neig = []
    for(let i=0; i<data.length;i+=10){
        if(JSON.stringify(data[i]) === JSON.stringify(id)) continue;
        if(Math.hypot(data[i].X-id.X, data[i].Y-id.Y) < eps){
            neig.push(data[i])
        }
    }
    return neig;
}

///////////////////////coloring the clusters
function dbscan(data){
    let colarr = []
    for(let j = 0; j<data.length; j+=10){
        let neigbours = findingNeigbours(data[j]);
        for(let l = 0; l< neigbours.length;l++){
            let nw = []
            if(neigbours[l].N<1){
                nw = findingNeigbours(neigbours[l])///////finding neighbour's neighbour
                for(let q = 0; q<nw.length;q++){
                    neigbours.push(nw[q])
                }
                neigbours[l].N++;
                if(neigbours.length > minpts){
                    
                    let colr = colour();
                    while(colarr.includes(colr)){
                        colr = colour();
                    }//donot select random new color again
                    colarr.push(colr);
                    for( let k = 0; k<neigbours.length; k++){
                        setTimeout(()=>{
                            rad2  = new Radius(neigbours[k].X, neigbours[k].Y, r, colr+'3f')
                            rad2.draw()
                        }, 1500)
                        neigbours[k]['C'] = colr;
                    }
                    // for( let p = 0; p<neigbours.length; p++){
                    //     setTimeout(()=>{
                    //         let dot1  = new Dot(neigbours[p].X, neigbours[p].Y, r, colr+'3f')
                    //         dot1.draw()
                    //     }, 2500)
                    // }
                console.log(neigbours)
                }
            }
        }
    }
}

///////////////////////////////////finding clusters color
function color_of_cluster(data){
    setTimeout(()=>{
        let colo = [data[0].C]
        let k = 0
        let sum = [0]
        for(let i = 1; i<data.length; i++){
            if(colo.includes(data[i].C)){
                k = colo.indexOf(data[i].C)
                sum[k]++;
            }
            else{
                k = colo.length
                sum[k] = 0;
                sum[k]++;
                colo[k] = data[i].C
            }
        }
        // console.log(colo) 
        // console.log(sum)
        let box = '<div class="color-box"></div>'
        let m = 0
        let table = document.querySelector("#clustert") 
        let myvar = +'<tr>'+'<th>No.</th>'+'<th>Cluster</th>'+'<th>No.of data</th>' + '</tr>';
        for(var i = 0; i < colo.length; i++){
            if(colo[i]==='')continue;
            else{
                m++
                myvar += '<tr>'+'<td>'+(m)+'</td>'+'<td style="background-color:' + colo[i] +';"></td>'+'<td>'+sum[i]+'</td>'+'</tr>' 
            }    
        }
        table.innerHTML = myvar;
    }, 2000)
}


//////////////////////////////////canvas reseting to start-over
function reset(data){
    for(let j = 0; j<data.length; j+=10){
        data[j].N = 0;
        data[j].C = ''
    }
}
///////////////////////adding event listeners
function bigfun(){
    for(let i = 0; i< data.length; i+=10){
        if(Object.values(data[i]).some(x => x < 0)){
            k = 1;
        }
    }
    if(k===1){negative(data)}
    else{c.clearRect(0, 0, innerWidth, innerHeight)}
    reset(data)
    datapoints(data)
    dbscan(data)
    color_of_cluster(data)
}
document.querySelector('.play').addEventListener("click",()=>{
    if(data.length < 200){simplefun()}
    else{bigfun()}
})

//////////////////////////////////////Adding values to table
function adding_dataTo_table(data){
    let table = document.querySelector("#datat") 
    let myvar = +'<tr>'+'<th>' + Object.keys(data[0])[0] + '</th>'+'<th>' + Object.keys(data[0])[1] + '</th>' + '</tr>';
    for(var i = 0; i < data.length; i+=10){
        myvar += '<tr>'+'<td>'+Object.values(data[i])[0]+'</td>'+'<td>'+Object.values(data[i])[1]+'</td>'+'</tr>'     
    }
    table.innerHTML = myvar;

}





