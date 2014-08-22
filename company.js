
var STATUS_EMPTY = "empty";
var STATUS_HUNGERY = "hungery";
var STATUS_SATISFIED = "satisfied";
var STATSU_TOO_MUCH = "tooMuch";


function Company( name, money, currentMoney ) {
	var self = this;
	self.status = STATUS_EMPTY;
	self.name = name;
	self.money = money;
	self.currentMoney = currentMoney;
	self.items = [];
}



Company.prototype.testItem = function( item ) {
	var self = this;
	var predict = self.currentMoney + item.price;

	var status = self.status;

	//if( Math.abs( predict - self.money ) / self.money > 0.1 ) {
	if( Math.abs( predict - self.money ) > 100 ) {
		if( predict < self.money ) {
			status = STATUS_HUNGERY;
		}
		else {
			status = STATSU_TOO_MUCH;
		}
	}
	else {
		status = STATUS_SATISFIED;
	}

	return status;
}


Company.prototype.digestItem = function( item ) {
	var self = this;
	
	self.currentMoney += item.price;
	

	if( Math.abs( self.currentMoney - self.money ) > 500 ) {
		if( self.currentMoney < self.money ) {
			self.status = STATUS_HUNGERY;
		}
		else {
			self.status = STATSU_TOO_MUCH;
		}
	}
	else {
		self.status = STATUS_SATISFIED;
	}

	// console.log( self.currentMoney );
	// console.log( 'digest' );
	self.items.push( item );
	item.status = 'digested';
}

module.exports = Company;
module.exports.STATUS_EMPTY = STATUS_EMPTY;
module.exports.STATUS_HUNGERY = STATUS_HUNGERY;
module.exports.STATUS_SATISFIED = STATUS_SATISFIED;
module.exports.STATSU_TOO_MUCH = STATSU_TOO_MUCH;
