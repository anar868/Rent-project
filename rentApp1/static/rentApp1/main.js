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
    navMenuWidth = -navMenu.outerWidth()+20+"px"
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
        navMenuWidth = -navMenu.outerWidth()+20+"px"
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

$(".id_email_2_label").children("input").attr({
    "id": "id_email_2",
    "placeholder": "Email"
})

formsSection = $(".forms-section")
formsContainer = $(".forms-all-container ")
logCloseBtn = $(".forms-close-btn")
logUserInput =  $("#id_username_1")
logPassInput =  $("#id_password")
logUserBtn = $(".user-button")
logUserBtnAfter = $(".user-button-after")
logPageBtn = $(".log-btn")
loginBtn = $(".loginBtn")
registerBtn = $(".register-btn")
logContainer = $(".login-form-container")
registerContainer = $(".signup-form-container")
logLogo = $(".log-logo")

$(window).click(function(event)    {
    if (hamLine1.css("top") != hamLineTop)    {
        if (event.target.className != "nav-menu" && event.target.className != "hamburger" && $("."+event.target.className).parents() != "nav-menu") {
            close_menu()
        } 
    }
    if (event.target.className == "forms-section") {
        formsSection.css("display", "none")
        formsContainer.css("opacity", "0")
    } 
    if (event.target.className == "error-screen-section") {
        closeErrorSection()
    } 
})



$(document).mousemove(function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
    if (mouseX < 10)    {
        if (formsSection.length)  {
            if (hamLine1.css("top") == hamLineTop && formsSection.css("display") == "none")    {
            open_menu()
            }
        } else if (hamLine1.css("top") == hamLineTop)    {
            open_menu()
        }
    }
})


logPageBtn.click(function(e) {
    e.preventDefault();
    registerContainer.css({"display": "none"})
    logContainer.css({"display": "block", "opacity":"1"})
    formsSection.css("display", "flex")
    setTimeout(function() {
        formsContainer.css("opacity", "1")
    }, 400);
    logLogo.removeClass("reg-logo")
    close_menu()
})


registerBtn.click(function(e)  {
    e.preventDefault();
    registerContainer.css({"display": "block", "opacity": "1"})
    for (i=0; i<registerContainerChildren.length; i++)    {
        registerContainerChildren[i].css({"opacity": "1", "bottom": "0"})
    }
    logContainer.css({"display": "none"})
    formsSection.css("display", "flex")
    setTimeout(function() {
        formsContainer.css("opacity", "1")
    }, 400);
    logLogo.addClass("reg-logo")
    close_menu()
})


logCloseBtn.click(function()    {
    $(".forms-section", window.parent.document).css("display", "none")
    $(".forms-all-container ", window.parent.document).css("opacity", "0")
})

function closePassInput()   {
    logUserInput.css({
        "border-radius": "6px"
    })
    logPassInput.css({
        "opacity": "0",
        "height": "0",
        "pointer-events": "none"
    })
    logPassInput.val("")
    closeBtnInput()
    logUserBtn.removeClass("user-button-active")
    logUserBtnAfter.removeClass("user-button-after-active").css({
        "transform": "rotate(-45deg)",
        "left": "6px",
        "top": "7px"
    })

}

function openPassInput()    {
    logUserInput.css({
        "border-bottom-left-radius": "0",
        "border-bottom-right-radius": "0",
    })
    logPassInput.css({
        "opacity": "1",
        "height": "45px",
        "pointer-events": "visible"
    })
    logUserBtn.addClass("user-button-active")
    logUserBtnAfter.addClass("user-button-after-active").css({
        "transform": "rotate(45deg)",
        "left": "8px",
        "top": "7px"
    })
}

function closeBtnInput()   {
    logPassInput.css({
        "border-bottom-left-radius": "6px",
        "border-bottom-left-radius": "6px",
    })
    loginBtn.css({
        "opacity": "0",
        "height": "0",
        "pointer-events": "none"
    })
    
    loginBtn.attr('disabled', true);
}

function openBtnInput()    {
    logPassInput.css({
        "border-bottom-left-radius": "0",
        "border-bottom-right-radius": "0",
    })
    loginBtn.css({
        "opacity": "1",
        "height": "45px",
        "pointer-events": "visible"
    })

    loginBtn.attr('disabled', false);
}

