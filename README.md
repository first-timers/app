# first-timers-only-bot

### 🐶 🎯⛳ The Motivation

We know that the process of creating a pull request is the biggest barrier for new contributors.  We wanted to streamline the process to create very simple contributor-friendly issues to help onboard more people to become Open Source contributors for the "first time".

At Hoodie, we aim to become the most [welcoming Open Source community possible](http://hood.ie/blog/welcoming-communities.html). We joined forces with initiatives like [First Timers Only](http://www.firsttimersonly.com/) and [Your First PR](http://yourfirstpr.github.io/) to actively reach out to new contributors and create an environment where they feel encouraged and supported.

Creating what we call [starter issues](http://hood.ie/blog/starter-issues.html) is one aspect of that. And it is one of the most successful. A subset of these starter issues are super simple fixes like typos, so they are perfect to onboard people and help them get familiar with GitHub and the pull request workflow. Because typos and similar issues are so trivial, we should basically be able to automatically generate the entire starter issue based on a diff.

### 💡💥❓ How things work

Say I’m a Hoodie contributor and find a typo somewhere. Instead of fixing the issue directly in the master branch or creating a pull request, I create a new branch that is call something like first-timers-only-typo-in-title. GitHub will notify the "first-timers-only issue bot" about the new branch using webhooks. Currently, the bot will see that a new branch was created and it will create a new issue at https://github.com/hoodiehq/camp/issues/new based on a template and assign the first-timers-only and the up-for-grabs label. If the commit body can be used to add some context information. If left empty, the 🤔 What you will need to know section of the issue will simply say "Nothing :)". Otherwise the commit body will be used there.

We are in the progress of updating the bot to watch only for branches starting with "first-timers-only".😃

NOTE: Add picture of an issue example

### Requirements
1) You'll need an Access Token from Github. Follow steps 1-9 from this [article](https://help.github.com/articles/creating-a-personal-access-token-for-the-command-line/) to generate your token. Make sure to SAVE the token in a document/editor file because it will only be shown to you once.

2) Install [Node.js](https://nodejs.org/en/)

3) Install [Hapi](https://hapijs.com/)

### Setup
```
mkdir my-app
cd my-app
git clone https://github.com/hoodiehq/first-timers-only-bot.git
cd first-timers-only-bot

```

###How to Start the Server

In your terminal, type `TOKEN=<tokenhere> node server.js`. Make sure to substitute `<tokenhere>` for your access token from Github.

### Using the bot
