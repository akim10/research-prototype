$( document ).ready(function() {
    
    // select a random color scheme on each load
    colors = ["#EF9C9C", "#8E1515", "#F6A148", "#91672F", "#73BA64", "#075F03", "#58C390", "#117C49", "#11757C", "#58C6CE", "#5878CE", "#052067", "#8497C8", "#84C8A1", "#9D84C8", "#9D84C8", "#98609C", "#5A576F"]
    var color = colors[Math.floor(Math.random()*colors.length)];
    $("body").css("background-color", color)
    $(".takeQuizButton a").css("color", color)
    $("th").css("color", color)
    $(".profilePoints").css("color", color)


    // ---------------------------------------------------------------------


    // if window is too small, collapse the side nav
    $(window).resize(function() {
        if ($(window).width() < 992) {
          $( "#mySidenav" ).height(0);
        }
    });


    // ---------------------------------------------------------------------


    // question is an object that will in the future be retrieved from a database
    var question = {
      questionText: "How many times have you changed your Facebook password in the past 6 months?", 
      choices:["0 times", "1-2 times", "3+ times"], 
    };

    // an example second question
    var question2 = {
      questionText: "Do you use two factor authentication for your CMU login?", 
      choices:["Yes, I do", "No, I don't"], 
    };

    // the user will be retrieved through CMU's Shibboleth authentication
    // for now, just the points are available
    var user = {
      points: 1425
    };


    // ---------------------------------------------------------------------


    // rendering the user's points on the popup
    // (the small window that comes up when you click the icon in the toolbar)
    pointsHTML = '<div class="row"><div class="main-text col-12"><h1 class="points">' + user.points + '</h1><h5> points </h5></div></div>'
    $(".popup").prepend(pointsHTML);


    // ---------------------------------------------------------------------


    // rendering the question on the newtab.html page
    questionTextHTML = '<div class="row"><div class="main-text push-sm-1 col-sm-10 push-md-3 col-md-6"><h1><strong>' + question.questionText + '</strong></h1></div></div>';

    allChoices = ""
    // for each choice in question.choices, render an accompanying radio button
    for (i = 0; i < question.choices.length; i++) {
      choiceHTML = '<label><div class="radioButton"></div><input type="radio"/><span class="radioButtonLabel">' + question.choices[i] + '</span></label>'
      if (i != question.choices.length - 1){
        choiceHTML = choiceHTML + '<br /><br /><br />'
      }
      allChoices += choiceHTML
    }
    choices = '<div class="row"><div class="choices push-lg-5 col-lg-2 push-md-4 col-md-4 push-sm-3 col-md-6 push-2 col-8"><br /><br />' + allChoices + '</div></div>'

    answer = localStorage.getItem("answer");
    // if the user has not yet answered the question
    if (answer == null){
        // then render the question and the choices
        $("#question").append(questionTextHTML);
        $("#question").append(choices);
    // if the user has already answered the question
    } else {
        // remove the question and choices and render the feedback blurb and accompanying text
        $("#submit-question").remove()
        $("#countdown").remove()
        var feedbackText = "You change your Facebook password more often than 84% of students at CMU."
        resultsHTML = '<div class="results"><div class="row"><div class="main-text push-sm-3 col-sm-6"><h1 id="your-answer"><strong>Your Answer:</strong></h1></div></div><br /><br /><div class="row"><div class="main-text push-3 col-6"><h1 class="selected-answer"><strong>' + answer + '</strong></h1></div></div><br /><br /><div class="row"> <div class="main-text push-lg-4 col-lg-4 push-sm-2 col-sm-8 col-12"><p class="feedback-text">' + feedbackText + '</p><br /><p class="points-text">You earned <strong>25 points</strong> for Dietrich College.<br> Answer another question tomorrow!</p></div></div></div>'
        $("#results").append(resultsHTML);
        $("#results").css("margin-top", "10px");
        setTimeout(showResults, 0);
    }


    // ---------------------------------------------------------------------


    // unused function and code - was going to be used to switch the question when the
    // countdown hit 0, but decided that it would be better to revisit after connecting to a database
    function resetQuestion(){
        localStorage.clear() 
        question = question2
    }
    var today = new Date();
    var tomorrow = new Date();
    tomorrow.setDate(today.getDate()+1);
    var timeTilTomorrow = tomorrow - today
    setTimeout(resetQuestion, timeTilTomorrow);


    // ---------------------------------------------------------------------


    // opening the sidenav
    $( "#openbtn" ).click(function() {
      $( "#mySidenav" ).height(250);
      if ($( "#mySidenav" ).height() === 250){
        $( "#mySidenav" ).height(0);
      }
    });


    // ---------------------------------------------------------------------



    // this is a separate function so it could be delayed to make a smoother transition
    function showResults () {
        $('#results').fadeIn();
    }

    $( "#submit-button" ).click(function() {
        // if an answer has been selected
        if ($('.active').length != 0){
            // remove the question and render the feedback text and the answer that was selected
            $('.question-full').fadeOut();
            var selectedAnswer = $('.active')
            var feedbackText = "You change your Facebook password more often than 84% of students at CMU."
            resultsHTML = '<div class="results"><div class="row"><div class="main-text push-3 col-6"><h1 id="your-answer"><strong>Your Answer:</strong></h1></div></div><br /><br /><div class="row"><div class="main-text push-3 col-6"><h1 class="selected-answer"><strong>' + selectedAnswer.text()  + '</strong></h1></div></div><br /><br /><div class="row"> <div class="main-text push-lg-4 col-lg-4 push-sm-2 col-sm-8 col-12"><p class="feedback-text">' + feedbackText  + '</p><br /><p class="points-text">You earned <strong>25 points</strong> for Dietrich College.<br> Answer another question tomorrow!</p></div></div></div>'
            $("#results").append(resultsHTML);
            setTimeout(showResults, 400);
            localStorage.setItem("answer", selectedAnswer.text());
        }
    });


    // ---------------------------------------------------------------------


    // making the radio buttons' active state work properly
    $('label').click(function() {
        $('.active').removeClass("active");
        $(this).addClass("active");
    });


    // ---------------------------------------------------------------------


    // switching between the list view and chart view for the leaderboard
    $('.leaderBoardView').click(function() {
        $('.selected').removeClass("selected");
        $(this).addClass("selected");
        // if the list view is selected
        if ($(this).text().indexOf("List") != -1){
          $('.leaderboardTable').css("display", "")
          $('#chart').css("display", "none")
        } 
        // if the chart view is selected
        else if ($(this).text().indexOf("Chart") != -1){
          $('.leaderboardTable').css("display", "none")
          $('#chart').css("display", "initial")
        }
    });
});
