var _ = require( 'underscore' );
var kucun = require( './kucun' );
var fapiao = require( './fapiao' );

var Company = require( './company' );
var Item = require( './item' );

var allitems = [];

kucun = _.sortBy( kucun, function(huowu){
  return -huowu.price;
} );
// console.log( kucun );

_.each( kucun, function( huowu ) {
  _.times( huowu.num, function(){
    var item = new Item( huowu.item, huowu.price );
    allitems.push( item );
  } );
} );

console.log( allitems.length );
//process.exit(0);

fapiao = _.sortBy( fapiao, function( company ) {
  company.items = [];
  company.n = 0;
  return -company.money;
} );

var companies = [];
_.each( fapiao, function( element ) {
  companies.push( new Company( element.company, element.money, 0 ) );
} );


// Go over all the items

for( var i=0; i<allitems.length; ++i ) {
  var item = allitems[i];

  // Check the compnay to digest the item.
  for( var j=0; j<1/*companies.length*/; ++j ) {
    // Try to digest item.
    var company = companies[j];
    var status = company.testItem( item );
    if( status == Company.STATUS_HUNGERY || status == Company.STATUS_SATISFIED ) {
      company.digestItem( item );
      // The item is digested, come to the next item.
      break;
    }
  }

}

var restItems = _.filter( allitems, function( item ) {
  item.status == 'digested';
} );

//console.log( allitems );

_.each( companies, function( company ) {
  console.log( company.money, company.currentMoney );
  //console.log( company );
})

process.exit( 0 );