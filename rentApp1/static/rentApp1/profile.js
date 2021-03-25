$("#id_first_name").attr("placeholder", "Ad")
$("#id_last_name").attr("placeholder", "Soyad")
$("#id_username").attr("placeholder", "İstifadəçi adı")
$("#id_username_2").attr("placeholder", "İstifadəçi adı")
$("#id_email").attr("placeholder", "Email")
$("#id_password").attr("placeholder", "Şifrə")
$("#id_password1").attr("placeholder", "Şifrə")
$("#id_password2").attr("placeholder", "Şifrə təkrar")
$("#id_password_new").removeAttr("required")

let imgheight = ($(".pfp-btn").outerHeight())*($(".pfp-btn").length)

$(".img-list-p").click(function()   {
    if ($(".pfp-form").innerHeight() == 0)  {
        $(".pfp-form").css({
            "height": imgheight+"px",
            "opacity": "1",
            "transform": "translateY(100%)"
        })
        $(".pfp-button").css({
            "transition": "0.3s ease 0.08s"
        })
        $(".clean-pfp").css({
            "transition": "0.3s ease 0.18s"
        })
        $(".pfp-btn").css({
            "opacity": "1",
            "transform": "translateY(0)",
        })
    } else {
        $(".pfp-form").css({
            "height": 0,
            "opacity": "0",
            "transform": "translateY(80%)"
        })
        $(".pfp-btn").css({
            "opacity": 0,
            "transform": "translateY(-10px)",
            "transition": "0.3s ease 0s"
        })
    }
    
})

$(".pfp-button").click(function()   {
    $("#id_pfp").click()
})

$("#id_pfp").on("change", function()    {
    $(".pfp-form").submit()
})

$(".clear-pfp").click(function()    {
    $(".pfp-in").val("0")
    $(".pfp-form").submit()
})


hamburger2 = $("#hamburger")
navUl = $(".nav-ul");
$("#id_username_log_lable").find("#id_username").attr("id", "id_username_1")
$(".registerForm").find("#id_username").attr("id", "id_username_2")



hamLine = $(".ham-line")
hamLine1 = $(".ham-line-1")
hamLine2 = $(".ham-line-2")
hamburgerCont = $(".hamburger-cont")
navMenu = $(".nav-menu")
wrapDiv = $(".wrap")
hamLink = $(".ham-link");

hamLineTop = hamLine1.css("top");
bodyWrap = $(".body-wrap")

$(window).on('resize', function()   {
    if (hamLine1.css("top") != hamLineTop)    {
        open_menu()
    } else {
        close_menu()
    }
})

if (window.outerWidth >= 992)   {
    navMenuWidth = 0
} else {
    navMenuWidth = -navMenu.outerWidth()+"px"
}

navMenu.css("left", navMenuWidth)

hamburgerCont.click(function()  {
    if (hamLine1.css("top") == hamLineTop)    {
        open_menu()
    } else {
        close_menu()
    }
})

wrapDiv.click(function()    {
    close_menu()
})

hamLink.click(function()    {
    if (hamLine1.css("top") == hamLineTop)    {
        open_menu()
    } else {
        close_menu()
    }
})


function close_menu()   {
    hamLine1.removeClass("ham-line-1-open")
    hamLine2.removeClass("ham-line-2-open");
    if (window.outerWidth >= 992)   {
        navMenuWidth = 0
    } else {
        navMenuWidth = -navMenu.outerWidth()+"px"
    }

    navMenu.stop().animate({
        "left" : navMenuWidth
    }, 500)
    wrapDiv.stop().animate({
        "background-color": "rgba(29, 29, 31, 0)",
    }, function(){
        wrapDiv.css("z-index", "-1")
    })
 
    logUserBtn.removeClass("user-button-active")
    logUserBtnAfter.removeClass("user-button-after-active")
    closePassInput()
    closeBtnInput()
}

function open_menu()    {
    hamLine1.addClass("ham-line-1-open")
    hamLine2.addClass("ham-line-2-open");
    navMenu.stop().animate({
        "left" : "0"
    }, 500)
    wrapDiv.css("z-index", "1000").stop().animate({
        "background-color": "rgba(29, 29, 31, 0.452)",
    })
}