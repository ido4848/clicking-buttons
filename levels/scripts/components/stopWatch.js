var Stopwatch = React.createClass({
	getInitialState: function(){
		return {millisecondsElapsed:0,startTime:null,millisecondsAdd:0};
	},

 	getMilliseconds: function(){
 		return('0'+this.state.millisecondsElapsed % 1000).slice(-3);
 	},

	getSeconds: function(){
		return Math.floor(this.state.millisecondsElapsed/1000);
	},

	getMinutes: function(){
		return Math.floor(this.state.millisecondsElapsed/60000);
	},

	handleStartClick: function(){
		var _this=this;
		if(this.state.startTime==null){
			currTime=new Date().getTime();
			this.setState({startTime:currTime});
		}
		this.incrementer  = new interval(0.5, function(){
			var elapsed = new Date().getTime() - _this.state.startTime
      		var add=_this.state.millisecondsAdd;
      		_this.setState({
				millisecondsElapsed: elapsed+add
			});
    	});
    	this.incrementer.run();
	},

	handleStopClick: function(){
		this.incrementer.stop();
		this.setState({startTime:null,millisecondsAdd:this.state.millisecondsElapsed});
		this.setState({lastClearedIncrementer:this.incrementer});
	},

	handleResetClick: function(){
		this.setState({ millisecondsElapsed:0,startTime:null,millisecondsAdd:0});
	},
 
  	render: function() {
	    return (
	      <div className="stop-watch">
	      {this.getMinutes()}:{this.getSeconds()}:{this.getMilliseconds()}
	      </div>
	    );
  	}
});

/*
	      	{(this.state.secondsElapsed === 0 || this.incrementer === this.state.lastClearedIncrementer)
	      	? <Button className="start-btn" onClick={this.handleStartClick}>start</Button>
	      	: <Button onClick={this.handleStopClick}>stop</Button>
	        }

	      	{(this.state.secondsElapsed !== 0)
	      	? <Button onClick={this.handleResetClick}>reset</Button>
	      	: null
	        }

var Button=React.createClass({
	render: function() {
		return <button type="button" {...this.props} className={"btn"+this.props.className} />;
	}
});


React.render(
  <Stopwatch />,
  document.getElementById('react-timer')
);

 */


function interval(duration, fn){
  this.baseline = undefined
  
  this.run = function(){
    if(this.baseline === undefined){
      this.baseline = new Date().getTime()
    }
    fn()
    var end = new Date().getTime()
    this.baseline += duration
 
    var nextTick = duration - (end - this.baseline)
    if(nextTick<0){
      nextTick = 0
    }
    (function(i){
        i.timer = setTimeout(function(){
        i.run(end)
      }, nextTick)
    }(this))
  }

this.stop = function(){
   clearTimeout(this.timer)
 }
}

