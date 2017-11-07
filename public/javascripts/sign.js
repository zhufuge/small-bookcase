$(document).ready(function(){
  var $in = $('.signin');
  var $up = $('.signup');
  var $in_ = $('.signin_');
  var $up_ = $('.signup_');

  document.title = '登录-小书箱';
  $in.show();
  $up.hide();

  $in_.click(function(){
    $up_.removeClass('active');
    $(this).addClass('active');

    $up.hide();
    $in.show();
    document.title = '登录-小书箱';
  });

  $up_.click(function(){
    $in_.removeClass('active');
    $(this).addClass('active');

    $in.hide();
    $up.show();
    document.title = '注册-小书箱';
  });

});
