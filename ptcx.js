// if ('undefined' !== typeof(PTCX)) {
//   PTCX = {};
//   PTCX.currentExtent = 2;
//   PTCX.nextExtent = 1;
//   PTCX.decreasingExtent = function() {
//     return (PTCX.currentExtent > PTCX.nextExtent);
//   };
// }

// 0 = none
// 1 = controlPanel
// 2 = header plus controlPanel

$('#header').slideToggle('slow');
$('#controlPanel').slideToggle('slow');

