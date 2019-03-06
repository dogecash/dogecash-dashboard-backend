require('dotenv').config()
const request = require('request');
var publicIp = require("public-ip");

var RpcClient = require('bitcoind-rpc-client');
var config = {
    protocol: 'http',
    user: process.env.rpcuser,
    pass: process.env.rpcpassword,
    host: '127.0.0.1',
    port: process.env.rpcport
};
var rpc = new RpcClient(config);
//Set RPC connection stuff
//END RPC Setup

//Start API Vars

var apiurl = process.env.explorerapi;
var blockheight,chaindiff,nodeip,nodever,nodeproto,nodestatus,nodeconnects,nethash;
blockheight = 0;
chaindiff = 0;
nodeip = "";
nethash = 10;
nodeproto = 72018;
nodestatus = "ENABLED";
nodeconnects = 2;
nodever = "2.5";
nodeip = "127.0.0.1";

//start getting api data

//getnethash
request(apiurl + 'api/getnetworkhashps', { json: false }, (err, res, body) => {
  if (err) { return console.log(err); }
  nethash = body;
});

//getdiff
request(apiurl + 'api/getdifficulty', { json: false }, (err, res, body) => {
  if (err) { return console.log(err); }
  chaindiff = body;
});

// //getblockcount
// request(apiurl + 'api/getblockcount', { json: false }, (err, res, body) => {
//     if (err) { return console.log(err); }
//   blockheight = body;
//   });

//get pubip
  publicIp.v4().then(ip => {
    nodeip = ip;
});
// rpc.cmd('getblockcount').then(function (result) {
//        blockheight = result;

//     console.log(result) // {result: {...}, error: null}
//   })

  rpc.cmd('masternode','status').then(function (result) {
    // blockheight = result;

 console.log(result) // {result: {...}, error: null}
}).catch(onFailure)
function onFailure(err) {
    console.log(err)
  }
//Start getting data from jsonrpc from dogecashd





