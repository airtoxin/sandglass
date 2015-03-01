var util = require( 'util' );
var TBFQueue = require( './lib/tbf_queue' );
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = ( function () {
	return function () {
		var self = this;
		self._stream = new EventEmitter();

		self.emit = function ( data ) {
			self._stream.emit( 'data', {
				timestamp: Date.now(),
				data: data
			} );
		};

		self.timeBatchForward = function ( timespan ) {
			var sandglassEmitter = new EventEmitter();

			self._stream.on( 'data', function ( data ) {
				self._TBFDataHandler( data, timespan );
			} );

			return sandglassEmitter;
		};

		self._TBFDataHandler = function ( initialData, timespan ) {
			var queue = new TBFQueue( timespan );
			var emit = function ( data ) {
				queue.emit( data );
			};
			emit( initialData );
			self._stream.on( 'data', emit );

			queue.on( 'aggregate', function ( data ) {
				self._stream.off( 'data', emit );
				sandglassEmitter.emit( 'aggregate', data );
			} );
		};

		self.timeBatchBackward = function ( timespan ) {
			// body...
		};

		self.slicingWindow = function ( timespan ) {
			// body...
		};
	};
}() );

module.exports = Sandglass;
