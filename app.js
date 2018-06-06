var express = require("express");
var app =  express();
var request = require("request");
var bodyparser =  require("body-parser");
var bitcore = require("bitcore-lib")

app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());

app.get("/",function(req,res) {
	res.sendFile(__dirname + "/index.html");
	//res.send("Bitcoin to the moon " + blocks_size); 
});

app.post("/create_wallet",function(req,res) {
	var src = req.body.source;
	console.log("testing -" +src);

	var input = new Buffer(src);
	var hash = bitcore.crypto.Hash.sha256(input);
	var bn =  bitcore.crypto.BN.fromBuffer(hash);
	var pk =  new bitcore.PrivateKey(bn).toWIF();
	var address = new bitcore.PrivateKey(bn).toAddress();
	res.send("Wallet Input: "+ src + "<br> Address: "+address+ "<br>" +"PrivateKey: "+pk);
	
});

app.listen(8000, function() {
	console.log("Go");
});