logUserInput.on("change paste keyup", function() {
    $(".login-error").css("height", "0")
    closePassInput()
    len = $(this).val().length
    logInFlag = false
    for (i = 0; i < len; i++) {
        if($(this).val()[i] != " ") {
            logInFlag = true
        }
    }
    if (!logInFlag)    { 
        logUserBtn.removeClass("user-button-active")
        logUserBtnAfter.removeClass("user-button-after-active")
        closePassInput()
    } else {
        logUserBtn.addClass("user-button-active")
        logUserBtnAfter.addClass("user-button-after-active")
    }
 });

 logUserInput.click(function()  {
    len = $(this).val().length
    logInFlag = false
    for (i = 0; i < len; i++) {
        if($(this).val()[i] != " ") {
            logInFlag = true
        }
    }
    if (!logInFlag)    { 
        logUserBtn.removeClass("user-button-active")
        logUserBtnAfter.removeClass("user-button-after-active")
        closePassInput()
    } else {
        logUserBtn.addClass("user-button-active")
        logUserBtnAfter.addClass("user-button-after-active")
    }   
 })


 logUserBtn.click(function()    {
    
    len = logUserInput.val().length
    logInFlag = false
    for (i = 0; i < len; i++) {
        if(logUserInput.val()[i] != " ") {
            logInFlag = true
        }
    }
    if (!logInFlag)    { 
        logUserBtn.removeClass("user-button-active")
        logUserBtnAfter.removeClass("user-button-after-active")
        closePassInput()
    } else {
        logUserBtn.css("opacity", "0")
        $("#spinner-id_username_1").css("opacity", "1")
        $.ajax({
            url:'/check_internet_connection',
            type:'POST',
            data:{
                check: "check"
            }
        }).done(function(response){
            setTimeout(function()   {
                $("#spinner-id_username_1").css("opacity", "0")
                logUserBtn.css("opacity", "1")
                if(response=="True"){
                    logUserBtn.addClass("user-button-active")
                    logUserBtnAfter.addClass("user-button-after-active")
                    openPassInput()
                }
                else{
                    openErrorSection()
                }
            }, 500);
        })
        .fail(function(){
            setTimeout(function() {
                $("#spinner-id_username_1").css("opacity", "0")
                openErrorSection()
            }, 300);
        })
    }
 })

logPassInput.click(function(){
    len = $(this).val().length
        logInFlag = false
        for (i = 0; i < len; i++) {
            if($(this).val()[i] != " ") {
                logInFlag = true
            }
        }
        if (!logInFlag)    { 
            closeBtnInput()
        } else {
            openBtnInput()
        }
    $(this).on("change paste keyup", function() {
        $(".login-error").css("height", "0")
        len = $(this).val().length
        logInFlag = false
        for (i = 0; i < len; i++) {
            if($(this).val()[i] != " ") {
                logInFlag = true
            }
        }
        if (!logInFlag)    { 
            closeBtnInput()
        } else {
            openBtnInput()
        }
     });
})

 mainSearch = $("#search-box")

 mainSearch.on("change paste keyup", function() {
    len = $(this).val().length
    logInFlag = false
    for (i = 0; i < len; i++) {
        if($(this).val()[i] != " ") {
            logInFlag = true
        }
    }
    if (logInFlag)    { 
        $('html').load('', { source: sourceElem, target: targetElem } );
    } 
 });

//  placeholders

 $("#id_first_name").attr("placeholder", "Ad")
 $("#id_last_name").attr("placeholder", "Soyad")
 logUserInput.attr("placeholder", "İstifadəçi adı")
 $("#id_username_2").attr("placeholder", "İstifadəçi adı")
 $("#id_email").attr("placeholder", "Email")
 $("#id_password").attr("placeholder", "Şifrə")
 $("#id_password1").attr("placeholder", "Şifrə")
 $("#id_password2").attr("placeholder", "Şifrə təkrar")
 $("#id_phone").attr("placeholder", "Telefon")

 newAccBtn = $(".newAccBtn")
 alreadyUserBtn = $(".alreadyUserBtn")
 submitRegister = $(".registerBtn")
 forgotPassword = $(".forgotPassword")
 registerContainers = $(".register-containers")
 loginContainers = $(".login-containers")
 registerContainerChildren = [registerContainers.children("h1"), registerContainers.children(".log-text"), $("#id_first_name"), $("#id_last_name"),
        $("#id_username_2"), $("#id_email"), $("#id_phone"), $("#id_password1"), $("#id_password2"), submitRegister, alreadyUserBtn
    ]

