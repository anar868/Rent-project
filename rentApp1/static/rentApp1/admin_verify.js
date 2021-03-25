verifyAdsLink = $(".verify_ads_link")
verifyCommentsLink = $(".verify_comments_link")
verifyUsersLink = $(".verify_users_link")

verifyAdsLink.hover(function () {
    verifyCommentsLink.css({
        "box-shadow": "inset 7px 0 9px -7px rgba(0,0,0,0.4)",
    })
}, function () {
    verifyCommentsLink.css("box-shadow", "inset 0 0 0 0 rgba(0,0,0,0.4)")
});

verifyCommentsLink.hover(function () {
    verifyAdsLink.css({
        "box-shadow": "inset -7px 0 9px -7px rgba(0,0,0,0.4)",
    })
    verifyUsersLink.css({
        "box-shadow": "inset 7px 0 9px -7px rgba(0,0,0,0.4)",
    })
}, function () {
    verifyAdsLink.css("box-shadow", "inset 0 0 0 0 rgba(0,0,0,0.4)")
    verifyUsersLink.css("box-shadow", "inset 0 0 0 0 rgba(0,0,0,0.4)")
});

verifyUsersLink.hover(function () {
    verifyCommentsLink.css({
        "box-shadow": "inset -7px 0 9px -7px rgba(0,0,0,0.4)",
    })
}, function () {
    verifyCommentsLink.css("box-shadow", "inset 0 0 0 0 rgba(0,0,0,0.4)")
});

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

