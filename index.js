var _ = require( 'lodash' );
var util = require( 'util' );
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = ( function () {
	return function () {
		var self = this;
		self._stream = new EventEmitter();

		self.emit = function ( data ) {
			self._stream.emit( 'data', data );
		};

		self.absoluteSlice = function ( timespan ) {
			var queue = [];
			var sandStream = new EventEmitter();

			var interval = setInterval( function () {
				sandStream.emit( 'aggregate', queue );
				queue = [];
			}, timespan );

			self._stream.on( 'data', function ( data ) {
				queue.push( data );
			} );

			sandStream.stop = function () {
				clearInterval( interval );
			};

			return sandStream;
		};

		self.relativeSlice = function ( timespan ) {
			var sandStream = new EventEmitter();
			var queue = [];

			var timeout;
			self._stream.on( 'data', function ( data ) {
				queue.push( data );
				timeout = setTimeout( function () {
					sandStream.emit( 'aggregate', queue );
					queue = _.slice( queue, 1 );
				}, timespan );
			} );

			sandStream.stop = function () {
				clearTimeout( timeout );
			};

			return sandStream;
		};

		self.liveCount = function ( timespan ) {
			var sandStream = new EventEmitter();
			var queue = [];

			var timeout;
			self._stream.on( 'data', function ( data ) {
				queue.push( data );
				sandStream.emit( 'aggregate', queue );

				timeout = setTimeout( function () {
					queue = _.slice( queue, 1 );
				}, timespan );
			} );

			sandStream.stop = function () {
				clearTimeout( timeout );
			};

			return sandStream;
		};

		self.delayedCount = self.relativeSlice;
	};
}() );

module.exports = Sandglass;
