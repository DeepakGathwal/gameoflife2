var rows = 38;
var cols = 100;
var playing = false;
var grid = new Array(rows)
var nextgrid = new Array(rows)
var timer;
var reproductionTime = 100;
function initializeGrides(){
    for (var i = 0; i < rows; i++){
        grid[i] = new Array(cols);
        nextgrid[i] = new Array(cols);
    }
}
function resetGrids(){
    for (var i = 0; i < rows; i++){
    for (var j = 0; j < cols; j++){
        grid[i][j] = nextgrid[i][j] ;
        nextgrid[i][j] = 0;
    }
}
}
function copyAndResetGrid(){
    for(var i=0; i<rows; i++){
    for(var j=0; j<cols; j++){
        grid[i][j] = 0
        nextgrid[i][j] = 0
    }
}
}
function initialize(){
    createTabel();
    initializeGrides()
    resetGrids()
    setupControlButtons()
}
function createTabel(){
    var gridContainer = document.getElementById('gridContainer')
    if(!gridContainer){
        console.error("Problem: No div for the drid tabel!");
    }
    var table = document.createElement("table")
    for (var i = 0; i < rows;i++){
     var tr = document.createElement('tr') 
     for (var j = 0; j < cols; j++){
      var cell = document.createElement('td')
      cell.setAttribute('id', i + '_' + j);
       cell.setAttribute('class','dead')
       cell.onclick = cellClickHandler;
       tr.appendChild(cell) 
    }
    table.appendChild(tr)
 }
    gridContainer.appendChild(table);
 }
 function cellClickHandler(){
    var rowcol = this.id.split("_")
    var row = rowcol[0]
    var col = rowcol[1]
    var classes = this.getAttribute("class")
    if(classes.indexOf("live") > -1){
        this.setAttribute('class','dead')
        grid[row][col] = 0;
    } else{
        this.setAttribute('class','live')
        grid[row][col] = 1;
    }
}
 function updateView(){
    for (var i = 0; i < rows; i++){
        for (var j = 0; j < cols; j++){
            var cell = document.getElementById(i + "_"+ j);
           if (grid[i][j] == 0){
            cell.setAttribute('class','dead')
           } else{
            cell.setAttribute('class','live')
        }
    }
    } 
}
function setupControlButtons(){
    var startButton = document.getElementById('start')
    startButton.onclick = startButtonHandler;
    var clearButton = document.getElementById('clear')
    clearButton.onclick = startButtonHandler;
    var randomButton = document.getElementById('random')
    randomButton.onclick = randomButtonHandler;
}
function randomButtonHandler(){
    if (playing) return;
    clearButtonHandler();
    for(var i = 0; i<rows; i++){
        for (var j = 0; j < cols; j++){
            var isLive = Math.round(Math.random())
        if(isLive == 1 ){
            var cell = document.getElementById(i +"_"+ j)
            cell.setAttribute("class","live")
            grid[i][j] =1
        
        }
        }
    }
}
function clearButtonHandler(){
    console.log('Clear the game: Stop Playing, Clear the grid');
    playing = false
    var startButton = document.getElementById('start')
    startButton.innerHTML = "Start"
    clearTimeout(timer)
    var cellslist = document.getElementById("live")
    var cells = [];
    for (var i = 0; i < cells.length; i++){
        cells[i].setAttribute("class","dead")
    }
    resetGrids;
}
function startButtonHandler(){
    if(playing){
        console.log("Pause the Game");
        playing = false;
        this.innerHTML = "Continue"
        clearTimeout(timer)
    } else {
        console.log("Continue the Game");
        playing = true;
        this.innerHTML = "Pause";
        play() ;
      }
}
function play(){
    computeNextGen();
    if (playing){
        timer = setTimeout(play, reproductionTime);
    }
}
function computeNextGen(){
    for (var i=0; i < rows; i++){
    for (var j=0; j < rows; j++){
    applyRules(i, j)
    }
    }
    copyAndResetGrid();
    updateView();
}
function applyRules(row, col){
var numNeighbors = countNeighbors(row, col)
            if (grid[row][col]==1){
                if (numNeighbors < 2){
                    nextgrid[row][col]=0;
                }else if (numNeighbors == 2 || numNeighbors == 3){
                    nextgrid[row][col] = 1;
                }else if (numNeighbors > 3){
                    nextgrid[row][col]=0;
                }
            }else if (grid[row][col]==0){
                if (numNeighbors == 3){
                    nextgrid[row][col]=1;
                }
            }
        }
        function countNeighbors(row, col){
            count = 0;
            // first row
            if(row - 1 >= 0){
                if(grid[row-1][col] == 1)
                count ++
            }
            if (row -1 >= 0 && col -1 >= 0){
                if (grid[row -1][col - 1]==1)
                count ++
            
        }
        if (row -1 >= 0 && col +1 < cols){
            if (grid[row -1][col + 1]==1)
            count ++
        
        }
        // first cell
            if(col - 1 >= 0){
                if(grid[row][col - 1] == 1)
                count ++
            }
            if (col +1 < cols){
                if (grid[row][col + 1]==1)
                count ++
            
        }
            if(row + 1 < rows && col-1 >= 0){
                if(grid[row + 1][col - 1] == 1)
                count ++
            }
            if (row +1 < rows && col +1 < cols){
                if (grid[row +1][col + 1]==1)
                count ++
            }
            if (row + 1 < rows){
                if (grid[row + 1][col]==1)
                count ++ 
        }
        return count
        }
        window.onload = initialize