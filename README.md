#sandglass[WIP]
Time windowed stream aggregation.



#Usage

```
var Sandglass = require( 'sandglass' );
var sandglass = new Sandglass();
```



#Sandglass Instance Methods

##emit( data );
Send data to all SandglassStreams.

##absoluteSlice( timespan );

This slices streaming timeline by timespan and aggregate data in each slices.

__Arguments__

1. timespan(Number): aggregation time (millisecond).

__Returns__

(sandglassStream): stream fires `aggregate` event on complete stream aggregation.
`emitter.on( 'aggregate', callback );` 
callback get array of streaming data.

__Example__

```javascript
var sandglassStream = sandglass.absoluteSlice( 1000 );

setTimeout( function() { sandglass.emit( 1 ) }, 500 );
setTimeout( function() { sandglass.emit( 2 ) }, 800 );
setTimeout( function() { sandglass.emit( 3 ) }, 1700 );
setTimeout( function() { sandglass.emit( 4 ) }, 2100 );
setTimeout( function() { sandglass.emit( 5 ) }, 2300 );
setTimeout( function() { sandglass.emit( 6 ) }, 5000 );

sandglassStream.on( 'aggregate', function ( data ) {
    console.log( '@data:', data );
    // => [ 1, 2, 3 ] (5 second later)
    // => [ 4, 5 ] (10 second later)
    // => [ 6 ] (15 second later)
    // => [] (20 second later)
    // ...
} );
```

##relativeSlice( timespan );

Data relative timeline slicing and aggregation.
This slices streaming timeline by timespan at data incoming

__Arguments__

1. timespan(Number): aggregation time span (millisecond).

__Returns__

(sandglassStream): stream fires `aggregate` event on complete stream aggregation.
`emitter.on( 'aggregate', callback );` 
callback get array of streaming data.

__Example__

```javascript
var sandglassStream = sandglass.absoluteSlice( 1000 );

setTimeout( function() { sandglass.emit( 1 ) }, 500 );
setTimeout( function() { sandglass.emit( 2 ) }, 800 );
setTimeout( function() { sandglass.emit( 3 ) }, 1700 );
setTimeout( function() { sandglass.emit( 4 ) }, 2100 );
setTimeout( function() { sandglass.emit( 5 ) }, 2300 );
setTimeout( function() { sandglass.emit( 6 ) }, 5000 );

sandglassStream.on( 'aggregate', function ( data ) {
    console.log( '@data:', data );
    // => [ 1, 2 ] ( 1.5 second later )
    // => [ 2, 3 ] ( 1.8 second later )
    // => [ 3, 4, 5 ] ( 2.7 second later )
    // => [ 4, 5 ] ( 3.1 second later )
    // => [ 5 ] ( 3.3 second later )
    // => [ 6 ] ( 6 second later )
} );
```



#SandglassStream Instance method

##on( event, listener );

Set event listener.
`sandglassStream.on( 'aggregate', function( data[] ) {...} )`

##off( event, [listener] );

Remove event listener.

##stop();
Stop aggregation. GC works.

##other methods
see [EventEmitter2](https://github.com/asyncly/EventEmitter2)
