
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

var Input = React.createClass({
    getInitialState: function(){
        return {shown:false}
    },

    render:function(){
        var currClass="myinput";
        if(!this.state.shown)
            currClass+=" hidden";
        return(
            <div className={currClass}>
                <input className="col col-sm-7 col-xs-7" id="name-input"/>
                <button className="col col-sm-5 col-xs-5" id="enter-result-button">Enter result</button>
            </div>
        );
    }
});



var Button=React.createClass({
    getInitialState:function(){
        return {name:this.props.name}
    },

    render: function() {
        return <button className="menu-button" id="start-button">{this.state.name}</button>
        //return <button type="button" {...this.props} className={"btn"+this.props.className} />;
    }
});

 var Menu = React.createClass({
    render:function(){
        return(
            <div className="container text-center cont-menu">
                <div className="container cont-timer text-center">
                    <div id="react-timer">
                     <Stopwatch />
                    </div>
                </div>

                <div className="container cont-input text-center">
                    <Input />
                </div>

                <div className="container cont-start-button">
                    <Button name="start" />
                </div>
            </div>
        );//return
    }//render func
 });//Menu 

/*
        <div id="react-timer"></div>
        <div id="react-input">input</div>
        <div id="react-buttons">buttons</div>
*/

React.render(
    <Menu />,
    document.getElementById('react-menu')
);