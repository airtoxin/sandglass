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

		it( 'should return sandglassStream (EventEmitter2 instance)', function ( done ) {
			var sandglassStream = sandglass.absoluteSlice( 10000 );
			assert.ok( sandglassStream instanceof EventEmitter );
			done();
		} );

		it( 'sandglassStream has stop method', function ( done ) {
			var sandglassStream = sandglass.absoluteSlice( 10000 );
			assert.ok( _.isFunction( sandglassStream.stop ) );
			done();
		} );

		it( 'join', function ( done ) {
			var sandglassStream = sandglass.absoluteSlice( 500 );
			var count = 0;
			var callbacks = [
				function ( data ) {
					assert.deepEqual( data, [ { a: '100' }, { b: '300' } ] );
					count++;
				},
				function ( data ) {
					assert.deepEqual( data, [ { c: '600' }, { d: '900' }, { e: '910' } ] );
					count++;
				},
				function ( data ) {
					assert.deepEqual( data, [] );
					count++;
					done();
				},
				function () {/* do nothing */}
			];

			sandglassStream.on( 'aggregate', function ( data ) {
				callbacks[ count ]( data );
			} );

			setTimeout( function(){ sandglass.emit( { a: '100' } ) }, 100 );
			setTimeout( function(){ sandglass.emit( { b: '300' } ) }, 300 );
			setTimeout( function(){ sandglass.emit( { c: '600' } ) }, 600 );
			setTimeout( function(){ sandglass.emit( { d: '900' } ) }, 900 );
			setTimeout( function(){ sandglass.emit( { e: '910' } ) }, 910 );
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

		it( 'should return sandglassStream (EventEmitter2 instance)', function ( done ) {
			var sandglassStream = sandglass.relativeSlice( 10000 );
			assert.ok( sandglassStream instanceof EventEmitter );
			done();
		} );

		it( 'sandglassStream has stop method', function ( done ) {
			var sandglassStream = sandglass.relativeSlice( 10000 );
			assert.ok( _.isFunction( sandglassStream.stop ) );
			done();
		} );

		it( 'join', function ( done ) {
			var sandglassStream = sandglass.relativeSlice( 100 );
			var count = 0;
			var callbacks = [
				function ( data ) {
					assert.deepEqual( data, [ { a: '10' }, { b: '60' }, { c: '90' } ] );
					count++;
				},
				function ( data ) {
					assert.deepEqual( data, [ { b: '60' }, { c: '90' } ] );
					count++;
				},
				function ( data ) {
					assert.deepEqual( data, [ { c: '90' }, { d: '170' } ] );
					count++;
				},
				function ( data ) {
					assert.deepEqual( data, [ { d: '170' } ] );
					count++;
				},
				function ( data ) {
					assert.deepEqual( data, [ { e: '350' } ] );
					count++;
					done();
				}
			];

			sandglassStream.on( 'aggregate', function ( data ) {
				callbacks[ count ]( data );
			} );

			setTimeout( function(){ sandglass.emit( { a: '10' } ) }, 10 );
			setTimeout( function(){ sandglass.emit( { b: '60' } ) }, 60 );
			setTimeout( function(){ sandglass.emit( { c: '90' } ) }, 90 );
			setTimeout( function(){ sandglass.emit( { d: '170' } ) }, 170 );
			setTimeout( function(){ sandglass.emit( { e: '350' } ) }, 350 );
		} );
	} );
} );
