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
			var testData = 'this is test data';
			var _stream = { emit: function ( event, data ) {
				assert.equal( event, 'data' );
				assert.equal( data, testData );
				done();
			} };

			sandglass._stream = _stream;
			sandglass.emit( testData );
		} );
	} );

	describe( 'absoluteSlice', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function ( done ) {
			assert.ok( _.isFunction( sandglass.absoluteSlice ) );
			done();
		} );
	} );

	describe( 'relativeSlice', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function ( done ) {
			assert.ok( _.isFunction( sandglass.relativeSlice ) );
			done();
		} );
	} );
} );
