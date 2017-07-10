# first-timers-only-bot

> Creates friendly issues for contributors

This is work-in-progress. See [hoodiehq/camp#105](https://github.com/hoodiehq/camp/issues/105)


How To Start Server

let’s merge #44 first, but then it would be nice if you could create a PR for the README.md file which explains what the project (currently) does, how to set it up, etc. That makes it more accessible to others, and it’s Open Source best practise to always have a great README :) You can take lots of the content from https://github.com/hoodiehq/first-timers-only-bot and also reference it, explaining where the project currently is in the process



🐶🎯⛳ The Motivation

We know that the process of creating a pull request is the biggest barrier for new contributors.  We wanted to streamline the process to create very simple contributor-friendly issues to help onboard more people to become Open Source contributors for the "first time".

At Hoodie, we aim to become the most welcoming Open Source community possible. We joined forces with initiatives like First Timers Only and Your First PR to actively reach out to new contributors and create an environment where they feel encouraged and supported.

Creating what we call starter issues is one aspect of that. And it is one of the most successful. A subset of these starter issues are super simple fixes like typos, so they are perfect to onboard people and help them get familiar with GitHub and the pull request workflow. Because typos and similar issues are so trivial, we should basically be able to automatically generate the entire starter issue based on a diff.

💡💥❓ How things work (currently)

Say I’m a Hoodie contributor and find a typo somewhere. Instead of fixing the issue directly in the master branch or creating a pull request, I create a new branch that is call something like first-timers-only-typo-in-title. GitHub will notify the "first-timers-only issue bot" about the new branch using webhooks. Currently, the bot will see that a new branch was created and it will create a new issue at https://github.com/hoodiehq/camp/issues/new based on a template and assign the first-timers-only and the up-for-grabs label. If the commit body can be used to add some context information. If left empty, the 🤔 What you will need to know section of the issue will simply say "Nothing :)". Otherwise the commit body will be used there.

We are in the progress of updating the bot to watch only for branches starting with "first-timers-only".😃

NOTE: Add picture of an issue example
