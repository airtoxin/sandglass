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
			var sandglassStream = new EventEmitter();

			self._stream.on( 'data', function ( data ) {
				self._TBFDataHandler( data, timespan, sandglassStream );
			} );

			return sandglassStream;
		};

		self._TBFDataHandler = function ( initialData, timespan, sandglassStream ) {
			var queue = new TBFQueue( timespan );
			var emit = function ( data ) {
				queue.emit( data );
			};
			emit( initialData );
			self._stream.on( 'data', emit );

			queue.on( 'aggregate', function ( data ) {
				self._stream.off( 'data', emit );
				sandglassStream.emit( 'aggregate', data );
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
