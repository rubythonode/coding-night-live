// another person may have been updated the editor string
cnl_slides.setSlideText = function(str) {
  // another person updated
  if(str != cnl_globals.editor.codemirror.doc.getValue()) {
    var curr_cursor = cnl_globals.editor.codemirror.doc.getCursor();
    cnl_globals.editor.codemirror.doc.setValue(str);
    cnl_globals.editor.codemirror.doc.setCursor(curr_cursor);
  }

  this.curr_slide_text = str;
  var out = document.getElementById("out");
  out.innerHTML = cnl_globals.md.render(str);
  $('blockquote').addClass('blockquote');
}

// get new slide from server
cnl_slides.getNewSlide = function(data) {
  // debug: get new_idx from server
  var new_idx = data;
  //var new_idx = Math.floor(Math.random() * (1000));
  console.log('got new index from server : ' + new_idx);
  // debug end
  $('#slide_list').append('<li id="slide_' + new_idx + '" class="list-group-item drawer-menu-item" onclick="cnl_slides.setSlideIndex(' + new_idx + ')">Unnamed slide</li>');
  return new_idx;
}


// delete slide with index "idx", then click on adjacent slide
cnl_slides.delSlide = function(idx) {
  // called from modal
  if(typeof idx == 'undefined') {
    idx = this.curr_slide_idx;
  }

  // debug: remove idx from server
  console.log('deleted ' + idx);
  // debug end

  var curr_slide = $('#slide_' + idx);
  var next_slide_idx = 0;

  if(idx === this.curr_slide_idx) {
    // If more slides, get new one
    if($('li.drawer-menu-item').length === 1) {
      next_slide_idx = this.getNewSlide();
    }
    // Else, find adjacent slides
    else {
      var next_slide = curr_slide.next();
      if(next_slide.length === 0) {
        next_slide = curr_slide.prev();
      }
      next_slide_idx = parseInt(next_slide.attr('id').split('_')[1]);
    }
    // move to selected slide
    this.setSlideIndex(next_slide_idx);
  }

  // remove from drawer
  curr_slide.remove();
}

// change order of slide with index "idx" to previous of slide with index "next"
// overriden version should have websocket
cnl_slides.changeSlideOrder = function(idx, next) {
  // debug: send idx, next
  console.log(idx + ' and ' + next + ' send to server');
  // debug end
  
  if(next !== 0) {
    $('#slide_' + idx).detach().insertBefore('#slide_' + next);
  }
  else {
    // it is last element
    $('#slide_' + idx).detach().appendTo('#slide_list');
  }
}

// renaming slide
// overriden version should have websocket & modal consideration
cnl_slides.renameSlide = function(idx, name) {
  // called from modal
  if(typeof idx == 'undefined') {
    var idx = this.curr_slide_idx;
    var name = $('#slide_name_input').val();
    if(!name) name = 'unnamed slide'; // default value
  }

  if(name != $('#slide_' + idx).text()) {
    // debug: send to server
    console.log('slide ' + idx + ' renamed to ' + name);
    // end debug
    $('#slide_' + idx).text(name);
    if(idx === this.curr_slide_idx) {
      $('#markdown_title').text(name);
    }
  }
}

