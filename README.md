# first-timers-only-bot

### 🐶 🎯⛳ The Motivation

From our own experiences, we know the process of creating a pull request is the biggest barrier for new contributors.  We wanted to streamline the process to create very simple contributor-friendly issues to help onboard more people to become Open Source contributors for the first time.

At Hoodie, we aim to become the most [welcoming Open Source community possible](http://hood.ie/blog/welcoming-communities.html). We joined forces with initiatives like [First Timers Only](http://www.firsttimersonly.com/) and [Your First PR](http://yourfirstpr.github.io/) to actively reach out to new contributors and create an environment where they feel encouraged and supported.

Creating what we call [starter issues](http://hood.ie/blog/starter-issues.html) is one aspect of that. And it is one of the most successful. A subset of these starter issues are super simple fixes like typos, so they are perfect to onboard people and help them get familiar with GitHub and the pull request workflow. Because typos and similar issues are so trivial, we should basically be able to automatically generate the entire starter issue based on a diff.

### 💡💥❓ How things work

Say I’m a Hoodie contributor and find a typo somewhere. Instead of fixing the issue directly in the master branch or creating a pull request which is time-consuming, I can simply create a new branch that is called something like **first-timers-only-typo-in-title.** GitHub will then notify the "first-timers-only issue bot" about the new branch using Webhooks. The bot is listening to any new branch was created starting with **first-timers-only** and it will create a new issue at _https://github.com/hoodiehq/camp/issues/new_ with a template and assign the first-timers-only and the up-for-grabs label. The commit body can be used to add some context information and if left empty, the 🤔 **What you will need to know** section of the issue will simply say "Nothing :)".

### 🕜 💻 Setup
```
git clone https://github.com/hoodiehq/first-timers-only-bot.git
cd first-timers-only-bot
npm install
```

👀 When you are ready to use the bot, _make sure to change the label to **first-timers** in the instructions.md file._

###  ✅ ➕Setting Up GitHub App with Bot
1) ![Create the GitHub App](https://github.com/gr2m/github-app-example#create-a-github-app)

2) ![Install the bot on your repo](https://github.com/gr2m/github-app-example#install-your-github-app)

3) You will need to create a `.env` file. This file is only for you to view, where you store information such as tokens and Webhook secrets.

4) Generate your app's **Webhoook Secret**. Go to Settings → GitHub Apps → Select your bot and enter a secret code where it says **Webhook Secret**. Save!

5) You'll need an Access Token from Github. Follow steps 1-9 from this [article](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) to generate your token. ⚠️ Make sure to SAVE the token in a document/editor file because it will only be shown to you once.

6) Generate a **private key** for your App by going to Settings->GitHub Apps-> Select your bot and scroll to _Private Key_ to click on **Generate private key**. ⚠️Copy _ALL_ of its content and make sure to PASTE this in a document/editor file because it will only be shown to you once.

6) Create a new file named  ".data/private-key.pem". Paste the ALL of the _private key_ text inside this file.

6) Grab your GitHub App's ID from the settings page.

7) Add your App ID, Access Token and Webhook Secret with the path to the private key to your `.env` file. Look below for an example:
````
APP_ID=123
WEBHOOK_SECRET=yourcode

PRIVATE_KEY_PATH=.data/private-key.pem
TOKEN=aaaaaaaaaaaaaaaaaaaaaaaaaaaaa
````
### 🚦 🏁 How to Start the Server Through Terminal

In your terminal, type `TOKEN=<tokenhere> node server.js`. Make sure to substitute `<tokenhere>` for your access token from Github.

### 🚦 🏁 How to Start the Server Through Glitch
[Glitch](https://glitch.com/) is a platform where we hosted our first-timers-bot. It's so easy to use! Simply add your code and your bot will instantly be live!

### 😮 🙌 👀 🎉 Using the bot
<table>
<tr>
<th>Steps</th>
<th>Example</th>
</tr>
<tr>
<td>1) No need to fork the repo. Edit the file your change and commit message <b>directly</b> on the repo where your Github App is installed on with. Make sure to click on <i>Create a new branch</i> at the bottom and begin the title of the branch with <b>first-timers-only</b>.</td>
<td><img src="/assets/Committing-Branch.png?raw=true"></td>
</tr>
<tr>
<td>2) Click on the <b>issues</b> tab and notice your issue was created with your change and commit message. The contributor would then follow the steps on the issue message.</td>
<td><img src="/assets/Issue-Generated.png?raw=true"</td>
</tr>

## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)

