// Configuration
var apiToken = "token"; // Your bot token in Telegram
var appUrl = "url"; // The URL of your Google Apps Script web application
var apiUrl = "https://api.telegram.org/bot" + apiToken;

// Installing webhook
function setWebhook() {
  var url = apiUrl + "/setWebhook?url=" + appUrl;
  var response = UrlFetchApp.fetch(url);
}

// Processing incoming messages from Telegram
function doPost(e) {
  try {
    var contents = e && e.postData && e.postData.contents;
    if (!contents) {
      return;
    }
    
    var data = JSON.parse(contents);
    var message = data.message;
    var chatId = message.chat.id;
    var text = message.text;

    if (text === '/get') {
      var responseText = fetchSpecificParagraph();
      sendTelegramMessage(chatId, responseText);
    } else {
      sendTelegramMessage(chatId, "Невідома команда. Введіть /get для отримання інформації.");
    }
  } catch (error) {
    console.error("Error in doPost: " + error.toString());
  }
}

// A function for sending a message to Telegram using the POST method
function sendTelegramMessage(chatId, text) {
  var url = apiUrl + "/sendMessage";
  var payload = {
    chat_id: chatId,
    text: text
  };
  
  var options = {
    method: 'post',
    contentType: 'application/json',
    payload: JSON.stringify(payload)
  };
  
  UrlFetchApp.fetch(url, options);
}

// Function for receiving text with blackout periods
function fetchSpecificParagraph() {
  try {
    var url = 'url'; // Your site's URL
    var response = UrlFetchApp.fetch(url);
    var html = response.getContentText();
    
    // We use a regular expression to extract the desired content
    var matches = html.match(/<h4 class="main_header_h4">Періоди відключень на сьогодні:<\/h4>[\s\S]*?<\/p>|<h4 class="main_header_h4">Періоди відключень на завтра:<\/h4>[\s\S]*?(?=<h4|$)/g);
    
    // We remove HTML tags from the selected parts
    var result = '';
    if (matches) {
      matches.forEach(function(match) {
        // Remove unnecessary scripts (if any)
        match = match.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
        var cleanText = match.replace(/<[^>]+>/g, '').trim();
        if (cleanText) {
          result += cleanText + '\n\n'; // Add a double newline for better formatting
        }
      });
    }

    // We delete extra empty lines
    result = result.replace(/\n\s*\n/g, '\n');

    // We shorten the message to 4096 characters if it exceeds this limit
    if (result.length > 4096) {
      result = result.substring(0, 4093) + '...';
    }
    
    return result;
  } catch (error) {
    console.error("Error in fetchSpecificParagraph: " + error.toString());
    return "Помилка при отриманні даних.";
  }
}