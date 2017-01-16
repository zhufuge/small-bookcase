$(document).ready(function() {

  function set_badge(badge) {
    var num = $(badge).children().length;
    if (num !== 0) {
      $(badge + '-badge').text(num);
    }
  }

  function change(tab) {
    var $tab = $(tab + '-badge').parent();

    $tab.click(function() {
      $('li[role="presentation"][class="active"]').removeClass("active");
      $(this).parent().addClass("active");

      $(order).hide();
      $(deliver).hide();
      $(finish).hide();

      $(tab).show();
    });
  }

  var order = ".order";
  var deliver = ".deliver";
  var finish = ".finish";

  $(deliver).hide();
  $(finish).hide();

	set_badge(order);
	set_badge(deliver);
	set_badge(finish);

  change(order);
  change(deliver);
  change(finish);

});
