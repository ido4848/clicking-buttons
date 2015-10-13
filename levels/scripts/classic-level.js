function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

function clearLocalStorage(){
    var leaderboard=JSON.parse(localStorage.getItem("leaderboard"));
    var pageid=localStorage.getItem("page-id");
    localStorage.clear();
    localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
    localStorage.setItem("page-id",pageid);
}

function adjustLevelSize(){
    var pageid=localStorage.getItem("page-id");
    switch(pageid){
        case "1":
            $('.game-button').css("font-size", "7vmin");
            break;
        case "2":
            $('.game-button').css("font-size", "4.5vmin");
            break;
        case "3":
            $('.game-button').css("font-size", "2.5vmin");
            break;
            
    }
    
}



/*
     $('#start-button').click(function(){
        $('.game-button').removeClass("greyed");
        $('.game-button').addClass("hidden");
        timerBig();
        $('#start-button').text("Restart");
        clearLocalStorage();
        localStorage.setItem("win",false);
        $('#start-button').click(function(){
            $('#start-button').unbind('click');
            timerBiggest();
            gameStart();
        });

    });
 */

function timerBiggest(){
    $('#start-button').text("stop (not supported)");
    $('.cont-start-button').css("height", "20%");
    $('.menu-button').css("font-size", "1.15vh");
    $('.cont-timer').css("height", "40%");
    $('#timer').css("font-size", "5vh");

    $('.cont-input').css("opacity", "0");
}

function timerBig(){
    var stbut=$('#start-button');
    $('.cont-start-button').css("height", "40%");
    $('.menu-button').css("font-size", "3vh");
    $('.cont-timer').css("height", "30%");
    $('#timer').css("font-size", "5vh");

    $('.cont-input').css("opacity", "0");
}

function timerSmall(){
    $('#start-button').text("restart");
    $('.cont-timer').css("height", "30%");
    $('#timer').css("font-size", "2vh");

    $('.cont-input').css("opacity", "1");
    $('.cont-start-button').css("height", "40%");
    $('.menu-button').css("font-size", "3vh");
}


function main(){
    var pageid=$('.heading').text().replace(/\D/g,'');
    localStorage.setItem("page-id",pageid);
    adjustLevelSize();

    clearLocalStorage();
    localStorage.setItem("win",false); 
    $('#start-button').click(function(){
        $('#start-button').unbind('click');
        timerBiggest();
        gameStart();
    });
}


function gameStart(){
    var pageid=localStorage.getItem("page-id");
    var arr=[];
    switch(pageid){
        case "1":
            arr=[1,2,3,4];
            break;
        case "2":
            arr=[1,2,3,4,5,6,7,8,9];
            break;
        case "3":
            arr=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16];
            break;
            
    }    
    shuffle(arr);
    localStorage.setItem("arr",JSON.stringify(arr));
    var time= new Date().getTime();
    localStorage.setItem("startTime",time);
    timerManage();
    turnManage();
}

function timerManage(){
    var currTime=new Date().getTime();
    var timeDiff=currTime-localStorage.getItem("startTime");
    timeDiff*=0.001;
    if(timeDiff<10){
        var timerText=timeDiff.toString().substring(0,5);
    }
    if(timeDiff>=10){
        var timerText=timeDiff.toString().substring(0,6);
    }
    
    $('#timer').text(timerText+" seconds");
    t = setTimeout(function () {
        timerManage();
    }, 50);
    

}

function turnManage(){
    var currArr=JSON.parse(localStorage.getItem("arr"));
    if(currArr.length==0){
        win();
    }else{
        var temp=currArr.pop();
        localStorage.setItem("arr",JSON.stringify(currArr));
        $('#button'+temp).removeClass('hidden');
        $('#button'+temp).click(function(){
            $('#button'+temp).addClass("greyed");
            $('#button'+temp).unbind('click');
            turnManage();
        });
    }

    
}


function win(){
    var time=new Date().getTime();
    localStorage.setItem("win",true);
    localStorage.setItem("finishTime",time);
    var timeDiff=(time-localStorage.getItem("startTime"))*0.001;
    clearTimeout(t);
    if(timeDiff<10){
        var timerText=timeDiff.toString().substring(0,5);
    }
    if(timeDiff>=10){
        var timerText=timeDiff.toString().substring(0,6);
    }
    
    localStorage.setItem("totalTime",timerText);
    $('#timer').text(timerText+" seconds");
    timerSmall();

    alert("Yay! \nYou Won! \nYour result is "+timerText+ " seconds. \nPlease write your name and enter this result.");
    
    $('#enter-result-button').click(function(){
        $('#enter-result-button').unbind('click');
        timerBig();
        
        var leaderboard=JSON.parse(localStorage.getItem("leaderboard"));
        if(leaderboard==null){
            leaderboard={};
        }
        var leaderboardDict=leaderboard["level "+localStorage.getItem("page-id")];
        if(leaderboardDict==null){
            leaderboardDict={};
            leaderboardDict[timerText]=[$('#name-input').val()];
        }else{
            if(timerText in leaderboardDict){
                leaderboardDict[timerText].push([$('#name-input').val()]);
            }else{
                leaderboardDict[timerText]=[$('#name-input').val()];
            }
        }
        
        leaderboard["level " +(localStorage.getItem("page-id"))]=leaderboardDict;
        localStorage.setItem("leaderboard",JSON.stringify(leaderboard));
    });   
    

    
    $('#start-button').click(function(){
           $('#start-button').unbind('click');
           $('#timer').text(timerText+" seconds");
            gameRestart();
    });
   
    
}


function gameRestart(){
    $('.game-button').removeClass("greyed");
    $('.game-button').addClass("hidden");
    timerBiggest();
    
    clearLocalStorage();
    localStorage.setItem("win",false);

    gameStart();
}

$(document).ready(main);