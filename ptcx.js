PTCX = function() {
  var onlyShowingAcceptance = false;
  var onlyShowingBlocked = false;
  return {
    toggle_blocked: function() {
      jQuery('.item').has('.storyLabels > [title*=blocked_]').each(function() {
        $(this).closest('.item').fadeToggle();
      });
    },
    toggle_only_stories_for_acceptance: function() {
      if (onlyShowingAcceptance) {
        onlyShowingAcceptance = false;
        $('.item').fadeIn();
      } else {
        onlyShowingAcceptance = true;
        $('.item').hide();
        $('.item > .finished, .item > .started, .item > .delivered').closest('.item').fadeIn();
      }
    },
    toggle_only_blocked: function() {
      if (onlyShowingBlocked) {
        onlyShowingBlocked = false;
        $('.item').fadeIn();
      } else {
        onlyShowingBlocked = true;
        $('.item').hide();
        $('.storyLabels > [title^=needs_estimation]').closest('.item').fadeIn();
        $('.storyLabels > [title^=blocked_]').closest('.item').fadeIn();
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
                                  '<span>Toggle blocked</span>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_only_blocked" href="#">' +
                                  '<span>Toggle only blocked</span>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_only_stories_for_acceptance" href="#">' +
                                  '<span>Toggle acceptance view</span>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_accepted" href="#">' +
                                  '<span>Toggle accepted</span>' +
                                '</a>' +
                              '</div>' +
                            '</li>' +
                            '<li>' +
                              '<div class="inner">' +
                                '<a id="toggle_header" href="#">' +
                                  '<span>Toggle header</span>' +
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
      $('#toggle_blocked').click(PTCX.toggle_blocked);
      $('#toggle_only_blocked').click(PTCX.toggle_only_blocked);
      $('#toggle_accepted').click(PTCX.toggle_accepted);
      $('#toggle_only_stories_for_acceptance').click(PTCX.toggle_only_stories_for_acceptance);
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
