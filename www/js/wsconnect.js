// socket.io client persistent retries to unreachable host
// https://stackoverflow.com/questions/15802033/socket-io-client-persistent-retries-to-unreachable-host
// https://github.com/socketio/socket.io
// 
var events = require('events'),
    util = require('util'),
    io = require('socket.io-client'),
    url = "ws://localhost:12345", // intentionally an unreachable URL
    socketOptions = {
        "transports" : [ "websocket" ],
        "try multiple transports" : false,
        "reconnect" : false,
        'force new connection': true, // <-- Add this!
        "connect timeout" : 5000
    };

// The goal is to have this socket attempt to connect forever
// I would like to do it without the built in reconnects, as these
// are somewhat unreliable (reconnect* events not always firing)

function Test(){
    var self = this;
    events.EventEmitter.call(self);

    var socket;

    function reconnect(){
        socket.removeAllListeners();
        setTimeout(go, 1000);
    }

    function go(){

        console.log("connecting to", url, socketOptions);

        socket = io.connect(url, socketOptions);

        socket.on('connect', function(){
            console.log("connected! wat.");
        });
        socket.on('error', function(err){
            console.log("socket.io-client 'error'", err);
            reconnect();
        });
/*      process.on('uncaughtException', function(err) {
            if(err.code == 'ECONNREFUSED'){
                reconnect();
            }
        }*/
        socket.on('connect_failed', function(){
            console.log("socket.io-client 'connect_failed'");
            reconnect();
        });

        socket.on('disconnect', function(){
            console.log("socket.io-client 'disconnect'");
            reconnect();
        });
    }

    go();
}

util.inherits(Test, events.EventEmitter);


var test = new Test();


process.on('exit', function(){
    console.log("this should never end");
});
