function sortDictByValues(dict){
    var sortable = [];
    for (var item in dict)
        sortable.push([item, dict[item]]);
    sortable.sort(function(a, b) {return a[1] - b[1]});
    return sortable;

}

function sortDictByKeys(dict){
    var sortable = [];
    for (var item in dict)
        sortable.push([item, dict[item]]);
    sortable.sort(function(a, b) {return a[0] - b[0]});
    return sortable;
}

function main(){
    var pageid=$('.heading').text().replace(/\D/g,'');
    localStorage.setItem("page-id",pageid);
    $('#back-to-the-game-button').click(function(){
           window.location.href = '../levels/level'+pageid+'.html';  
    });
    $('#main-menu-button').click(function(){
           window.location.href = '../index.html';  
    });
    
    var leaderboard=JSON.parse(localStorage.getItem("leaderboard"));
    var leaderboardDict=leaderboard["level "+pageid];
    var sorted=sortDictByKeys(leaderboardDict);
    $('#leaderboard-table').append('<tr class="row"><th class="text-center col-sm-6 col-xs-6">'+'Name'+'</th><th class="text-center col-sm-6 col-xs-6">'+'Time(Seconds)'+'</th></tr>');
    for(var i in sorted){
        console.log(sorted[i]);
        for(var j in sorted[i][1]){
            $('#leaderboard-table').append('<tr class="row"><td class="text-center col-sm-6 col-xs-6">'+sorted[i][1][j]+'</td><td class="text-center col-sm-6 col-xs-6">'+sorted[i][0]+'</td></tr>');

                //'<tr><td>'+sorted[i][1][j]+'</td><td>'+sorted[i][0]+'</td></tr>');
        }
        
    }
    
    
}

$(document).ready(main);