var urlFull = decodeURIComponent(window.location.href.replace(/\+/g, ' '));
var urlParams = urlFull.split("?")[1]
if (urlParams)   {
    urlParamSliced = urlParams.split("&")
    for (let i = 0; i<urlParamSliced.length; i++) {
        urlParamKey = urlParamSliced[i].slice(0, 2)
        if (urlParamKey == "q=")    {
            adVerifySearchBox.val(urlParamSliced[i].slice(2))
        }
    }
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

 

adVerifyAll = $(".adVerify-all")
adVerifyDeleted = $(".adVerify-deleted")
adVerifyVerify = $(".adVerify-verify")
adVerifyVerified = $(".adVerify-verified")

var eventFlag = true

$("input[type='submit'].adVerify-button").not(".adVerify-edit-button").click(function(e) {
    if (eventFlag)  {
        e.preventDefault()
    }
    eventFlag = false
    var thisButton = $(this)
    if (thisButton.val() == "Sil")  {
        $(".adVerify-OK-container-text").html("Elanı birdəfəlik silmək istədiyinizə əminsiniz?")
        $(".adVerify-OK-buttons-container").html('<button class="adVerify-button adVerify-delete-button adVerify-accept-button">Sil</button><button class="adVerify-button adVerify-verify-button adVerify-reject-button">Silmə</button>')
    } else if (thisButton.val() == "Deaktiv et")   {
        $(".adVerify-OK-container-text").html("Elanı deaktiv etmək istədiyinizə əminsiniz?")
        $(".adVerify-OK-buttons-container").html('<button class="adVerify-button adVerify-delete-button adVerify-accept-button">Deaktiv et</button><button class="adVerify-button adVerify-verify-button adVerify-reject-button">Deaktiv etmə</button>')
    } else if (thisButton.val() == "Təsdiqlə")   {
        $(".adVerify-OK-container-text").html("Elanı təsdiqləmək istədiyinizə əminsiniz?")
        $(".adVerify-OK-buttons-container").html('<button style="background-color: var(--error-color)" class="adVerify-button adVerify-verify-button adVerify-reject-button">Təsdiqləmə</button><button style="background-color: var(--active-color)" class="adVerify-button adVerify-delete-button adVerify-accept-button">Təsdiqlə</button>')
    } else if (thisButton.val() == "Bərpa et")   {
        $(".adVerify-OK-container-text").html("Elanı təsdiqləmək istədiyinizə əminsiniz?")
        $(".adVerify-OK-buttons-container").html('<button style="background-color: var(--error-color)" class="adVerify-button adVerify-verify-button adVerify-reject-button">Bərpa etmə</button><button style="background-color: var(--active-color)" class="adVerify-button adVerify-delete-button adVerify-accept-button">Bərpa et</button>')
    }
    $(".adVerify-OK-container-text")
    openAdOKContainer()
    $(".adVerify-accept-button").click(function()   {
        thisButton.click()
    })

    $(".adVerify-reject-button").click(function()   {
        eventFlag = true
        closeAdOKContainer()
    })
})


$(window).click(function(event)    {
    if (event.target.className == "adVerify-OK-section") {
        closeAdOKContainer()
    } 
    if (event.target.className == "comment-read-more-section" || event.target.className == "forms-close-btn") {
        closeCommentContainer()
    } 
})

function closeAdOKContainer()   {
    eventFlag = true    
    $(".adVerify-OK-container").stop().animate({
        "margin-bottom": "50px",
        "z-index": "-1",
    }, function()   {
        $(".adVerify-OK-section").css({
        "pointer-events": "none",
    })
    $(".adVerify-OK-section").css("opacity", "0")
    })
}

function openAdOKContainer()    {
    $(".adVerify-OK-section").css({
        "z-index": "100",
        "pointer-events": "visible"
    }).stop().animate({
        "opacity": "1"
    }, function()   {
        $(".adVerify-OK-container").css("margin-bottom", "0")
    })
}

function closeCommentContainer()   {
    eventFlag = true    
    $(".comment-read-more-container").stop().animate({
        "margin-bottom": "50px",
        "z-index": "-1",
    }, function()   {
        $(".comment-read-more-section").css({
            "pointer-events": "none",
        })
        $(".comment-read-more-section").css("opacity", "0")
    })
}

function openCommentContainer()    {
    $(".comment-read-more-section").css({
        "z-index": "100",
        "pointer-events": "visible"
    }).stop().animate({
        "opacity": "1"
    }, function()   {
        $(".comment-read-more-container").css("margin-bottom", "0")
    })
}



$(".adVerify-comment-body").each(function() {
    var $this = $(this)
    var previousHtml = $this.html()
    var length = $this.html().length
    if (length > 160)   {
        $this.html($this.html().slice(0, 160)+'<span class="read-more"> Daha çoxuna bax...</span>')
    }
    $this.children(".read-more").click(function() {
        openCommentContainer()
        $(".comment-read-more-text").html(previousHtml)
    })
})


// Iterate over each select element
$('select').each(function () {

    // Cache the number of options
    var $this = $(this),
        numberOfOptions = $(this).children('option').length;

    // Hides the select element
    $this.addClass('s-hidden');

    // Wrap the select element in a div
    $this.wrap('<div class="select"></div>');

    // Insert a styled div to sit over the top of the hidden select element
    $this.after('<div class="styledSelect"></div>');

    // Cache the styled div
    var $styledSelect = $this.next('div.styledSelect');

    // Show the first select option in the styled div
    $styledSelect.text($this.children('[selected]').eq(-1).text());

    // Insert an unordered list after the styled div and also cache the list
    var $list = $('<ul />', {
        'class': 'options'
    }).insertAfter($styledSelect);

    // Insert a list item into the unordered list for each select option
    for (var i = 0; i < numberOfOptions; i++) {
        $('<li />', {
            text: $this.children('option').eq(i).text(),
            rel: $this.children('option').eq(i).val()
        }).appendTo($list);
    }

    // Cache the list items
    var $listItems = $list.children('li');

    // Show the unordered list when the styled div is clicked (also hides it if the div is clicked again)
    $styledSelect.click(function (e) {
        e.stopPropagation();
        if (!$(this).attr("class").replace("styledSelect", ""))   {
            $('div.styledSelect.active').each(function () {
                $(this).removeClass('active').next('ul.options').removeClass('active');
            });
            $(this).addClass('active').next('ul.options').addClass('active');
        } else {
            $list.removeClass('active');
            $styledSelect.removeClass('active');
        }
    });

    // Hides the unordered list when a list item is clicked and updates the styled div to show the selected list item
    // Updates the select element to have the value of the equivalent option
    $listItems.click(function (e) {
        e.stopPropagation();
        $styledSelect.text($(this).text()).removeClass('active');
        $this.val($(this).attr('rel'));
        $list.removeClass('active');
        location = $(this).attr('rel')
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.removeClass('active');
    });

});