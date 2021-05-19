$(document).ready(function () {
  $('#tweet-messenger').submit(function( event ) {
    event.preventDefault();

    const tweetWordCount = event.target[0].value.length;
    if(!tweetWordCount) {
      alert("No Words? are you okay?")
      return false;
    } else if(tweetWordCount > 140) {
      alert("I love that you have a lot to say! but no...")
      return false;
    } else {
      $.ajax({
        method: "POST",
        url: "/tweets",
        data: $(this).serialize()
      }).then((data) => {
        loadTweets()
        $('#tweet-text').val("");
        $('.counter').val(140)
      })
    }
  });
  
  const loadTweets = () => {
    $.ajax({
      method: "GET",
      url: "/tweets"
    }).then((otherTweets) => {
      renderTweets(otherTweets);
      timeago.render(document.querySelectorAll('.time'));
    })
  }

  loadTweets()
  

  const renderTweets = function(tweets) {
    for (let tweet of tweets) {
      let newTweet = createTweetElement(tweet);
      $('#tweets-container').prepend(newTweet);
    }
  };
  
  const escape = function (str) {
    let div = document.createElement("div");
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };

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
})

const $error2 = $(`
  <div id="error-box">
    <div id="error-messeges">
      <span>*!*</span>
        <h3>there are no characters</h3>
      <span>*!*</span>
    </div>
  </div>
  `)

  const $error2 = $(`
  <div id="error-box">
    <div id="error-messeges">
      <span>*!*</span>
        <h3>there are no characters</h3>
      <span>*!*</span>
    </div>
  </div>
  `)