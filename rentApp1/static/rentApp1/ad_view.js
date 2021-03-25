

var lat = $("#map").attr("lat")
var lng = $("#map").attr("lng")

function initMap() {
    var myLatlng = new google.maps.LatLng(lat, lng);

    var mapOptions = {
    zoom: 16,
    center: myLatlng
    }
    var map = new google.maps.Map(document.getElementById("map"), mapOptions);


    // Place a draggable marker on the map
    var marker = new google.maps.Marker({
        position: myLatlng,
        map: map,
        title:"Drag me!"
    });

}



var eventFlag = true

$("input[type='submit'].adVerify-button").click(function(e) {
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
    $(".adVerify-OK-container").animate({
        "margin-bottom": "50px",
        "pointer-events": "none"
    }, function()   {
        $(".adVerify-OK-section").css({
            "z-index": "-1",
        })
        $(".adVerify-OK-section").css("opacity", "0")
    })
}

function openAdOKContainer()    {
    $(".adVerify-OK-section").css({
        "z-index": "100",
        "pointer-events": "visible"
    }).animate({
        "opacity": "1"
    }, function()   {
        $(".adVerify-OK-container").css("margin-bottom", "0")
    })
}


function openAdDesc()   {
    $(".ad-description-icon").css("transform", "rotate(45deg)")
    let containerHeight = $(".post-description").outerHeight()
    let containerTop = $(".post-description-button").outerHeight() + 9
    $(".post-description-container-2").css({
        "height": containerHeight+"px",
        "top": containerTop+"px"
    })
}

function closeAdDesc()  {
    $(".ad-description-icon").css("transform", "rotate(-45deg)")
    $(".post-description-container-2").css({
        "height": "0",
        "top": "10px"
    })
}

$(".post-description-button").click(function()  {
    if ($(".ad-description-icon").css("transform") == "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0)")    {
        openAdDesc()
    } else {
        closeAdDesc()
    }
})

$(window).on("resize", function()   {
    if ($(".ad-description-icon").css("transform") == "matrix(0.707107, -0.707107, 0.707107, 0.707107, 0, 0)")    {
        closeAdDesc()
    } else {
        openAdDesc()
    }
})


$("#id_body").attr("placeholder", "Şərhiniz")
$("#id_title").attr("placeholder", "Başlıq")

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



$(".comment-body-text").each(function() {
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

$(".write-comment").click(function()    {
    registerContainer.css({"display": "none"})
    logContainer.css({"display": "block", "opacity":"1"})
    formsSection.css("display", "flex")
    setTimeout(function() {
        formsContainer.css("opacity", "1")
    }, 400);
    logLogo.removeClass("reg-logo")
    close_menu()
})


