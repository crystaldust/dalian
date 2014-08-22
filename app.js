var _ = require( 'underscore' );
var kucun = require( './kucun' );
var fapiao = require( './fapiao' );

var Company = require( './company' );
var Item = require( './item' );

var allitems = [];

kucun = _.sortBy( kucun, function(huowu){
  return huowu.price;
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
  return company.money;
} );

var companies = [];
_.each( fapiao, function( element ) {
  companies.push( new Company( element.company, element.money, 0 ) );
} );

_.each( companies, function( company ) {
  console.log( {
    name : company.name,
    money :company.money
  })
})


// Go over all the items

for( var i=0; i<allitems.length; ++i ) {
  var item = allitems[i];

  // Check the compnay to digest the item.
  for( var j=0; j<companies.length; ++j ) {
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
  company.items = _.groupBy( company.items, function( item ) {
    return item.name;
  } );

  company.desc = [];
  _.each( company.items, function( item ) {
    var firstElem = _.first( item );
    company.desc.push( { name : firstElem.name, price : firstElem.price, num : item.length } );
    var name = _.keys( item )[0];
    var values = item[name];
    //console.log( name );
  } )

  delete company.items;
} )

var n = 0;
var lastCompany = _.last( companies );
var target = lastCompany.money - lastCompany.currentMoney;


for( var i=companies.length-2; i>0; --i ) {
  var company = companies[i];
  // Extract one cheapest item from the list.
  var extracted = _.last( company.desc );
  extracted.num --;
  company.currentMoney -= extracted.price;
  
  var found = false;
  for( var j=0; j<lastCompany.desc.length; ++j ){
    if( extracted.name == lastCompany.desc[j].name ) {
      lastCompany.desc.num ++;
      found = true;
      break;
    } 
  }
  if( !found ) {
    lastCompany.desc.push({ name : extracted.name, price : extracted.price, num :1 })    
  }

  n+=extracted.price;
  lastCompany.currentMoney += extracted.price;
  if( Math.abs( n-target) / target < 0.15 ) {
    console.log(i);
    break;
  }
}

// for( var i=companies.length-2; i>0; --i ) {
//   var company = companies[i];
//   // Extract one cheapest item from the list.
//   var extracted = _.last( company.desc );
//   extracted.num --;
//   company.currentMoney -= extracted.price;
  
//   var found = false;
//   for( var j=0; j<lastCompany.desc.length; ++j ){
//     if( extracted.name == lastCompany.desc[j].name ) {
//       lastCompany.desc.num ++;
//       found = true;
//       break;
//     } 
//   }
//   if( !found ) {
//     lastCompany.desc.push({ name : extracted.name, price : extracted.price, num :1 })    
//   }
  
//   n+=extracted.price;
//   lastCompany.currentMoney += extracted.price;
//   if( Math.abs( n-target) / target < 0.15 ) {
//     console.log(i);
//     break;
//   }
// }


_.each( companies, function( company ) {
  console.log( '\n------------------------------' )

  console.log( company.name, company.money, company.currentMoney );
  _.each( company.desc, function( elem ) {
    console.log( elem.name, elem.price, elem.num );
  } )

})

process.exit( 0 );