var assert = require( 'power-assert' );
var _ = require( 'lodash' );
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = require( '../' );

describe( 'sandglass', function () {
	describe( 'emit', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function ( done ) {
			assert.ok( _.isFunction( sandglass.emit ) );
			done();
		} );

		it( 'should call _stream.emit', function ( done ) {
			var dummy = 'Neko';
			var _stream = {
				emit: function ( event, data ) {
					assert.equal( event, 'data' );
					assert.equal( data.data, dummy );
					assert.ok( data.timestamp );
					done();
				}
			};

			sandglass._stream = _stream;
			sandglass.emit( dummy );
		} );
	} );

	describe( 'timeBatchForward', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function ( done ) {
			assert.ok( _.isFunction( sandglass.timeBatchForward ) );
			done();
		} );

		it( 'should call _stream.on', function ( done ) {
			var _stream = {
				on: function ( event, handler ) {
					assert.equal( event, 'data' );
					assert.ok( _.isFunction( handler ) );
					done();
				}
			};

			sandglass._stream = _stream;
			sandglass.timeBatchForward( 10 );
		} );

		it( 'should call _TBFDataHandler in #onData', function ( done ) {
			var dummyData = 'Neko';
			var testTimespan = 12;
			var _TBFDataHandler = function ( data, timespan ) {
				assert.equal( data, dummyData );
				assert.equal( timespan, testTimespan );
				done();
			};
			var _stream = {
				on: function ( event, handler ) {
					handler( dummyData );
				}
			};

			sandglass._stream = _stream;
			sandglass._TBFDataHandler = _TBFDataHandler;
			sandglass.timeBatchForward( testTimespan );
		} );
	} );

	describe( '_TBFDataHandler', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should call _stream on', function ( done ) {
			var _stream = {
				on: function ( event, handler ) {
					assert.equal( event, 'data' );
					assert.ok( _.isFunction( handler ) );
					done();
				},
				off: function () {}
			};

			sandglass._stream = _stream;
			sandglass._TBFDataHandler( 'd', 100, new EventEmitter() );
		} );

		it( 'should call _stream off', function ( done ) {
			var _stream = {
				on: function () {},
				off: function ( event, handler ) {
					assert.equal( event, 'data' );
					assert.ok( _.isFunction( handler ) );
					done();
				}
			};

			sandglass._stream = _stream;
			sandglass._TBFDataHandler( 'd', 100, new EventEmitter() );
		} );

		it( 'should call sandglassEmitter', function ( done ) {
			var dummyData = 'dummy';

			sandglassEmitter = new EventEmitter();
			sandglassEmitter.emit = function ( event, data ) {
				assert.equal( event, 'aggregate' );
				assert.deepEqual( data, [ dummyData ] );
				done();
			};
			sandglass._TBFDataHandler( dummyData, 100, sandglassEmitter );
		} );
	} );

	describe( 'join timeBatchForward, _TBFDataHandler and emit', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should aggregate 5 times', function ( done ) {
			var sandglassEmitter = sandglass.timeBatchForward( 1000 );

			var count = 5
			sandglassEmitter.on( 'aggregate', function ( data ) {
				// first time aggregate:  [ { timestamp: 1412, data: 'a' }, ... { timestamp: 1566, data: 'e' } ]
				// second time aggregate: [ { timestamp: 1435, data: 'b' }, ... { timestamp: 1566, data: 'e' } ]
				// and more
				assert.equal( data.length, count );
				assert.deepEqual( _.pluck( data, 'data' ), _.slice( [ 'a', 'b', 'c', 'd', 'e' ], 5 - count ) );
				count--;
				if ( count == 0 ) done();
			} );

			setTimeout( function () { sandglass.emit( 'a' ); }, 100 );
			setTimeout( function () { sandglass.emit( 'b' ); }, 200 );
			setTimeout( function () { sandglass.emit( 'c' ); }, 300 );
			setTimeout( function () { sandglass.emit( 'd' ); }, 400 );
			setTimeout( function () { sandglass.emit( 'e' ); }, 500 );
		} );

		it( 'should aggregate 4 times', function ( done ) {
			var sandglassEmitter = sandglass.timeBatchForward( 1000 );

			var count = 4
			sandglassEmitter.on( 'aggregate', function ( data ) {
				assert.equal( data.length, count );
				assert.deepEqual( _.pluck( data, 'data' ), _.slice( [ 'a', 'b', 'c', 'd' ], 4 - count ) );
				count--;
				if ( count == 0 ) done();
			} );

			setTimeout( function () { sandglass.emit( 'a' ); }, 1 );
			setTimeout( function () { sandglass.emit( 'b' ); }, 2 );
			setTimeout( function () { sandglass.emit( 'c' ); }, 3 );
			setTimeout( function () { sandglass.emit( 'd' ); }, 4 );
			setTimeout( function () { sandglass.emit( 'e' ); }, 1500 );
		} );
	} );

	describe( 'timeBatchBackward', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function () {
			// assert.ok( _.isFunction( sandglass.timeBatchBackward ) );
		} );
	} );

	describe( 'slicingWindow', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function () {
			// assert.ok( _.isFunction( sandglass.slicingWindow ) );
		} );
	} );
} );
