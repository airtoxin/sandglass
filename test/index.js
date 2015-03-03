var assert = require( 'assert' );
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

		it( 'should return sandStream (EventEmitter2 instance)', function ( done ) {
			var sandStream = sandglass.absoluteSlice( 10000 );
			assert.ok( sandStream instanceof EventEmitter );
			done();
		} );

		it( 'sandStream has stop method', function ( done ) {
			var sandStream = sandglass.absoluteSlice( 10000 );
			assert.ok( _.isFunction( sandStream.stop ) );
			done();
		} );

		it( 'join', function ( done ) {
			var sandStream = sandglass.absoluteSlice( 500 );
			var count = 0;
			var callbacks = [
				function ( agg ) {
					assert.deepEqual( agg, [ { a: '100' }, { b: '300' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { c: '600' }, { d: '900' }, { e: '910' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [] );
					count++;
					done();
				},
				function () {/* do nothing */}
			];

			sandStream.on( 'aggregate', function ( agg ) {
				callbacks[ count ]( agg );
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

		it( 'should return sandStream (EventEmitter2 instance)', function ( done ) {
			var sandStream = sandglass.relativeSlice( 10000 );
			assert.ok( sandStream instanceof EventEmitter );
			done();
		} );

		it( 'sandStream has stop method', function ( done ) {
			var sandStream = sandglass.relativeSlice( 10000 );
			assert.ok( _.isFunction( sandStream.stop ) );
			done();
		} );

		it( 'join', function ( done ) {
			var sandStream = sandglass.relativeSlice( 100 );
			var count = 0;
			var callbacks = [
				function ( agg ) {
					assert.deepEqual( agg, [ { a: '10' }, { b: '60' }, { c: '90' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { b: '60' }, { c: '90' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { c: '90' }, { d: '170' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { d: '170' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { e: '350' } ] );
					count++;
					done();
				}
			];

			sandStream.on( 'aggregate', function ( agg ) {
				callbacks[ count ]( agg );
			} );

			setTimeout( function(){ sandglass.emit( { a: '10' } ) }, 10 );
			setTimeout( function(){ sandglass.emit( { b: '60' } ) }, 60 );
			setTimeout( function(){ sandglass.emit( { c: '90' } ) }, 90 );
			setTimeout( function(){ sandglass.emit( { d: '170' } ) }, 170 );
			setTimeout( function(){ sandglass.emit( { e: '350' } ) }, 350 );
		} );
	} );

	describe( 'liveCount', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function ( done ) {
			assert.ok( sandglass.liveCount );
			done();
		} );

		it( 'should return sandStream (EventEmitter2 instance)', function ( done ) {
			var sandStream = sandglass.liveCount( 10000 );
			assert.ok( sandStream instanceof EventEmitter );
			done();
		} );

		it( 'sandStream has stop method', function ( done ) {
			var sandStream = sandglass.liveCount( 10000 );
			assert.ok( _.isFunction( sandStream.stop ) );
			done();
		} );

		it( 'join', function ( done ) {
			var sandStream = sandglass.liveCount( 500 );
			var count = 0;
			var callbacks = [
				function ( agg ) {
					assert.deepEqual( agg, [ { a: '100' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { a: '100' }, { b: '200' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { a: '100' }, { b: '200' }, { c: '400' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { c: '400' }, { d: '800' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { d: '800' }, { e: '1000' } ] );
					count++;
					done();
				}
			];

			sandStream.on( 'aggregate', function ( agg ) {
				callbacks[ count ]( agg );
			} );

			setTimeout( function(){ sandglass.emit( { a: '100' } ) }, 100 );
			setTimeout( function(){ sandglass.emit( { b: '200' } ) }, 200 );
			setTimeout( function(){ sandglass.emit( { c: '400' } ) }, 400 );
			setTimeout( function(){ sandglass.emit( { d: '800' } ) }, 800 );
			setTimeout( function(){ sandglass.emit( { e: '1000' } ) }, 1000 );
		} );
	} );

	describe( 'delayedCount', function () {
		var sandglass;
		beforeEach( function ( done ) {
			sandglass = new Sandglass();
			done();
		} );

		it( 'should exist', function ( done ) {
			assert.ok( _.isFunction( sandglass.delayedCount ) );
			done();
		} );

		it( 'should return sandStream (EventEmitter2 instance)', function ( done ) {
			var sandStream = sandglass.delayedCount( 10000 );
			assert.ok( sandStream instanceof EventEmitter );
			done();
		} );

		it( 'sandStream has stop method', function ( done ) {
			var sandStream = sandglass.delayedCount( 10000 );
			assert.ok( _.isFunction( sandStream.stop ) );
			done();
		} );

		it( 'join', function ( done ) {
			var sandStream = sandglass.delayedCount( 100 );
			var count = 0;
			var callbacks = [
				function ( agg ) {
					assert.deepEqual( agg, [ { a: '10' }, { b: '60' }, { c: '90' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { b: '60' }, { c: '90' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { c: '90' }, { d: '170' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { d: '170' } ] );
					count++;
				},
				function ( agg ) {
					assert.deepEqual( agg, [ { e: '350' } ] );
					count++;
					done();
				}
			];

			sandStream.on( 'aggregate', function ( agg ) {
				callbacks[ count ]( agg );
			} );

			setTimeout( function(){ sandglass.emit( { a: '10' } ) }, 10 );
			setTimeout( function(){ sandglass.emit( { b: '60' } ) }, 60 );
			setTimeout( function(){ sandglass.emit( { c: '90' } ) }, 90 );
			setTimeout( function(){ sandglass.emit( { d: '170' } ) }, 170 );
			setTimeout( function(){ sandglass.emit( { e: '350' } ) }, 350 );
		} );
	} );
} );
