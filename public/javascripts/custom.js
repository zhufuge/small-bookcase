$(document).ready(function() {

  function setBadge(badge) {
    var num = $(badge).children().length;
    if (num !== 0) {
      $(badge + '-badge').text(num);
    }
  }

  function changeTab(index, tab) {
    var $tab = $(tab + '-badge').parent();

    $tab.click(function() {
      $('li[role="presentation"][class="active"]').removeClass("active");
      $(this).parent().addClass("active");

      justShowTab(index);
    });
  }

  function justShowTab(index) {
    $.each(affairs, function(i, v) {
      if (index === i) {
        $(v).show();
      } else {
        $(v).hide();
      }
    });
  }

  var affairs = [
    '.order',
    '.deliver',
    '.finish'
  ];

  justShowTab(0);

  $.each(affairs, function(i, v) {
    setBadge(v);
    changeTab(i, v);
  });
});
