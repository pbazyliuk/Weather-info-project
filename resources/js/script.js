
        /*var h1 = document.getElementById("h1");
        h1.style.display = "none";
*/ function myWeather () {
    $('#weatherTable').toggle();
    /*$('#containerid').addClass(" visibcontainer"); */
  /*   $('#city_container').toggle();*/
  
    
  
    


}

$(function(){
    
   /* var newWind = window.open('/', 'example', 'width=600,height=400');
    newWind.onload = function {*/
    $('#btnGetWeather').click(function () {
       /*var main = document.getElementById("main");
       var h1 = document.getElementById("h1");
       main.removeChild(h1);*/
   if ($('#inputCityName').val() === "") {
        return;
   }
    $("h1").hide();
    $("#visible").removeClass().addClass(" weather_form");;
            $("#btnGet").removeClass(" visiblebutton");


       getWeatherByCity('ua', dataReceived, showError, $('#inputCityName').val());
    });




    $('#inputCityName').keypress(function(e) {
        var ENTER_KEY_CODE = 13;
        if ( e.which === ENTER_KEY_CODE ) 
        {
            $('#btnGetWeather').trigger('click');
            return false;
        }


    });


   


    
    /*getWeatherData('ua', dataReceived, showError);*/
    

    function dataReceived(data) {
        var offset = (new Date()).getTimezoneOffset()*60*1000; // Відхилення від UTC в секундах
        var city = data.city.name;
        var country = data.city.country;
        $("#weatherTable tr:not(:first)").remove();

        $.each(data.list, function(){
            // "this" тримає об'єкт прогнозу звідси: http://openweathermap.org/forecast16
            var localTime = new Date(this.dt*1000 - offset); // конвертуємо час з UTC у локальний
            var tempDay = Math.round(this.temp.day) + ' &deg;c';
            var tempNight = Math.round(this.temp.night) + ' &deg;c';
            var localTimeDay = new Date(this.dt*1000 - offset);
             
             moment.locale('uk');   
            /*var getDay = (function getWeekDay() {
                         var days = new Date();  
                        var daysweek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

             return daysweek[days.getDay()];
            })();*/
            /*var days = new Date(); // 3 января 2014
           

            function getWeekDay(days) {
                var daysweek = ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'];

                    return daysweek[days.getDay()];
            }*/

                
           /* alert( getWeekDay(days) )*/
           /* var dayWeek = moment(localTime).format('dddd');*/

            addWeather(
              
            
                
               
                moment(localTime).format('ll'),   // Dec 15, 2015 // 12/05/2015          
                moment(localTimeDay).format('dddd'),	// Використовуємо moment.js для представлення дати
                this.weather[0].icon,
                
               /* moment(localTime).format('dddd'),*/
                tempDay,
                tempNight,
                this.humidity + ' &#37',
                this.weather[0].description
                
            );
        });
        $('#location').html('<b>' + city + ", " +  country + '</b>'); // Додаємо локацію на сторінку
    }

    function addWeather( day,localTimeDay,icon, tempDay, tempNight,humidity,  condition){
        var markup = '<tr>'+
                '<td>' + day + '</td>' +
                '<td>' + localTimeDay + '</td>' +
                '<td>' + '<img src="resources/img/icons/'+ 
                  icon
                  +'.svg" />' + '</td>' +
                '<td class="tempDay">' + tempDay + '</td>' +
                '<td class="tempNight">' + tempNight + '</td>' +
                '<td>' + humidity + '</td>' +
                '<td>' + condition + '</td>'
            + '</tr>';
        weatherTable.insertRow(-1).innerHTML = markup;        // Додаємо рядок до таблиці
    }

    function showError(msg){
        $('#error').html('Сталася помилка: ' + msg);
    }
});



        
