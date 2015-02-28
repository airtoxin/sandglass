var util = require( 'util' );
var TBFQueue = require( './lib/tbf_queue' );
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = ( function () {
	return function () {
		var self = this;
		var stream = new EventEmitter();

		self.emit = function ( data ) {
			stream.emit( 'data', {
				timestamp: Date.now(),
				data: data
			} );
		};

		self.timeBatchForward = function ( timespan ) {

			var sandglassEmitter = new EventEmitter();

			stream.on( 'data', function ( initialData ) {
				var queue = new TBFQueue( timespan );
				var emit = function ( data ) {
					queue.emit( data );
				};
				emit( initialData );
				stream.on( 'data', emit );

				queue.on( 'aggregate', function ( data ) {
					stream.off( 'data', emit );
					sandglassEmitter.emit( 'aggregate', data );
				} );
			} );

			return sandglassEmitter;
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
