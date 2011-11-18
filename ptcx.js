PTCX = function() {
  var onlyShowingAcceptance = false;
  var onlyShowingBlocked = false;
  var onlyShowingNeedsEstimation = false;
  var onlyShowingInFlight = false;
  return {
    toggle_blocked: function() {
      jQuery('.item').has('.storyLabels > [title*=blocked_]').each(function() {
        $(this).closest('.item').fadeToggle();
      });
    },
    toggle_only_needs_estimation: function() {
      if (onlyShowingNeedsEstimation) {
        onlyShowingNeedsEstimation = false;
        $(this).find("li").css("list-style-type", "circle");
        $('.item').fadeIn();
      } else {
        onlyShowingNeedsEstimation = true;
        $(this).find("li").css("list-style-type", "disc");
        $('.item').hide();
        $('.storyLabels > [title^=needs_estimation]').closest('.item').fadeIn();
        $('.estimateIcon[title=Unestimated]').closest('.item').fadeIn();
      }

    },
    toggle_only_stories_for_acceptance: function() {
      if (onlyShowingAcceptance) {
        onlyShowingAcceptance = false;
        $(this).find("li").css("list-style-type", "circle");
        $('.item').fadeIn();
      } else {
        onlyShowingAcceptance = true;
        $(this).find("li").css("list-style-type", "disc");
        $('.item').hide();
        $('.item > .finished, .item > .started, .item > .delivered').closest('.item').fadeIn();
      }
    },
    toggle_only_blocked: function() {
      if (onlyShowingBlocked) {
        onlyShowingBlocked = false;
        $(this).find("li").css("list-style-type", "circle");
        $('.item').fadeIn();
      } else {
        onlyShowingBlocked = true;
        $(this).find("li").css("list-style-type", "disc");
        $('.item').hide();
        $('.storyLabels > [title^=blocked_]').closest('.item').fadeIn();
      }
    },
    toggle_only_in_flight: function() {
      if (onlyShowingInFlight) {
        onlyShowingInFlight = false;
        $(this).find("li").css("list-style-type", "circle");
        $('.item').fadeIn();
      } else {
        onlyShowingInFlight = true;
        $(this).find("li").css("list-style-type", "disc");
        $('.item').hide();
        $('.item > .started').closest('.item').fadeIn();
      }
    },
    toggle_accepted: function() {
      $('#current .item .accepted').fadeToggle();
    },
    toggle_header: function() {
      $('#header').fadeToggle(function() {
        chrome.extension.sendRequest('redraw');
      });
    },
    insert_filtering_dropdown: function() {
      var stories_button = $('#stories_button');
      var dropdown = '<li class="dropdown">' +
                        '<a id="filter_button" class="tab button" href="#">Filter</a>' +
                        '<div class="knockout" style="display: none"></div>' +
                        '<div id="filter_dropdown" class="nav_dropdown" style="display: none;">' +
                          '<ul>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_blocked" href="#">' +
                                  '<ul><li>Toggle blocked</li></ul>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_only_needs_estimation" href="#">' +
                                  '<ul><li style="margin-left: 12px;">Toggle only needs estimation</li></ul>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +

                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_only_blocked" href="#">' +
                                  '<ul><li>Toggle only blocked</li></ul>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_only_stories_for_acceptance" href="#">' +
                                  '<ul><li>Toggle acceptance view</li></ul>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_accepted" href="#">' +
                                  '<ul><li>Toggle accepted</li></ul>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_only_in_flight" href="#">' +
                                  '<ul><li>Toggle only in-flight</li></ul>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_header" href="#">' +
                                  '<ul><li>Toggle header</li></ul>' +
                                '</a>'
                              '</div>' +
                            '</li>' +
                          '</ul>' +
                        '</div>' +
                      '</li>';

      stories_button.parent().after(dropdown);
      DropdownMenu.register('filter');
      $('#filter_button').css('background-position', '50px 8px');
      $('#filter_button').click(function() {
        var overlay = $('.overlay');
        if (overlay) {
          overlay.hide();
        }
      });
      $("#filter_dropdown .inner a li").css("margin-left", "12px");
      $("#filter_dropdown .inner a li").css("list-style-type", "circle");

      $('#toggle_blocked').click(PTCX.toggle_blocked);
      $('#toggle_only_blocked').click(PTCX.toggle_only_blocked);
      $('#toggle_only_needs_estimation').click(PTCX.toggle_only_needs_estimation);
      $('#toggle_accepted').click(PTCX.toggle_accepted);
      $('#toggle_only_stories_for_acceptance').click(PTCX.toggle_only_stories_for_acceptance);
      $('#toggle_only_in_flight').click(PTCX.toggle_only_in_flight);
      $('#toggle_header').click(PTCX.toggle_header);
    }
  }
}();

// This is jacked from Pivotal Tracker's source, then converted from
// Prototype to jQuery.

DropdownMenu = {
  register: function(name) {
    var button = $('#' + name + '_button');
    var dropdown = $('#' + name + '_dropdown');
    button.click(function(event) {
      var already_open = button.hasClass('active');
      DropdownMenu.deactivateAll();
      if (!already_open) {
        button.toggleClass('active');
        dropdown.toggle();
        dropdown.toggleClass('open');
        $(document).click(DropdownMenu.deactivateAll);
      }
      event.stopPropagation();
    });
  },
  deactivateAll: function() {
    $('.dropdown .active').removeClass('active');
    $('.dropdown .open').hide();
    $('.dropdown .open').removeClass('open');
    $(document).unbind('click', DropdownMenu.deactivateAll);
  }
};

PTCX.toggle_header();
PTCX.insert_filtering_dropdown();
