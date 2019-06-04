(function ($) {
    'use strict';

    var browserWindow = $(window);

    // :: 1.0 Preloader Active Code
    browserWindow.on('load', function () {
        $('.preloader').fadeOut('slow', function () {
            $(this).remove();
        });
    });

    // :: 2.0 Nav Active Code
    if ($.fn.classyNav) {
        $('#magNav').classyNav();
    }

    // :: 3.0 Sticky Active Code
    if ($.fn.sticky) {
        $("#sticker").sticky({
            topSpacing: 0
        });
    }

    // :: 4.0 Sliders Active Code
    if ($.fn.owlCarousel) {

        var welcomeSlides = $('.hero-area');

        welcomeSlides.owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 5000,
            smartSpeed: 1000
        });

        welcomeSlides.on('translate.owl.carousel', function () {
            var slideLayer = $("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).removeClass('animated ' + anim_name).css('opacity', '0');
            });
        });

        welcomeSlides.on('translated.owl.carousel', function () {
            var slideLayer = welcomeSlides.find('.owl-item.active').find("[data-animation]");
            slideLayer.each(function () {
                var anim_name = $(this).data('animation');
                $(this).addClass('animated ' + anim_name).css('opacity', '1');
            });
        });

        $("[data-delay]").each(function () {
            var anim_del = $(this).data('delay');
            $(this).css('animation-delay', anim_del);
        });

        $("[data-duration]").each(function () {
            var anim_dur = $(this).data('duration');
            $(this).css('animation-duration', anim_dur);
        });

        $('.trending-post-slides').owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1500: {
                    items: 3
                }
            }
        });

        $('.featured-video-posts-slide').owlCarousel({
            items: 1,
            margin: 0,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000
        });

        $('.most-viewed-videos-slide').owlCarousel({
            items: 3,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1500: {
                    items: 3
                }
            }
        });

        $('.sports-videos-slides').owlCarousel({
            items: 2,
            margin: 30,
            loop: true,
            nav: true,
            navText: ['<i class="ti-angle-left"></i>', '<i class="ti-angle-right"></i>'],
            dots: false,
            autoplay: true,
            autoplayTimeout: 4000,
            smartSpeed: 1000,
            responsive: {
                0: {
                    items: 1
                },
                992: {
                    items: 2
                },
                1200: {
                    items: 1
                },
                1500: {
                    items: 2
                }
            }
        });
    }

    // :: 5.0 ScrollUp Active Code
    if ($.fn.scrollUp) {
        browserWindow.scrollUp({
            scrollSpeed: 1500,
            scrollText: '<i class="ti-angle-up"></i>'
        });
    }

    // :: 6.0 Tooltip Active Code
    if ($.fn.tooltip) {
        $('[data-toggle="tooltip"]').tooltip();
    }

    // :: 7.0 Prevent Default a Click
    $('a[href="#"]').on('click', function (e) {
        e.preventDefault();
    });

    // :: 8.0 Wow Active Code
    if (browserWindow.width() > 767) {
        new WOW().init();
    }
    $("#tagidCul").mouseenter(function(){
        $("#defaulttag").hide();
        $("#tagdivCul").show();
        $("#tagdivPol").hide();
        $("#tagdivSci").hide();
        $("#tagdivEco").hide();
        $("#tagdivMil").hide();
    });
    $("#tagidPol").mouseenter(function(){
        $("#defaulttag").hide();
        $("#tagdivCul").hide();
        $("#tagdivPol").show();
        $("#tagdivSci").hide();
        $("#tagdivEco").hide();
        $("#tagdivMil").hide();
    });
    $("#tagidSci").mouseenter(function(){
        $("#defaulttag").hide();
        $("#tagdivCul").hide();
        $("#tagdivPol").hide();
        $("#tagdivSci").show();
        $("#tagdivEco").hide();
        $("#tagdivMil").hide();
    });
    $("#tagidEco").mouseenter(function(){
        $("#defaulttag").hide();
        $("#tagdivCul").hide();
        $("#tagdivPol").hide();
        $("#tagdivSci").hide();
        $("#tagdivEco").show();
        $("#tagdivMil").hide();
    });
    $("#tagidMil").mouseenter(function(){
        $("#defaulttag").hide();
        $("#tagdivCul").hide();
        $("#tagdivPol").hide();
        $("#tagdivSci").hide();
        $("#tagdivEco").hide();
        $("#tagdivMil").show();
    });
    $("#postcatagory").change(function(){
        if($(this).val() =="culture"){
        $("#culture").show();
        $("#politics").hide();
        $("#science").hide();
        $("#economy").hide();
        $("#military").hide();
    }
     else if($(this).val() =="politics"){
        $("#culture").hide();
        $("#politics").show();
        $("#science").hide();
        $("#economy").hide();
        $("#military").hide();
    }
     else if($(this).val() =="science"){
       $("#culture").hide();
        $("#politics").hide();
        $("#science").show();
        $("#economy").hide();
        $("#military").hide();
    }
     else if($(this).val() =="economy"){
        $("#culture").hide();
        $("#politics").hide();
        $("#science").hide();
        $("#economy").show();
        $("#military").hide();
    }
     else if($(this).val() =="military"){
        $("#culture").hide();
        $("#politics").hide();
        $("#science").hide();
        $("#economy").hide();
        $("#military").show();
    }
   

    });
    
     $("#culture").show();
        $("#politics").hide();
        $("#science").hide();
        $("#economy").hide();
        $("#military").hide();

        //JQuery for user show
     $("#login").show();
     $("#regis").show();
     $("#user").hide();
     if (typeof(Storage) !== "undefined") {

         $("#logout").click(function(){
             localStorage.setItem("logouted", "yes");
             localStorage.setItem("signined", "no");

         });
         $("#signin").click(function(){
             localStorage.setItem("signined", "yes");
             if($("#exampleInputEmail1").val()=="admin"&&$("#exampleInputPassword1").val()=="1")
             {
                 localStorage.setItem("powerful", "admin");
             }
             else if($("#exampleInputEmail1").val()=="writer"&&$("#exampleInputPassword1").val()=="1")
             {
                 localStorage.setItem("powerful", "writer");
             }
             else if($("#exampleInputEmail1").val()=="editor"&&$("#exampleInputPassword1").val()=="1")
             {
                 localStorage.setItem("powerful", "editor");
             }
             else if($("#exampleInputEmail1").val()=="subscriber"&&$("#exampleInputPassword1").val()=="1")
             {
                 localStorage.setItem("powerful", "subscriber");
             }
             else{
                 alert("Tài khoản không tồn tại!");
                 localStorage.setItem("powerful", "ngu");
             }
           
         });
         if(localStorage.getItem("logouted")=="yes"){
             $("#login").show();
             $("#regis").show();
             $("#user").hide();

         }
         if(localStorage.getItem("signined")=="yes"&&localStorage.getItem("powerful")=="admin"){
             $("#login").hide();
             $("#regis").hide();
             $("#user").show();
             $("#writerpost").hide();
             $("#editorpost").hide();
         }
         else if(localStorage.getItem("signined")=="yes"&&localStorage.getItem("powerful")=="editor"){
             $("#login").hide();
             $("#regis").hide();
             $("#user").show();
             $("#writerpost").hide();
             $("#adminpost").hide();
         }
         else if(localStorage.getItem("signined")=="yes"&&localStorage.getItem("powerful")=="writer"){
             $("#login").hide();
             $("#regis").hide();
             $("#user").show();
             $("#editorpost").hide();
             $("#adminpost").hide();
         }
         else if(localStorage.getItem("signined")=="yes"&&localStorage.getItem("powerful")=="subscriber"){
            $("#login").hide();
            $("#regis").hide();
            $("#user").show();
            $("#writerpost").hide();
            $("#editorpost").hide();
            $("#adminpost").hide();
        }
         else{
             $("#login").show();
             $("#regis").show();
             $("#user").hide();
         }
            
  
        }
         $('#usercheck').hide();
         $('#emailcheck').hide();
         $('#passcheck').hide();
         $('#repasscheck').hide();
          var user_err =true;
            var email_err = true;
            var pass_err = true;
            var repass_err = true;

            $('#exampleInputUserName1').keyup(function(){
                username_check();
            });

            function username_check()
            {
                var user_val = $('#exampleInputUserName1').val();
                if(user_val.length ==''){
                    $('#usercheck').show();
                    $('#usercheck').html("Please Fill the username");
                    $('#usercheck').focus();    
                    $('#usercheck').css("color","red"); 
                    user_err = false;
                    return false;   
                }
                else{
                    $('#usercheck').hide();
                }

                if((user_val.length < 5)||(user_val.length >20)){
                    $('#usercheck').show();
                    $('#usercheck').html("Username length must be between 5 and 20");
                    $('#usercheck').focus();    
                    $('#usercheck').css("color","red"); 
                    user_err = false;
                    return false;   
                }
                else{
                    $('#usercheck').hide();
                }
            }

            $('#exampleInputEmail1').keyup(function(){
                email_check();
            });

            function email_check()
            {
                var email_val = $('#exampleInputEmail1').val();
                if(email_val.length =='')
                {
                    $('#emailcheck').show();
                    $('#emailcheck').html("Please Fill the email");
                    $('#emailcheck').focus();    
                    $('#emailcheck').css("color","red"); 
                    email_err = false;
                    return false;   
                }
                else{
                    $('#emailcheck').hide();
                }

                var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                if(!re.test(email_val)){
                    $('#emailcheck').show();
                    $('#emailcheck').html("Email is invalid");
                    $('#emailcheck').focus();    
                    $('#emailcheck').css("color","red"); 
                    email_err = false;
                    return false;   
                }
                else{
                    $('#emailcheck').hide();
                }
            }

            $('#exampleInputPassword1').keyup(function(){
                password_check();
            });

            function password_check()
            {
                var password_val = $('#exampleInputPassword1').val();

                if(password_val.length ==''){
                    $('#passcheck').show();
                    $('#passcheck').html("Please Fill the password");
                    $('#passcheck').focus();    
                    $('#passcheck').css("color","red"); 
                    pass_err = false;
                    return false;   
                }
                else{
                    $('#passcheck').hide();
                }

                if((password_val.length < 6)||(password_val.length >20)){
                    $('#passcheck').show();
                    $('#passcheck').html("Password length must be between 6 and 20");
                    $('#passcheck').focus();    
                    $('#passcheck').css("color","red"); 
                    pass_err = false;
                    return false;   
                }
                else{
                    $('#passcheck').hide();
                }
            }

            $('#exampleInputRetypePassword1').keyup(function(){
                repassword_check();
            });

            function repassword_check(){
                var repassword = $('#exampleInputRetypePassword1').val();
                var password = $('#exampleInputPassword1').val();

                if(repassword != password){
                    $('#repasscheck').show();
                    $('#repasscheck').html("Password are not matching");
                    $('#repasscheck').focus();    
                    $('#repasscheck').css("color","red"); 
                    repass_err = false;
                    return false;   
                }
                else{
                    $('#repasscheck').hide();
                }
                
            }

            $('#signup').click(function(){
                var user_err =true;
                var email_err = true;
                var pass_err = true;
                var repass_err = true;

                username_check();
                email_check();
                password_check();
                repassword_check();

                if((user_err == true) && (email_err == true) && (pass_err == true) && (repass_err==true)){
                   return true;
                }
                
                else {
                   return false;
                    
                }
            });
})(jQuery);