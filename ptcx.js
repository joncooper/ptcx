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

// ********************* BEGIN SOURCE JACKED FROM PIVOTAL TRACKER

var ProjectTabResizer;
ProjectTabResizer = {
    resizeTabs: function (windowWidth) {
        var minWidth = parseInt(jQuery('body').css('min-width'));
        windowWidth = windowWidth > minWidth ? windowWidth : minWidth;
        var rowElement = jQuery('#project_name_row');
        var otherTabs = rowElement.find('li:not(.current)');
        var numTabs = otherTabs.length;
        var maxWidth = windowWidth - (parseInt(rowElement.css('padding-left')) + parseInt(rowElement.css('padding-right')) + (parseInt(rowElement.find('li').css('margin-right')) * (numTabs + 1)) + parseInt(rowElement.find('li.current').width()));
        if (jQuery.browser.msie) {
            maxWidth -= 10;
        }
        for (var i = 0; i < numTabs; i++) {
            otherTabs[i] = jQuery(otherTabs[i]);
        }
        if (ProjectTabResizer.calcNeededWidth(otherTabs) <= maxWidth) {
            rowElement.find('li:not(.current)').removeClass('ellipsify');
            rowElement.find('li:not(.current)').css('max-width', '');
            return;
        }
        var maxWidthPerOtherTab = ProjectTabResizer.calcMaxWidthPerOtherTab(otherTabs, numTabs, maxWidth);
        rowElement.find('li:not(.current)').css('max-width', maxWidthPerOtherTab + 'px');
        jQuery.each(otherTabs, function (index, tabElement) {
            if (parseInt(tabElement.attr('originalWidth')) >= maxWidthPerOtherTab) {
                tabElement.addClass('ellipsify');
            } else {
                tabElement.removeClass('ellipsify');
            }
        });
    },
    calcNeededWidth: function (otherTabs) {
        var neededWidth = 0;
        jQuery.each(otherTabs, function (index, tabElement) {
            var elementWidth = tabElement.attr('originalWidth');
            if (!elementWidth) {
                elementWidth = tabElement.width();
                tabElement.attr('originalWidth', elementWidth);
            } else {
                elementWidth = parseInt(elementWidth);
            }
            neededWidth += elementWidth;
        });
        return neededWidth;
    },
    calcMaxWidthPerOtherTab: function (otherTabs, numTabs, maxWidth) {
        otherTabs.sort(function (a, b) {
            return parseInt(a.attr('originalWidth')) - parseInt(b.attr('originalWidth'));
        });
        var lastTabNarrowEnough = -1;
        var accumulatedWidths = 0;
        for (var i = 0; i < numTabs; i++) {
            var width = parseInt(otherTabs[i].attr('originalWidth'));
            var numRemainingTabs = numTabs - i;
            if ((accumulatedWidths + (width * numRemainingTabs)) > maxWidth) {
                break;
            }
            lastTabNarrowEnough = i;
            accumulatedWidths += width;
        }
        var maxWidthPerOtherTab;
        if (lastTabNarrowEnough < 0) {
            maxWidthPerOtherTab = maxWidth / numTabs;
        } else {
            var baseWidth = parseInt(otherTabs[lastTabNarrowEnough].attr('originalWidth'));
            var numEllipsifiedTabs = (numTabs - 1) - lastTabNarrowEnough;
            var pixelsAvailable = maxWidth - (accumulatedWidths + (baseWidth * numEllipsifiedTabs));
            maxWidthPerOtherTab = baseWidth + (pixelsAvailable / numEllipsifiedTabs);
        }
        return maxWidthPerOtherTab;
    }
};

// ********************* END SOURCE JACKED FROM PIVOTAL TRACKER

var toggle_blocked = function() {
  jQuery('.item').has('.storyLabels > [title*=blocked_]').each(function() {
    $(this).closest('.item').toggle();
  });
}

var toggle_accepted = function() {
  $('#current .item .accepted').toggle();
}

var toggle_focused_mode = function() {
  $('#header').toggle();
  $('#controlPanel').toggle();
}

// toggle_focused_mode();
toggle_accepted();
toggle_blocked();

// ProjectTabResizer.resizeTabs(jQuery(window).width());

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
