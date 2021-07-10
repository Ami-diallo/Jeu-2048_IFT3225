function genereTabN(n){
    var tab = [];
    for(var i = 0; i < n; i++){
        tab.push(0);
    }
    return tab;
}
export function genereTabNXN(n){
    var tab = [];
    for(var i = 0; i < n; i++){
        tab.push(genereTabN(n));
    }
    return tab;
}



function countNbr(tab,nb){
    var count = 0;
    for(var i = 0; i < tab.length; i++){
        if(tab[i] == nb){
            count++;
        }
    }
    return count;  
}

function moveLeft(tab){
   var j = countNbr(tab,0);
   var k = 0;
    for(var i = 0; i < tab.length;i++){
        if(tab[i] !== 0){
           tab[k] = tab[i];
            k++;
           }
    }
   for(var p = tab.length - j; p < tab.length; p++ ) {
       tab[k] = 0;
       k++;
       
   }
    return tab;
}


function moveRight(tab){
    var tab1 = genereTabN(tab.length);
    var j = countNbr(tab,0);
    var tab2 = moveLeft(tab);
    var k = 0;
    for(var i = 0; i < tab.length; i++){
        if(i < j){
        }else{
            tab1[i] = tab2[k];
            k++;
        }
    }
    return tab1;
}


function addLeft(tab2){
    var tab = moveLeft(tab2);
    var tab1 = genereTabN(tab.length);
    for(var i = 0; i < tab.length; i++){
        if(i === 0){
            tab1[i] = tab[0];
        }else{
            if(tab1[i-1] === tab[i]){
                tab1[i-1] = tab[i]*2;
                tab1[i] = 0;
            }else{
                tab1[i] = tab[i];
            }
        }
    }
    return moveLeft(tab1);
}


function addRight(tab2){
    var tab = moveRight(tab2);
    var tab1 = genereTabN(tab.length);
    for(var i = tab.length - 1; i >= 0;i--){
        if(i === tab.length - 1){
            tab1[i] = tab[tab.length - 1];
        }else{
        if(tab1[i + 1] === tab[i]){
            tab1[i+1] = tab[i]*2;
            tab1[i] = 0;
        }else{
            tab1[i] = tab[i];
        }
    }
   }      
    return moveRight(tab1);
}

function columBecomeLine(tab){
    var tab1 = genereTabNXN(tab.length);
    for(var i = 0; i < tab.length; i++){
        for(var j = 0; j < tab.length; j++){
            tab1[i][j] = tab[j][i];
        }
    }
    return tab1;
}

export function left(tab){
    var tab1 = genereTabNXN(tab.length);
    for(var i = 0; i < tab.length; i++){
        tab1[i] = addLeft(tab[i]);
    }
    return tab1;
}


export function right(tab){
    var tab1 = genereTabNXN(tab.length);
    for(var i = 0; i < tab.length; i++){
        tab1[i] = addRight(tab[i]);
    }
    return tab1;
}

export function down(tab2){
    var tab = columBecomeLine(tab2);
    var tab1 = genereTabNXN(tab.length);
    for(var i = 0; i < tab.length; i++){
        tab1[i] = addRight(tab[i]);

    }
    var tab3 = columBecomeLine(tab1);
    return tab3;
}

export function up(tab2){
    var tab = columBecomeLine(tab2);
    var tab1 = genereTabNXN(tab.length);
    for(var i = 0; i < tab.length; i++){
        tab1[i] = addLeft(tab[i]);

    }
    var tab3 = columBecomeLine(tab1);
    return tab3;
}


function generateCase(tab){
   var indice = [];
   var k = 0;
   for(var i = 0; i < tab.length; i++){
       for(var j = 0; j < tab.length; j++){
           if(tab[i][j] === 0){
               indice.push(k);
               
           }
           k++;
       }
   }
   return indice;
}

function generateLineColum(tab, nbr){
    var indice = [];
    var k = 0;
    for(var i = 0; i < tab.length; i++){
        for(var j = 0; j < tab.length; j++){
            if(k === nbr){
                indice.push(i);
                indice.push(j);
                
            }
            k++;
        }
    }
    return indice;
 }

function getRandomInt(max){
    return Math.floor(Math.random()* max);

}

export function addTuileRandom(tab){
    var tab1 = generateCase(tab);
    var random = getRandomInt(tab1.length);
    var indice = generateLineColum(tab, tab1[random]);
    if(tab1.length !== 0){
        tab[indice[0]][indice[1]] = (getRandomInt(2) === 0) ? 2 : 4;
    }
    return tab;
}

function extraitElement(tab, elem){
    var tab1 = [];
    for(var i = 0; i < tab.length; i++){
        if(tab[i] !== elem){
            tab1.push(tab[i]);
        }
    }
    return tab1;

}

export function initializeRandom(tab){
    var tab1 = generateCase(tab);
    var random = getRandomInt(tab1.length);
    var tab2 = extraitElement(tab1, random);
    var random1 = getRandomInt(tab2.length);
    var indice = generateLineColum(tab, tab1[random]);
    var indice1 = generateLineColum(tab, tab2[random1]);
    //Console.Log(indice);
    //Console.Log(indice1);

    tab[indice[0]][indice[1]] = (getRandomInt(2) === 0) ? 2 : 4;
    tab[indice1[0]][indice1[1]] = (getRandomInt(2) === 0)? 2 : 4;

    return tab;
}
 function score(tab2){
     var tab = moveLeft(tab2);
     var score = 0;
     for(var i = 0; i < tab.length; i++){
         if(i > 0){
            if(tab[i - 1] === tab[i]){
                score = score + tab[i]*2;
                tab[i] = 0;
            }
         } else{

         }
     }
     return score;
 }
 export function scoreTotal(tab){
     var totalScore = 0;
     for(var i = 0; i < tab.length; i++){
         totalScore = totalScore + score(tab[i]);
     }
     return totalScore;
 }
 export function scoreTotal1(tab2){
     var tab = columBecomeLine(tab2);
     var totalScore = 0;
     for(var i = 0; i < tab.length; i++){
         totalScore = totalScore + score(tab[i]);
     }
     return totalScore;
 }




