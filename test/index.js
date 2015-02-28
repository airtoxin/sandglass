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
		beforeEach( function () {
			sandglass = new Sandglass();
		} );

		it( 'should exist', function () {
			assert.ok( _.isFunction( sandglass.timeBatchForward ) );
		} );
	} );

	describe( 'timeBatchBackward', function () {
		var sandglass;
		beforeEach( function () {
			sandglass = new Sandglass();
		} );

		it( 'should exist', function () {
			assert.ok( _.isFunction( sandglass.timeBatchBackward ) );
		} );
	} );

	describe( 'slicingWindow', function () {
		var sandglass;
		beforeEach( function () {
			sandglass = new Sandglass();
		} );

		it( 'should exist', function () {
			assert.ok( _.isFunction( sandglass.slicingWindow ) );
		} );
	} );
} );
