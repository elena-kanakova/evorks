"use strict";

$('.select-form select').each(function() {
    let $this = $(this);
    let numberOfOptions = $(this).children('option').length;
    $this.addClass('select_hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<p class="select_styled"></p>');

    let $styledSelect = $this.next('p.select_styled');

    $styledSelect.text($this.children('option').eq(0).text());

    let $list = $('<ul />', {
        'class': 'select_options'
    }).insertAfter($styledSelect);

    for (let i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    let $listItems = $list.children('li');

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

$('.master_form select').each(function() {
    let $this = $(this);
    let numberOfOptions = $(this).children('option').length;
    $this.addClass('select_hidden');
    $this.wrap('<div class="select"></div>');
    $this.after('<p class="select_styled"></p>');

    let $styledSelect = $this.next('p.select_styled');

    $styledSelect.text($this.children('option').eq(0).text());

    let $list = $('<ul />', {
        'class': 'select_options'
    }).insertAfter($styledSelect);

    for (let i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    let $listItems = $list.children('li');

    $styledSelect.click(function(e) {
        e.stopPropagation();
        $('div.select_styled.active').not(this).each(function() {
            $(this).removeClass('active').next('ul.select_options').hide();
        });
        $(this).toggleClass('active').next('ul.select_options').toggle();
    });

    $listItems.click(function(e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active').addClass('selected');
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
    $(this).toggleClass('nav-btn_active');
    $('.header-nav_wrap').toggleClass('header-nav_active');
});

$('.js-sidebar-menu').on('click', function (e) {
    $(this).toggleClass('left-sidebar_active');
    //$('html').toggleClass('fixed');
    $('.categories-filter').toggleClass('categories-filter_active');
});

$('.categories-nav_item').on('click', function (e) {
    $(this).toggleClass('categories-nav_item_active');
});

let index__slider = new Swiper('.index__slider-wrap', {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    setWrapperSize: false,
    autoHeight: false,
    pagination: {
        el: '.pagination',
        clickable: true,
        bulletClass: 'dot',
        bulletActiveClass: 'active'
    },
    breakpoints: {
        768: {
            autoHeight: true
        }
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
        if(document.getElementById("categories_filter-form_input").value === '') {
            label.removeClass('hidden');
        }
        else {
            label.addClass('hidden');
        }
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
        let article = $(this).parent().parent();
        let imgBg = $(this).attr('src');
        let imgSrc = 'url("' + imgBg + '")';
        article.css('background-image',imgSrc);
    });
});

$(document).ready(function() {
    $('.js-open').on('click', function () {
        $(this).toggleClass('faq-item_active');
    });
});

$(window).on('load resize', function() {
    if ($(window).width() <= 1280) {
        $('.footer-inner__items-wrap:not(.slick-initialized)').slick({
            centerMode: true,
            autoplay: true,
            dots: false,
            infinite: true,
            speed: 200,
            slidesToShow: 1,
            slidesToScroll: 1,
            variableWidth: true
        });
    } else {
        $(".footer-inner__items-wrap.slick-initialized").slick("unslick");
    }
});

$(document).ready(function() {
    let $btnNextStep1 = $('.evorker__form__step-1_wrap .js-btn-step');
    let $btnNextStep2 = $('.evorker__form__step-2_wrap .js-btn-next');
    let $btnPrevStep2 = $('.evorker__form__step-2_wrap .js-btn-prev');
    let $btnPrevStep3 = $('.evorker__form__step-3_wrap .js-btn-prev');
    let $btnNextStep3 = $('.evorker__form__step-3_wrap .js-btn-step');
    let $btnPrevStep4 = $('.evorker__form__step-4_wrap .js-btn-prev');

    $btnNextStep1.click(function (e) {
        e.preventDefault();
        $('.evorker__form__step-1_wrap').addClass('none');
        $('.evorker__form__step-2_wrap').removeClass('none').addClass('active');
        $('.js-step-2__title').addClass('step-active');
        $('.js-step-1__title').removeClass('step-active').addClass('done');
    });

    $btnPrevStep2.click(function (e) {
        e.preventDefault();
        $('.evorker__form__step-2_wrap').addClass('none').removeClass('done');
        $('.evorker__form__step-1_wrap').removeClass('none').addClass('active');
        $('.js-step-1__title').addClass('step-active');
        $('.js-step-2__title').removeClass('step-active').removeClass('done');
    });

    $btnNextStep2.click(function (e) {
        e.preventDefault();
        $('.evorker__form__step-2_wrap').removeClass('active').addClass('none');
        $('.evorker__form__step-3_wrap').removeClass('none').addClass('active');
        $('.js-step-3__title').addClass('step-active');
        $('.js-step-2__title').removeClass('step-active').addClass('done');
    });

    $btnPrevStep3.click(function (e) {
        e.preventDefault();
        $('.evorker__form__step-3_wrap').addClass('none').removeClass('done');
        $('.evorker__form__step-2_wrap').removeClass('none').addClass('active');
        $('.js-step-2__title').addClass('step-active');
        $('.js-step-3__title').removeClass('step-active').removeClass('done');
    });

    $btnNextStep3.click(function (e) {
        e.preventDefault();
        $('.evorker__form__step-3_wrap').addClass('none');
        $('.evorker__form__step-4_wrap').removeClass('none').addClass('active');
        $('.js-step-3__title').removeClass('step-active').addClass('done');
    });

    $btnPrevStep4.click(function (e) {
        e.preventDefault();
        $('.evorker__form__step-4_wrap').addClass('none').removeClass('done');
        $('.evorker__form__step-3_wrap').removeClass('none').addClass('active');
        $('.js-step-3__title').addClass('step-active').removeClass('done');
    });
});

$(document).ready(function() {
    let $quantityArrowMinus = $(".js-evorker-form__btn-arrow-minus");
    let $quantityArrowPlus = $(".js-evorker-form__btn-arrow-plus");

    $quantityArrowMinus.click(
        function (e) {
            e.preventDefault();
            let $quantityNum = $(this).siblings('.js-evorker-form__input-number');
            if ($quantityNum.val() > 1) {
                $quantityNum.val(+$quantityNum.val() - 1);
            }
        }
    );

    $quantityArrowPlus.click(
        function (e) {
            e.preventDefault();
            let $quantityNum = $(this).siblings('.js-evorker-form__input-number');
            $quantityNum.val(+$quantityNum.val() + 1);
        }
    );
});

function check(){
    let x = document.getElementById("evorker-form__file");
    let txt = "";
    if ('files' in x) {
        if (x.files.length !== 0) {
            $('.input-file_wrap .plus').addClass('none');
            $('.input-file_wrap .text').addClass('none');
            $('.input-file_wrap #info').addClass('show');

            for (let i = 0; i < x.files.length; i++) {
                txt += "" + (i+1) + ". файл<br>";
                let file = x.files[i];
                if ('name' in file) {
                    txt += "Имя: " + file.name + "<br><br>";
                }
            }
        } else {
            $('.input-file_wrap .plus').removeClass('none');
            $('.input-file_wrap .text').removeClass('none');
            $('.input-file_wrap #info').removeClass('show');
        }
    }
    document.getElementById("info").innerHTML = txt;
}

$.mask.definitions['~']='[+-]';
$("#evorker-form__time").mask("99:99", {placeholder: "00:00" });