function doSetTimeoutReg(i) {
    setTimeout(function() {
        registerContainerChildren[i].animate({
            "opacity": "1",
            "bottom": "0"
        })
    }, 600+i*80);
}

loginContainerChildren = [loginContainers.children("h1"), loginContainers.children(".log-text"), $("#id_username_log_lable"), 
        $("#id_password_log_lable"), $(".submitLabel"), newAccBtn, forgotPassword
    ]

function doSetTimeoutLog(i) {
    setTimeout(function() {
        loginContainerChildren[i].animate({
            "opacity": "1",
            "bottom": "0"
        })
    }, 600+i*80);
}

alreadyUserBtn.click(function(event)    {
    event.preventDefault()
    logLogo.removeClass("reg-logo")
    for (i=0; i<loginContainerChildren.length; i++)    {
        loginContainerChildren[i].css({"opacity": "0", "position": "relative", "bottom": "5px"})
        }
    registerContainers.animate({
        "opacity": "0"
        }, function()  {
        $(this).css("display", "none")
        loginContainers.css({"display": "block", "opacity": "1"})
        for (i=0; i<loginContainerChildren.length; i++)    {
            doSetTimeoutLog(i)
        }
        }) 
})


newAccBtn.click(function(event) {
    event.preventDefault()
    logLogo.addClass("reg-logo")
    for (i=0; i<registerContainerChildren.length; i++)    {
    registerContainerChildren[i].css({"opacity": "0", "position": "relative", "bottom": "5px"})
    }
    loginContainers.animate({
    "opacity": "0"
    }, function()  {
    $(this).css("display", "none")
    registerContainers.css({"display": "block", "opacity": "1"})
    for (i=0; i<registerContainerChildren.length; i++)    {
        doSetTimeoutReg(i)
    }
    }) 
    
})

loginForm = $(".loginForm")
loginPreventFlag = true

// loginForm.submit(function(event){
//     if (loginPreventFlag)   {
//         event.preventDefault()
//         var username = $("#id_username_1").val();
//         var password = $("#id_password").val();
//         console.log(username, password)
//         if(username !="" && password !=""){
//         $.ajax({
//             url:'/check_username',
//             type:'POST',
//             data:{username:username, password:password}
//         })
//         .done(function(response){
//             if(response=="True"){
//                 console.log("true")
//                 loginPreventFlag = false
//                 loginForm.submit();
//             }
//             else{
//                 console.log("false")
//                 loginPreventFlag = true
//             }
//         })
//         .fail(function(){
//             loginPreventFlag = true
//             alert("failed");
//         })
//         }
//     } 
//     // else{
//     //   $(".username_error").remove();
//     // }
// });



$("#id_phone").val("+994").mask("+999 (99) 999 99 99");
$("#id_phone").val("+994").mask("+999 (99) 999 99 99");

$(".spinner").each(function()   {
    $(this).attr("id", "spinner-"+$(this).prev().attr("id"))
})

function closeErrorSection()   {
    eventFlag = true    
    $(".error-screen-container").stop().animate({
        "margin-bottom": "50px",
        "z-index": "-1",
    }, function()   {
        $(".error-screen-section").css({
        "pointer-events": "none",
    })
    $(".error-screen-section").css("opacity", "0")
    })
}

function openErrorSection()    {
    $(".error-screen-section").css({
        "z-index": "100000",
        "pointer-events": "visible"
    }).stop().animate({
        "opacity": "1"
    }, function()   {
        $(".error-screen-container").css("margin-bottom", "0")
    })
}


let registerPreventFlagUsername = true

$("#id_username_2").blur(function() {
    var ValwithoutSpace = $(this).val().replace(/\s/g,"");
    $(this).val(ValwithoutSpace)
    var $this = $(this)
    var username = $this.val().replace(/\s/g,"");
    if(username != ""){
        $("#spinner-id_username_2").css("opacity", "1")
        $.ajax({
            url:'/check_username',
            type:'POST',
            data:{
                check: 'registration_username',
                username: username
            }
        })
        .done(function(response){
            setTimeout(function()   {
                $("#spinner-id_username_2").css("opacity", "0")
                if(response=="True"){
                    $(".id_username_error").text("Istifadəçi adı mövcuddur")
                    $(".id_username_error").css("height", "20px")
                    $this.addClass("input-error")
                    registerPreventFlagUsername = true
                }
                else{
                    $(".id_username_error").css("height", "0")
                    $this.removeClass("input-error")
                    registerPreventFlagUsername = false
                }
            }, 300);
        })
        .fail(function(){
            setTimeout(function() {
                $("#spinner-id_username_2").css("opacity", "0")
                loginPreventFlag = true
                openErrorSection()
            }, 300);
        })
    } else  {
        $this.addClass("input-error")
        $(".id_username_error").css("height", "0")
        registerPreventFlagUsername = true
    }
})

