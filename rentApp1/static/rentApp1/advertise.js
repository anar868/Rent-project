var availableTags = [
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
  $("#id_city").autocomplete({
    source: availableTags
  });


//   placeholders

  $("#id_title").attr("placeholder", "Başlıq")
  $("#id_area").attr("placeholder", "Sahə (m²)")
  $("#id_price").attr("placeholder", "Qiymət (AZN)")
  $("#id_address").attr({"placeholder": "Ünvan", "autocomplete": "nothing"})
  $("#id_city").attr({"placeholder": "Şəhər", "autocomplete": "nothing"})
  $("#id_description").attr("placeholder", "Haqqında (ətraflı)")
  $("#id_bedroom_number").attr("placeholder", "Otaq Sayı")

  imageInput = $("#id_image")
  adForm = $(".adForm")
  adFormContent = $(".form-content")
  imageError = $(".img-error")
  latInput = $("input[name='lat']")
  lngInput = $("input[name='lng']")
  mapBtn = $(".mapBtn")
  mapDiv = $("#map")
  errorText = $(".error-text")
  
  adFormContent.children().each(function()  {
    $(this).removeAttr('required')
    $(this).on("change paste keyup", function() {
      len = $(this).val().length
      valueFlag = false
      for (i = 0; i < len; i++) {
          if($(this).val()[i] != " ") {
              valueFlag = true
          }
      }
      if (valueFlag && $(this).attr("id") != "id_image" && $(this).attr("type") != "number" || ($(this).attr("type") == "number" && $(this).val() > 0))  {
        $(this).removeAttr('style')
      }
      if (imageInput[0].files.length > 3) {
        imageInput.removeAttr('style')
        imageError.html('')
      } 
    })
  })

  adForm.submit(function(event) {
    if (imageInput[0].files.length < 4) {
      event.preventDefault()
      imageInput.css("border-color", "#be0606")
      imageError.html('Ən azı 4 şəkil yerləşdirin.')
    } 
    if (latInput.val() == "" || lngInput == "") {
      mapDiv.css("border", "1px solid red")
      event.preventDefault()
    }
    adFormContent.children().each(function()  {
      len = $(this).val().length
      valueFlag = false
      for (i = 0; i < len; i++) {
          if($(this).val()[i] != " ") {
              valueFlag = true
          }
      }
      if (!valueFlag && ($(this).attr("type") == "text" || $(this).attr("id") == "id_description")) {
        event.preventDefault()
        $(this).css("border-color", "#be0606")
      }

      if ($(this).attr("type") == "number"  && $(this).val() <= 0)  {
        event.preventDefault()
        $(this).css("border-color", "#be0606")
      }
    })

    if (event.isDefaultPrevented()) {
      $('html, body').animate({
        scrollTop: 0
      }, 1000);
      errorText.css("height", "20px")
    } else {
      errorText.css("height", "0")
    }

  })

  


  let map;

  function initMap() {
      var myLatlng = new google.maps.LatLng(40.373209,49.84586);

      var mapOptions = {
      zoom: 16,
      center: myLatlng
      }

      var map = new google.maps.Map(document.getElementById("map"), mapOptions);

      // Place a draggable marker on the map
      var marker = new google.maps.Marker({
          position: myLatlng,
          map: map,
          draggable:true,
          title:"Drag me!"
      });

      mapBtn.click(function(){
        latInput.val(marker.getPosition().lat())
        lngInput.val(marker.getPosition().lng())
        $(this).css("background-color", 'var(--success-color)')
        mapDiv.css("border-color", "transparent")
      })

  }

  

  
  
  