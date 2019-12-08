$('.select-form select').each(function() {
    var $this = $(this)
        , numberOfOptions = $(this).children('option').length;
    $this.addClass('select_hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<p class="select_styled"></p>');

    var $styledSelect = $this.next('p.select_styled');

    $styledSelect.text($this.children('option').eq(0).text());

    var $list = $('<ul />', {
        'class': 'select_options'
    }).insertAfter($styledSelect);

    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    var $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select_styled.active').not(this).each(function() {
            $(this).removeClass('active').next('ul.select_options').hide();
        });
        $(this).toggleClass('active').next('ul.select_options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.hide();
        $("input[type='submit'].filterApply").trigger('click');
    });
    $(document).click(function() {
        $styledSelect.removeClass('active');
        $list.hide();
    });
});

$('.js-header-menu').on('click', function (e) {
    $(this).toggleClass('active');
    $('.header-nav_wrap').toggleClass('active');
});

$('.js-sidebar-menu').on('click', function (e) {
    $(this).toggleClass('active');
    //$('html').toggleClass('fixed');
    $('.categories-filter').toggleClass('active');
});

$('.categories-nav_item').on('click', function (e) {
    $(this).toggleClass('active');
});

var index__slider = new Swiper('.index__slider-wrap', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    setWrapperSize: false,
    pagination: {
        el: '.pagination',
        clickable: true,
        bulletClass: 'dot',
        bulletActiveClass: 'active'
    }
});

$(function(){
    $(".js-phone").mask("+7 999 999 99 99");
});

$(document).ready(function() {
    $('.js-modal-link_btn').click(function(e) {
        e.preventDefault();

        let id = '#' + $(this).attr('data-href');
        let title = $(this).attr('data-title');
        let btnTitle = $(this).attr('data-btnTitle');
        let modalTitle = $('.modal-form_title');
        let modalBtnTitle = $('.js-modal-form_btn');

        //$('html').addClass('fixed');
        $('.overlay').fadeIn(200);
        $(id).fadeIn(500);
        $(modalTitle).text(title);
        $(modalBtnTitle).text(btnTitle);
    });

    $('.js-close-btn').click(function (e) {
        e.preventDefault();
        $('.overlay').fadeOut(200);
        $('.modal').fadeOut(500);
        //$('html').removeClass('fixed');
    });

    $('body').on('click', '.overlay', function(event) {
        event.preventDefault();
        $('.overlay').fadeOut(200);
        $('.modal').fadeOut(500);
        //$('html').removeClass('fixed');
    });
});

$(document).ready(function() {
    let input = $('#categories_filter-form_input');
    let label = $('#categories_filter-form_label span');

    input.focus(function(){
        label.addClass('hidden');
    });

    input.blur(function(){
        label.removeClass('hidden');
    });
});

$(document).ready(function() {
    let img = $('.js-services-block__img');

    img.each(function () {
        let article = $(this).parent().parent().parent();
        let imgBg = $(this).attr('src');
        let imgSrc = 'url("' + imgBg + '") center center no-repeat';
        article.css('background',imgSrc);
        article.css('background-size','cover');
    });
});

$(document).ready(function() {
    let img = $('.js-index-slider_img');

    img.each(function () {
        let article = $(this).parent().parent().parent();
        let imgBg = $(this).attr('src');
        let imgSrc = 'url("' + imgBg + '") center center no-repeat';
        article.css('background',imgSrc);
        article.css('background-size','cover');
    });
});