$(document).ready(function(){
  var $in = $('.signin');
  var $up = $('.signup');
  var $in_ = $('.signin_');
  var $up_ = $('.signup_');

  $in.show();
  $up.hide();

  $in_.click(function(){
    $up_.removeClass('active');
    $(this).addClass('active');

    $up.hide();
    $in.show();
  });

  $up_.click(function(){
    $in_.removeClass('active');
    $(this).addClass('active');

    $in.hide();
    $up.show();
  });

});
