var EventEmitter = require( 'eventemitter2' ).EventEmitter2;
var util = require( 'util' );

var TBFQueue = ( function () {
	return function ( timespan ) {
		var self = this;
		var eventEmitter = new EventEmitter();
		var queue = [];

		setTimeout( function () {
			eventEmitter.emit( 'aggregate', queue );
		}, timespan );

		self.emit = function ( data ) {
			queue.push( data );
		};

		self.on = function ( event, handler ) {
			eventEmitter.on( event, handler );
		};
	};
}() );

module.exports = TBFQueue;
