$(document).ready(function() {
  //Tweet submition:
  $('#tweet-messenger').submit(function(event) {
    event.preventDefault();
    
    //counts the number of characters within the test area
    const tweetWordCount = event.target[0].value.length;

    //checks to see if the word count is withing the 140 limit.
    //if it is, it will "POST" it. (get it?)
    //it is aso helped out with the wordCheck function located at
    //the end of the page.
    if (wordCheck(tweetWordCount)) {
      return false;
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).then((data) => {
        loadTweets();
        $('#tweet-text').val("");
        $('.counter').val(140);
      });
    }
    
  });
  
  //Loads and renders the tweets onto the page
  //aided but the three functions directly below this.
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets"
    }).then((otherTweets) => {
      renderTweets(otherTweets);
      timeago.render(document.querySelectorAll('.time'));
    });
  };

  loadTweets();
  
  //appends the new tweets in reverse chronological order
  const renderTweets = function(tweets) {
    $('#tweets-container').empty();
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
    }
  };
  
  //prevents melicious action against my app
  const escape = function(str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

  //the HTML that becomes the new Tweets
  const createTweetElement = (tweet) => {
    let $tweet = $(`
    <article>
      <header>
        <div class="user">
          <img src="${tweet.user.avatars}"> 
          <span>"${tweet.user.name}"</span>
        </div>
        <span class="tag">${tweet.user.handle}</span>
      </header>
        <h5 class="text">${escape(tweet.content.text)}</h5>
      <footer>
        <span class="time" datetime="${tweet.created_at}"></span>
        <div class="interactive">
          <i class="fas fa-flag flag"></i>
          <i class="fas fa-retweet share"></i>
          <i class="fas fa-heart love"></i>
        </div>
      </footer>
    </article>
    `);
    return $tweet;
  };
});

// ERROR FUNCTIONS ------------------------------------------------------------

const $error = function(message) {
  const err = $(`
    <div id="error-box">
      <div id="error-messeges">
        <i class="fas fa-exclamation-triangle"></i>
        <h3>${message}</h3>
        <i class="fas fa-exclamation-triangle"></i>
      </div>
    </div>
  `).appendTo('#error-container');
  return err;
};

const wordCheck = function(wordCount) {
  let errMsg = undefined;
  if ($('#error-box').length) {

    $('#error-box').remove();
  }
  if (!wordCount) {
    errMsg = "No Words? don't worry we'll wait...";
    return $error(errMsg).appendTo('#error-container').hide().slideDown(1000);
  } else if (wordCount > 140) {
    errMsg = "Sorry, max is 140 characters. You got this!";
    return $error(errMsg).appendTo('#error-container').hide().slideDown(1000);
  }
};