var assert = require( 'power-assert' );
var _ = require( 'lodash' );

var Sandglass = require( '../' );

describe( 'sandglass', function () {
	describe( 'emit', function () {
		var sandglass;
		beforeEach( function () {
			sandglass = new Sandglass();
		} );

		it( 'should exist', function () {
			assert.ok( _.isFunction( sandglass.emit ) );
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

		it( 'ok', function ( done ) {
			var emitter = sandglass.timeBatchForward( 1000 );
			emitter.on( 'aggregate', function ( data ) {
				assert.equal( data.length, 1 );
				var datum = data[ 0 ];
				assert.equal( datum.data, 'test1' );
				done();
			} );
			setTimeout( function () {
				sandglass.emit( 'test1' );
			}, 100 );
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
