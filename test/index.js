var assert = require( 'power-assert' );
var _ = require( 'lodash' );
var EventEmitter = require( 'eventemitter2' ).EventEmitter2;

var Sandglass = require( '../' );

describe( 'sandglass', function () {
	describe( 'emit', function () {
		var sandglass;
		beforeEach( function () {
			sandglass = new Sandglass();
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
		beforeEach( function () {
			sandglass = new Sandglass();
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

	describe( 'timeBatchBackward', function () {
		var sandglass;
		beforeEach( function () {
			sandglass = new Sandglass();
		} );

		it( 'should exist', function () {
			// assert.ok( _.isFunction( sandglass.timeBatchBackward ) );
		} );
	} );

	describe( 'slicingWindow', function () {
		var sandglass;
		beforeEach( function () {
			sandglass = new Sandglass();
		} );

		it( 'should exist', function () {
			// assert.ok( _.isFunction( sandglass.slicingWindow ) );
		} );
	} );
} );
