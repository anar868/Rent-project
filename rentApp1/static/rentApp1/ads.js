$("input[type='checkbox']").change(function() {
    if ($(this).prop("checked") == true)    {
        insertParam($(this).attr("key"), $(this).val())
    $.ajax({
        url: window.location,
        type:'GET',
        data: ''
    }) 
    .done(function(response){
      
    })
    .fail(function(){
    })
    }
    
}); 

function removeURLParameter(url, parameter) {
    //better to use l.search if you have a location/link object
    var urlparts= url.split('?');   
    if (urlparts.length>=2) {

        var prefix= encodeURIComponent(parameter)+'=';
        var pars= urlparts[1].split(/[&;]/g);

        //reverse iteration as may be destructive
        for (var i= pars.length; i-- > 0;) {    
            //idiom for string.startsWith
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {  
                pars.splice(i, 1);
            }
        }

        url= urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : "");
        return url;
    } else {
        return url;
    }
}

//function to add/update query params
function insertParam(key, value) {
    if (history.pushState) {
        // var newurl = window.location.protocol + "//" + window.location.host + search.pathname + '?myNewUrlQuery=1';
        var currentUrlWithOutHash = window.location.origin + window.location.pathname + window.location.search;
        var hash = window.location.hash
        //remove any param for the same key
        var currentUrlWithOutHash = removeURLParameter(currentUrlWithOutHash, key);

        //figure out if we need to add the param with a ? or a &
        var queryStart;
        if(currentUrlWithOutHash.indexOf('?') !== -1){
            queryStart = '&';
        } else {
            queryStart = '?';
        }

        var newurl = currentUrlWithOutHash + queryStart + key + '=' + value + hash
        window.history.pushState({path:newurl},'',newurl);
    }
}


var cities = [
    "Ağcabədi",
    "Ağdam",
    "Ağdaş",
    "Ağdərə",
    "Ağstafa",
    "Ağsu",
    "Astara",
    "Bakı",
    "Babək",
    "Balakən",
    "Beyləqan",
    "Bərdə",
    "Biləsuvar",
    "Cəbrayıl",
    "Cəlilabad",
    "Culfa",
    "Daşkəsən",
    "Dəliməmmədli",
    "Əsgəran",
    "Füzuli",
    "Gədəbəy",
    "Gəncə",
    "Goranboy",
    "Göyçay",
    "Göygöl",
    "Göytəpə",
    "Hacıqabul",
    "Horadiz",
    "Xaçmaz",
    "Xankəndi",
    "Xocalı",
    "Xocavənd",
    "Xırdalan",
    "Xızı",
    "Xudat",
    "İmişli",
    "İsmayıllı",
    "Kəlbəcər",
    "Kürdəmir",
    "Qax",
    "Qazax",
    "Qəbələ",
    "Qobustan",
    "Qovlar",
    "Quba",
    "Qubadlı",
    "Qusar",
    "Laçın",
    "Lerik",
    "Lənkəran",
    "Liman",
    "Masallı",
    "Mingəçevir",
    "Naftalan",
    "Naxçıvan",
    "Neftçala",
    "Oğuz",
    "Ordubad",
    "Saatlı",
    "Sabirabad",
    "Salyan",
    "Samux",
    "Siyəzən",
    "Sumqayıt",
    "Şabran",
    "Şahbuz",
    "Şamaxı",
    "Şəki",
    "Şəmkir",
    "Şərur",
    "Şirvan",
    "Şuşa",
    "Tərtər",
    "Tovuz",
    "Ucar",
    "Yardımlı",
    "Yevlax",
    "Zaqatala",
    "Zəngilan",
    "Zərdab"
  ];

let citySelect = $("#id_city_select")

for (let i = 0; i < cities.length; i++) {
    let option = '<option value="'+cities[i]+'">'+cities[i]+'</option>'
    citySelect.append(option)
}

if (!$(".selected_city").val()) {
    selectedCityVal = $(".selected_city").attr("selected_value")
    citySelect.find('[value="'+selectedCityVal+'"]').attr("selected", "")
}

var adFilterForms = []

$(".adFilter").each(function()  {
    var $this = $(this)
    var thisForm = $this.parents("form")
    $this.on("change keyup paste", function()   {
        thisForm.submit()
    })
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
        $(".adFiltersForm").submit()

        // $(".adFiltersForm").submit()
        /* alert($this.val()); Uncomment this for demonstration! */
    });

    // Hides the unordered list when clicking outside of it
    $(document).click(function () {
        $styledSelect.removeClass('active');
        $list.removeClass('active');
    });

});

  
  // Remove empty fields from GET forms
  // Author: Bill Erickson
  // URL: http://www.billerickson.net/code/hide-empty-fields-get-form/
  
  	// Change 'form' to class or ID of your specific form
	$("form").not(".adVerify-search-box-container").submit(function() {
		$(this).find(":input").filter(function(){ return !this.value; }).attr("disabled", "disabled");
		return true; // ensure form still submits
	});
	
	// Un-disable form fields when page loads, in case they click back after submission
	$( "form" ).not(".adVerify-search-box-container").find( ":input" ).prop( "disabled", false );



filterLine = $(".filter-line")
filterLine1 = $(".filter-line-1")
filterLine2 = $(".filter-line-2")
filterCont = $(".filters-button")
filterMenu = $(".adFilters")
wrapDiv = $(".wrap")
filterLink = $(".filter-link");

filterLineTop = filterLine1.css("top");
bodyWrap = $(".body-wrap")

$(window).on('resize', function()   {
    if (filterLine1.css("top") != filterLineTop)    {
        open_filter()
    } else {
        close_filter()
    }
})

if (window.outerWidth >= 992)   {
    filterMenuWidth = -filterMenu.outerWidth()+20+"px"
} else {
    filterMenuWidth = -filterMenu.outerWidth()+"px"
}

filterMenu.css("right", filterMenuWidth)

filterCont.click(function()  {
    if (filterLine1.css("top") == filterLineTop)    {
        open_filter()
    } else {
        close_filter()
    }
})

wrapDiv.click(function()    {
    close_filter()
})

filterLink.click(function()    {
    if (filterLine1.css("top") == filterLineTop)    {
        open_filter()
    } else {
        close_filter()
    }
})


function close_filter()   {
    filterLine1.removeClass("filter-line-1-open")
    filterLine2.removeClass("filter-line-2-open");
    if (window.outerWidth >= 992)   {
        filterMenuWidth = -filterMenu.outerWidth()+20+"px"
    } else {
        filterMenuWidth = -filterMenu.outerWidth()+"px"
    }

    filterMenu.stop().animate({
        "right" : filterMenuWidth
    }, 500)
 
    logUserBtn.removeClass("user-button-active")
    logUserBtnAfter.removeClass("user-button-after-active")
    closePassInput()
    closeBtnInput()
}

function open_filter()    {
    filterLine1.addClass("filter-line-1-open")
    filterLine2.addClass("filter-line-2-open");
    filterMenu.stop().animate({
        "right" : "0"
    }, 500)
}