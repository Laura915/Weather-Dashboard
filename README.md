# Weather Dashboard

 ### [Weather Dashboard App link !](https://laura915.github.io/Weather-Dashboard/)

 ## Description 
 User can search a city on the Weather Dashboard and recieve the city's current weather and 5-day forecast. Also a list of their past searched cities will be saved and available to click to rerender for their convenience. 

 **User Story :** <br>
 As a traveler </br>
 I want to see the weather outlook for multiple cities </br>
 So that I can plan a trip accordingly

  ## Table of Contents

  * [Usage](#usage)

  * [Build](#build)

  * [Questions](#questions)


  ## Usage
  Simply enter and submit a city and get the current and 5 day forecast. Below the search input, a history of past searched cities are clickable and will pull that city's forecast.  
    
  Follow the link : </br>
  [Weather Dashboard](https://laura915.github.io/Weather-Dashboard/)

  ## Build 
   **Technologies:** <br> Weather API JavaScript JQuery HTML CSS Bootstrap Moment.js

   Created event listerners with the Jquery JS library to bulid a dynamic app. </br>
   Search Event Listener :</br>
   - Takes the search input value 
   - Uses the [Open Weather API collections](https://openweathermap.org/api) to make 2 api calls:</br>
        1. The [Current Weather Data](https://openweathermap.org/current) api takes the city name as the search parameter and provided the current day weather and city coordinates.</br>
        2. In order to retrieve the 5 day forecast, the [One Call API](https://openweathermap.org/api/one-call-api) is utilize. The city coordinates are used to search for the city and gather the 5 days needed.
   - Applied [Moment.js library](https://momentjs.com/) to display current day and next 5 dates on the client-side.   
   - Saved the city names to local storage so that the user can pull previous cities data</br>
     - when each List item is created, a onclick listener is added that does a search to the apis like in the search event listener.  

  ## Questions
  If you have a question about this repo, open a issue or contact Laura915 