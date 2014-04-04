<!DOCTYPE html>
<html>
  <head>
    <title>Sup!</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="mobile-web-app-capable" content="yes">
    <meta name="apple-mobile-web-app-capable" content="yes">
    <link rel="apple-touch-icon" href="static/img/logo.png"/>
    <link rel="stylesheet" href="static/css/style.css" type="text/css">
  </head>
  <body>
    <div id="container">
      <div id="pages">
        <div class="page">
          <!-- main page -->
            <div class="logo">
              <img src="static/img/logo.png" alt="logo">
            </div>
            <div class="places">
              <select>
                <option value="" selected>Select Place</option>
                {%for place in places %}
                  <option value="{{ place }}"> {{ place }} </option>
                {% endfor %}
              </select>
            </div>
            <div class="go">
              <div class="button hidden"> Go. </div>
            </div>
        </div>
        <div class="page">
            <div class="welcome">W</div>
            <div class="curDate"></div>
          <!-- metrics page -->
          <div class="metrics">
            {%for met in metrics %}
              <div data-role="{{ met["role"] }}">
                <!-- <div class="time">00:00:00</div> -->
                <div class="button hiddenR" > {{ met["title"] }} </div>
              </div>
            {% endfor %}
          </div>
         <div class="button reset"> Reset </div>
        </div>
      </div>
    </div>
    <script src="static/js/client.js" type="text/javascript"></script>
  </body>
</html>