let registerPreventFlagEmail = true

$("#id_email").blur(function() {
    var ValwithoutSpace2 = $(this).val().replace(/\s/g,"");
    $(this).val(ValwithoutSpace2)
    var $this = $(this)
    var email = $this.val().replace(/\s/g,"");
    if(email != ""){
        $("#spinner-id_email").css("opacity", "1")
        $.ajax({
            url:'/check_username',
            type:'POST',
            data:{
                check: 'registration_email',
                email: email
            }
        })
        .done(function(response){
            setTimeout(function()   {
                    $("#spinner-id_email").css("opacity", "0")
                if(response=="True"){
                    $(".id_email_error").text("Email mövcuddur")
                    $(".id_email_error").css("height", "20px")
                    $this.addClass("input-error")
                    registerPreventFlagEmail = true
                }
                else{
                    $(".id_email_error").css("height", "0")
                    $this.removeClass("input-error")
                    registerPreventFlagEmail = false
                }
            }, 300);
        })
        .fail(function(){
            setTimeout(function() {
                $("#spinner-id_email").css("opacity", "0")
                openErrorSection()
            }, 300);
            registerPreventFlagEmail = true
        })
    } else  {
        $(".id_email_error").css("height", "0")
        $this.addClass("input-error")
        registerPreventFlagEmail = true
    }
})

$("input").removeAttr("required")


registerFormOtherInputs = [$("#id_first_name"), $("#id_last_name"), $("#id_phone"), $("#id_password1"), $("#id_password2")]

registerFormOtherInputsFlag = true

for (let i = 0; i < registerFormOtherInputs.length; i++)    {
    registerFormOtherInputs[i].blur(function()   {
    var ValwithoutSpace2 = $(this).val().replace(/\s/g,"");
    if (ValwithoutSpace2 == "") {
        $(this).val(ValwithoutSpace2)
    }
        this_val = registerFormOtherInputs[i].val()
        if (this_val == "")  {
            registerFormOtherInputs[i].addClass("input-error")
            registerFormOtherInputsFlag = true
        } else {
            registerFormOtherInputs[i].removeClass("input-error")
            registerFormOtherInputsFlag = false
        }
    })
}

registerPassword1Flag = true

$("#id_password1").blur(function()  {
    if ($(this).val().length < 8)    {
        $(".id_password1_error").text("Şifrə ən az 8 işarədən ibarət olmalıdır")
        $(".id_password1_error").css("height", "20px")
        $(this).addClass("input-error")
        registerPassword1Flag = true
    } else {
        $(".id_password1_error").css("height", "0")
        $(this).removeClass("input-error")
        registerPassword1Flag = false
    }
})

registerPassword2Flag = true


$("#id_password2").blur(function()  {
    if ($(this).val()!= $("#id_password1").val())    {
        $(".id_password2_error").text("Şifrələr eyni deyil")
        $(".id_password2_error").css("height", "20px")
        $(this).addClass("input-error")
        $("#id_password1").addClass("input-error")
        registerPassword2Flag = true
    } else {
        $(".id_password2_error").css("height", "0")
        $(this).removeClass("input-error")
        $("#id_password1").removeClass("input-error")
        registerPassword2Flag = false
    }
})

registerPhoneFlag = true

$("#id_phone").blur(function()  {
    var ValwithoutSpace2 = $(this).val().replace(/\s/g,"");
    if (ValwithoutSpace2.length == 15)  {
        registerPhoneFlag = false
        $(".id_phone_error").css("height", "0")
        $(this).removeClass("input-error")
    } else {
        registerPhoneFlag = true
        $(".id_phone_error").text("Telefonu düzgün daxil edin")
        $(".id_phone_error").css("height", "20px")
        $(this).addClass("input-error")
    }
})

