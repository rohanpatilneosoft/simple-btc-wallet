var express = require("express");
var app =  express();
var request = require("request");
var bodyparser =  require("body-parser");
var bitcore = require("bitcore-lib");

var bitcoinTransaction = require('bitcoin-transaction');


app.use(bodyparser.urlencoded({
	extended: true
}));
app.use(bodyparser.json());
app.set("view engine", "ejs");

app.get("/",function(req,res) {
	
	res.render("index");
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
	var final_balance;
	var url_made = "https://blockchain.info/address/"+address+"?format=json";
	console.log(url_made);
	request({
		url: url_made,
		json: true,
	}, function(error, response, body) {
		final_balance = body.total_sent;
		console.log(final_balance);
	});
	var output =  {
		private_key : pk,
		address: address
	};
	//res.send("Wallet Input: "+ src + "<br> Address: "+address+ "<br>" +"PrivateKey: "+pk+ "<br>" +
	//	"Final Balance: "+final_balance);

	res.render("wallet_result",{output: output});
	
});

// app.get('/test_transaction', function(req,res) {


// 	var from = "1xm4vFerV3pSgvBFkyzLgT1Ew3HQYrS1V";
// 	var to = "19eA3hUfKRt7aZymavdQFXg5EZ6KCVKxr8";
// 	var privKeyWIF = "L2ZovMyTxxQVJmMtfQemgVcB5YmiEDapDwsvX6RqvuWibgUNRiHz";	
// 	//Private key in WIF form (Can generate this from bitcoinlib-js)

// 	bitcoinTransaction.getBalance(from, { network: "testnet" }).then((0.001) => {
// 		return bitcoinTransaction.sendTransaction({
// 			from: from,
// 			to: to,
// 			privKeyWIF: privKeyWIF,
// 			btc: 0.001,
// 			network: "testnet"
// 		});
// 	});

// });

app.listen(8000, function() {
	console.log("Go");
});
