var cnl_notices = {
  newNotice: function(obj) {
    var preappended_elem = $('#shown-notice').find('div.notice-with-time').detach();
    if(preappended_elem.length !== 0) {
      preappended_elem.prependTo('#hidden-notice');
    }

    $('#shown-notice').append('\
        <div class="notice-with-time">\
        <p class="card-text" style="margin-bottom: 0px;">' + obj.description + '</p>\
        <p class="card-text text-muted" style="text-align:right;">' + obj.time + '</p>\
        </div>');
  },

  newChat: function(obj) {
    var is_end_of_scroll = $('#chat_list_scroll').scrollTop() === $('#chat_list_scroll')[0].scrollHeight - $('#chat_list_scroll').height();
    var appended_elem = 0;
    if(obj.is_reply) {
      appended_elem = $('\
          <div style="float: left; width: 30px; margin-top: 10px;"><i class="fa fa-reply" aria-hidden="true"></i></div>\
          <div class="card" style="margin-left:30px;">\
          <div class="card-block">\
          <p class="card-text">' + obj.description + '</p>\
          </div>\
          </div>');
      $('#chat_list_items').find('#chat_' + obj.hash_value).append(appended_elem);
    }
    else {
      appended_elem = $('\
          <div id="chat_' + obj.hash_value + '">\
          <div class="card">\
          <div class="card-header" style="padding-left: .5rem;">\
          <div style="float:left; margin-right: 10px;"><i class="fa fa-commenting-o" aria-hidden="true"></i> ' + obj.hash_value + '</div> <div style="margin:0;font-size:.5em;" align="right">' + obj.time + '</div>\
          </div>\
          <div class="card-block">\
          <p class="card-text">' + obj.description + '</p>\
          </div>\
          </div>');
      $('#chat_list_items').append(appended_elem);
    }
    if(is_end_of_scroll) {
      $('#chat_list_scroll').animate({scrollTop: appended_elem.position().top}, 'slow');
    }
    else {
      if($('#chat_scroll_button').css('visibility') == 'hidden') {
        toBeScrolledPosition(appended_elem.position().top);
        $('#chat_scroll_button').css('visibility', 'visible');
      }
    }
  },

};
