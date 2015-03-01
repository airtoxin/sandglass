var assert = require( 'power-assert' );
var TBFQueue = require( '../lib/tbf_queue' );

describe( 'TBFQueue', function () {
	describe( 'emit', function () {
		var queue;
		beforeEach( function ( done ) {
			queue = new TBFQueue( 1000 );
			done();
		} );

		it( 'should exist', function () {
			assert.ok( queue.emit );
		} );
	} );

	describe( 'on', function () {
		var queue;
		beforeEach( function ( done ) {
			queue = new TBFQueue( 1000 );
			done();
		} );

		it( 'should exist', function () {
			assert.ok( queue.on );
		} );
	} );

	describe( 'join', function () {
		var queue;
		beforeEach( function ( done ) {
			queue = new TBFQueue( 1000 );
			done();
		} );

		it( 'ok', function ( done ) {
			queue.emit( 'asdf' );
			queue.emit( 1 );
			queue.emit( [ '@', '_' ] );
			queue.emit( { u: 777 } );
			queue.on( 'aggregate', function ( data ) {
				assert.deepEqual( data, [ 'asdf', 1, [ '@', '_' ], { u: 777 } ] );
				done();
			} );
		} );
	} );
} );
