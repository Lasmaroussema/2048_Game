
let size,rows,columns;
let grid = document.querySelector(".grid");
let array = [];
let scoreBoard = document.querySelector(".scoreCount");
let score = document.querySelector(".scoreCount .score");

let board =[]
let changed = false;
let losing = [];
let won = 0;

document.querySelector(".init button").onclick = function () {

    document.querySelector(".init").style.display = "none";
    document.querySelector(".difficulity").style.display = "flex";
    document.querySelectorAll(".difficulity div").forEach((e) => {
        e.onclick = () => {
            rows = columns = size = Number.parseInt(e.getAttribute("id"));

       
            for (let index = 0; index < rows; index++) {
                array[index] = [];
                board[index] = [];
                for (let index1 = 0; index1 < columns; index1++) {
                    array[index][index1] = grid.appendChild(document.createElement("div"));
                    board[index][index1] = 0;
                }
            }
        
            grid.classList.add(`s${size * size}`);
            document.querySelector(".difficulity").style.display = "none";
            scoreBoard.style.display = "block";
  
            RandomTwo();
            RandomTwo();
            update();
        }
    })
}

function update()
{
     for (let index = 0; index < rows; index++)
      {
         for (let index1 = 0; index1 < columns; index1++)
         { 
             if (board[index][index1] == 0)
             {
                 array[index][index1].innerText = "";
                 array[index][index1].classList="";
                 array[index][index1].classList.add(`piece0`);
             }
             else if (board[index][index1] > 0)
             {
                 array[index][index1].innerText = board[index][index1].toString();
                 array[index][index1].classList="";
                 array[index][index1].classList.add(`piece${board[index][index1]}`);
             }
         }
    }
}


function RandomTwo() {
    let c = 0, r = 0, found = false;
    if (hasEmpty()) {
        while (!found) {
            c = Math.floor(Math.random() * columns);
            r = Math.floor(Math.random() * rows);

            if (board[r][c] == 0) {
                board[r][c] = 2;
                update();
                found = true;
            }
        }
    }
    else return;
}    

function hasEmpty()
{
     for (let index = 0; index < rows; index++)
      {
         for (let index1 = 0; index1 < columns; index1++)
         { 
            if(board[index][index1]==0) return true; 
         }
    }
    return false;
}

function RemoveZero(row)
{
    return  row.filter(num =>  num != 0 );
}

function slide(row)
{
    let i = 0;
    row = RemoveZero(row);
    while (i < row.length - 1)
    {
        if (row[i] == row[i + 1])
        {
            row[i] *= 2;
            score.innerText =Number.parseInt(score.innerText )+ row[i]/2;
            row[i + 1] = 0;
            row = RemoveZero(row);
        }    
        i++;
    }
    i = row.length;
    while (i < columns)
    {
        row.push(0);    
        i++;
    }
    
    return row;
}


function slideLeft()
{
    let a = [];
     for (let index = 0; index < rows; index++)
     {
         a[index] = [];
         for (let index1 = 0; index1 < columns; index1++)
         { 
             a[index][index1] = board[index][index1];
         }
    }
    for (let index = 0; index < rows; index++)
    {
        board[index] = slide(board[index]);
        update();
    }
    if (a.toString() != board.toString())
        {changed = true;
            losing=[];
            return;
        }
    if (changed == false && !losing.includes())
        losing.push("left");
        
 
}

function slideRight()
{
    let a = [];
    for (let index = 0; index < rows; index++)
     {
         a[index] = [];
         for (let index1 = 0; index1 < columns; index1++)
         { 
             a[index][index1] = board[index][index1];
         }
    }
    for (let index = 0; index < rows; index++)
    {
        board[index] = slide(board[index].reverse()).reverse();
        update();
    }
    if (a.toString() != board.toString())
        {changed = true;
            losing=[];
            return;
        }
    if (changed == false && !losing.includes())
        losing.push("right");
        

}

function slidetop()
{
    let b = [];
    for (let index = 0; index < rows; index++)
     {
         b[index] = [];
         for (let index1 = 0; index1 < columns; index1++)
         { 
             b[index][index1] = board[index][index1];
         }
    }
    let a = [];
     for (let index = 0; index < columns; index++)
     {
         for (let index1 = 0; index1 < rows; index1++) {
             a.push(board[index1][index]);
            }
            a = slide(a);
         for (let index1 = 0; index1 < rows; index1++) {
             board[index1][index] = a[index1];
         }
         a = [];
        update();
    }
    if (b.toString() != board.toString())
        {changed = true;
            losing=[];
            return;
        }
    if (changed == false && !losing.includes())
        losing.push("top");
        

}


function slidebottom()
{
    let b = [];
   for (let index = 0; index < rows; index++)
     {
         b[index] = [];
         for (let index1 = 0; index1 < columns; index1++)
         { 
             b[index][index1] = board[index][index1];
         }
    }
   
    let a = [];
     for (let index = 0; index < columns; index++)
     {
         for (let index1 = 0; index1 < rows; index1++) {
             a.push(board[index1][index]);
         }
         a = slide(a.reverse()).reverse();
         for (let index1 = 0; index1 < rows; index1++) {
             board[index1][index] = a[index1];
         }
         a = [];
        update();
    }

    if (b.toString() != board.toString())
        {changed = true;
            losing=[];
            return;
        }
    if (changed == false && !losing.includes())
        losing.push("bottom");
        

}


document.addEventListener("keyup", (e) => {

    if (e.keyCode == 37) {
        changed = false;
        slideLeft();
          if(changed==true)
               RandomTwo();
           
            lose();
            if(won==0)
              win();
           
    }
    if (e.keyCode == 39) {
        changed = false;
        slideRight();
         if(changed==true)
             RandomTwo();
           
                lose();
                if(won==0)
                  win();
            
        
    }
    if (e.keyCode == 38) {
        changed = false;
        slidetop();
           if(changed==true)
              RandomTwo();
           
                lose();
                if(won==0)
                  win();
            
        
    }
    if (e.keyCode == 40) {
        changed = false;
        slidebottom();
        if(changed==true)
        RandomTwo();
    
        lose();
        if(won==0)
          win();
        
    }
})

function lose()
{
    if (!hasEmpty() && losing.length==4) {
        alert("You Lose \n Your score is : " + score.innerText);
        location.reload();
    }
}

function win()
{
    for (let index = 0; index < rows; index++)
    {
        for (let index1 = 0; index1 < columns; index1++)
        {
            if (board[index][index1] == 2048) {
                setTimeout(()=>{
                alert("You win !  ");
                let a = prompt("would you like to continue ? (press y/n)");
                    if (a == "y" || a == "Y")
                    {
                        won = 1;
                        return;
                    }
                else if (a == "n" || a == "N")
                        location.reload();
                }, 10)
            }

        }

       
        
    }
}

