var APP = {};

var GameTable = React.createClass({
  getInitialState: function() {
  	var N=this.props.N;
    var arr2d=[];
 	var arrShown=[];
    var count=1;
    for (var i = 1; i <= N; i++) {
        currArr=[];
        currShown=[];
        for(var j = 1; j <= N; j++){
            currArr.push(count);
            currShown.push(false);
            count+=1;
        }
        arr2d.push(currArr);
        arrShown.push(currShown);
    }

    return {N: this.props.N, arr2d:arr2d, shown:arrShown};
  },

  render: function() {
  	_this=this;
  	return (

   <div className="container-fluid cont-main text-center">
    	<div classNamr="empty-cont"></div>
	    <table className="table-responsive table game-table">
          	<tbody>
		        {this.state.arr2d.map(function(arr1d, i) {
		          return (
		            <tr key={i}>
		              {arr1d.map(function(buttonNum, j) {
		              	var currId="button"+buttonNum;
		              	var currClass="game-button";
		              	if(!_this.state.shown[i][j])
		              		currClass=currClass+" hidden";
		              	return <td key={j} className="text-center"><button className={currClass} id={currId}>{currId}</button></td>;
		                return <td key={j}>{col}</td>;
		              })}
		            </tr>
		          );
		        })}
	      	</tbody>
	    </table>
	</div>
  );



  }//render function end

});//GameTable end



React.render(
  <GameTable N="3" />,
  document.getElementById('react-table')
);