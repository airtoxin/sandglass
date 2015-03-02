var _ = require( 'lodash' );
var util = require( 'util' );
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = ( function () {
	return function () {
		var self = this;
		var stream = new EventEmitter();

		self.emit = function ( data ) {
			stream.emit( 'data', data );
		};

		self.absoluteSlice = function ( timespan ) {
			var queue = [];
			var sandglassStream = new EventEmitter();

			var interval = setInterval( function () {
				sandglassStream.emit( 'aggregate', queue );
				queue = [];
			}, timespan );

			stream.on( 'data', function ( data ) {
				queue.push( data );
			} );

			sandglassStream.stop = function () {
				clearInterval( interval );
			};

			return sandglassStream;
		};

		self.relativeSlice = function ( timespan ) {
			var sandglassStream = new EventEmitter();
			var queue = [];

			var timeout;
			stream.on( 'data', function ( data ) {
				queue.push( data );
				timeout = setTimeout( function () {
					sandglassStream.emit( 'aggregate', queue );
					queue = _.slice( queue, 1 );
				}, timespan );
			} );

			sandglassStream.stop = function () {
				clearTimeout( timeout );
			};

			return sandglassStream;
		};
	};
}() );

module.exports = Sandglass;