registerFormAllInputs = [$("#id_first_name"), $("#id_last_name"), $("#id_username_2"), $("#id_email"), $("#id_phone"), $("#id_password1"), $("#id_password2")]

$(".registerForm").submit(function(event)   {
    if (registerPreventFlagEmail || registerPreventFlagUsername || registerFormOtherInputsFlag || registerPassword2Flag || registerPassword1Flag || registerPhoneFlag)    {
        event.preventDefault()
        for (let i = 0; i < registerFormAllInputs.length; i++)  {
            var ValwithoutSpace3 = registerFormAllInputs[i].val().replace(/\s/g,"");
                if (registerFormAllInputs[i].attr("id") != "id_phone")  {
                    if (ValwithoutSpace3 == "") {
                        registerFormAllInputs[i].addClass("input-error")
                    } else {
                        registerFormAllInputs[i].removeClass("input-error")
                    }
                } else {
                    if (ValwithoutSpace3.length != 15) {
                        registerFormAllInputs[i].addClass("input-error")
                    } else {
                        registerFormAllInputs[i].removeClass("input-error")
                    }
                }
        }
        $('.form-containers').animate({
            scrollTop: 0
          }, 1000);
        $(".all-errors").css("height", "20px")
    } 
})

var loginFormFlag = true

$(".loginForm").submit(function(event)   {
    var $this = $(this)
    var username = $("#id_username_1").val().replace(/\s/g,"");
    var password = $("#id_password").val();
    if (loginFormFlag)  {
        event.preventDefault()
    }
    if(username != "" || password != ""){
        $(".spinner3").css("opacity", "1")
        $(".loginBtn").val("")
        $.ajax({
            url:'/check_username',
            type:'POST',
            data:{
                check: 'login',
                username: username,
                password: password
            }
        })
        .done(function(response){
            setTimeout(function()   {
                $(".loginBtn").val("Giriş et")
                $(".spinner3").css("opacity", "0")
                if  (response=="True")  {
                    loginFormFlag = false
                    $(".loginBtn").click()
                    $(".login-error").css("height", "0")
                } else{
                    loginFormFlag = true
                    $(".login-error").css("height", "20px")
                }
            }, 300);
        })
        .fail(function(){
            setTimeout(function() {
                $(".loginBtn").val("Giriş et")
                $(".spinner3").css("opacity", "0")
                loginFormFlag = true
                openErrorSection()
            }, 300);
        })
    } 
})



adVerifySearchBox = $(".adVerify-search-box")
adVerifySearchIcon = $(".adVerify-search-icon")
adVerifySearchIconBox = $(".adVerify-search-icon-box")
adVerifySearchIconBefore = $(".adVerify-search-icon-before")

function searchTurnOn() {
    adVerifySearchIcon.addClass("adVerify-search-icon-active")
    adVerifySearchIconBefore.addClass("adVerify-search-icon-before-active")
    adVerifySearchIconBox.addClass("adVerifySearchIconBoxActive")
}

function searchTurnOff() {
    adVerifySearchIcon.removeClass("adVerify-search-icon-active")
    adVerifySearchIconBefore.removeClass("adVerify-search-icon-before-active")
    adVerifySearchIconBox.removeClass("adVerifySearchIconBoxActive")
}

lenAd = adVerifySearchBox.val().length
logInFlagAd = false
for (i = 0; i < lenAd; i++) {
    if(adVerifySearchBox.val()[i] != " ") {
        logInFlagAd = true
    }
}
if (logInFlagAd)    { 
    searchTurnOn()
} else {
    searchTurnOff()
}

adVerifySearchBox.on("change paste keyup click", function() {
    len = $(this).val().length
    logInFlag = false
    for (i = 0; i < len; i++) {
        if($(this).val()[i] != " ") {
            logInFlag = true
        }
    }
    if (logInFlag)    { 
        searchTurnOn()
    } else {
        searchTurnOff()
    }
 });

 adVerifySearchBoxFlag = true

$(".adVerify-search-box-container").submit(function(event) {
    var valWithoutSpace = adVerifySearchBox.val().replace(/\s/g,"");

    if (valWithoutSpace == "")  {
        adVerifySearchBoxFlag = true
    } else  {
        adVerifySearchBoxFlag = false
    }
    if (adVerifySearchBoxFlag)  {
        event.preventDefault()
    } 

})

  





