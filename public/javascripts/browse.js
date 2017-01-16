$(document).ready(function() {
  var $imga = $('.book-img-a');
  var $img;
  var $name;

  var href;
  $imga.hover(function() {
    $img = $(this).find('img');
    $img.attr('style', 'border-color: #3071A9');

    href = $(this).attr('href');
    $name = $('a[href="' + href + '"]').find('p');
    $name.attr('style', 'color: #3071A9;text-decoration: underline');
  }, function() {
	$img.removeAttr('style');
    $name.removeAttr('style');
  });

  var $cate = $('.cate');
  var $book = $('.book-item');

  $cate.click(function() {
    $('li[cate][class="active"]').removeClass("active");
    $(this).parent().addClass("active");

    var cate = $(this).parent().attr("cate");

    if (cate == "0") {
      $book.each(function() {
        $(this).show();
      });
    } else {
      $book.each(function() {
        if ($(this).attr('in_cate') == cate) {
          $(this).show();
        } else {
          $(this).hide();
        }
      });
    }
  });
});
