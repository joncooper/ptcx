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

var toggle_blocked = function() {
  blocked_selector = '[title*=blocked_]';
  jQuery(blocked_selector).each(function() {
    $(this).closest('.item').slideToggle();
  });
}

var toggle_focused_mode = function() {
  $('#header').slideToggle();
  $('#controlPanel').slideToggle();

  if ($('body').css('min-width') !== '700px') {
    $('body').css('min-width', '700px');
  }
}

toggle_focused_mode();
toggle_blocked();

// - insert into DOM after stories_button


// <li class="dropdown">
//           <a id= "stories_button" class="tab button" href="#">Stories</a>
//           <div class="knockout" style="display: none"></div>
//           <div id="stories_dropdown" class="nav_dropdown" style="display: none;">
//             <ul>
              
//                 <li>
//                   <div class="inner">
//                     <a class="selected_stories_action disabled_menu_item" href="#" onclick="if (App.isLoaded() &amp;&amp; !$(this.parentNode).hasClassName('disabled_menu_item')) { MultiSelectActions.deselectAllStories(app.project); }; return false;"><span>Deselect All</span></a>
//                   </div>
//                 </li>
              
//                 <li>
//                   <div class="inner">
//                     <a class="selected_stories_action disabled_menu_item" href="#" onclick="if (App.isLoaded() &amp;&amp; !$(this.parentNode).hasClassName('disabled_menu_item')) { MultiSelectActions.showLabelPrompt(); }; return false;"><span>Apply/Remove Label...</span></a>
//                   </div>
//                 </li>
              
//                 <li>
//                   <div class="inner">
//                     <a class="selected_stories_action disabled_menu_item" href="#" onclick="if (App.isLoaded() &amp;&amp; !$(this.parentNode).hasClassName('disabled_menu_item')) { MultiSelectActions.showProjectSelectPrompt(); }; return false;"><span>Move To Project...</span></a>
//                   </div>
//                 </li>
              
//                 <li>
//                   <div class="inner">
//                     <a class="selected_stories_action disabled_menu_item" href="#" onclick="if (App.isLoaded() &amp;&amp; !$(this.parentNode).hasClassName('disabled_menu_item')) { MultiSelectActions.exportSelectedStories(app.project, '/projects/241433/export'); }; return false;"><span>Export Selected as CSV</span></a>
//                   </div>
//                 </li>
              
//                 <li>
//                   <div class="inner">
//                     <a class="selected_stories_action disabled_menu_item" href="#" onclick="if (App.isLoaded() &amp;&amp; !$(this.parentNode).hasClassName('disabled_menu_item')) { if (confirm('Are you sure you want to delete the selected stories?')) { MultiSelectActions.deleteStories(app.project); } }; return false;"><span>Delete Selected</span></a>
//                   </div>
//                 </li>
              
//             </ul>
//           </div>
//           <script type="text/javascript">
// //<![CDATA[
// DropdownMenu.register('stories');
//       j('#stories_button').click(function() {
//         var overlay = j('.overlay');
//         if (overlay) {
//           overlay.hide();
//         }
//       });
    
// //]]>
// </script>
//         </li>
