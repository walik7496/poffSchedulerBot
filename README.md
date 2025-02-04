# Telegram Bot for Blackout Period Notifications

This project implements a Telegram bot that provides information about electricity blackout periods. The bot is deployed on Google Apps Script and uses the Telegram API to process messages.

## 🚀 Features
- Retrieve up-to-date information on blackout periods for today and tomorrow.
- Automatically update data from a website.
- Support for the `/get` command to request information.

## 📁 Project Structure
- **setWebhook()**: Sets the webhook for integration with Telegram.
- **doPost(e)**: Processes incoming messages from users.
- **sendTelegramMessage(chatId, text)**: Sends messages to a Telegram chat.
- **fetchSpecificParagraph()**: Retrieves and processes blackout period data from a website.

## ⚙️ Setup
1. **Get a bot token** from [BotFather](https://t.me/BotFather) on Telegram.
2. **Create a web app** in Google Apps Script:
   - Paste the code into the script editor.
   - Deploy the app as a "Web App" with access for everyone.
3. **Configure the variables:**
   ```javascript
   var apiToken = "YOUR_TELEGRAM_BOT_TOKEN"; // Your bot's token
   var appUrl = "YOUR_WEB_APP_URL";          // Your web app URL
   ```
4. **Set the webhook:**
   - Run the `setWebhook()` function in the script editor.

## 📢 Usage
After setting up the bot:
- Open a chat with the bot on Telegram.
- Type the command `/get` to receive the latest information.

## ❗ Error Handling
- In case of errors while retrieving data, the bot responds with: `"Error retrieving data."`
- Error logs are available in the Google Apps Script console for debugging.

## 🌟 Example Response
```
Blackout periods for today:
- 08:00 — 12:00
- 16:00 — 20:00

Blackout periods for tomorrow:
- 09:00 — 13:00
- 17:00 — 21:00
```

## 🛠️ Potential Improvements
- Adding support for additional commands.
- Configuring automatic notifications.
- Integrating with other data sources.

## 🌐 License
This project is open-source and can be used under the license of your choice.

