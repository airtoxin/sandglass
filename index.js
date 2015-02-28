var Emitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = ( function () {
	return function () {
		var self = this;
		var emitter = new Emitter();

		self.emit = function ( data ) {

		};

		self.timeBatchForward = function ( timespan ) {

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
