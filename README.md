# first-timers-bot

[![Build Status](https://github.com/hoodiehq/first-timers-bot/workflows/Test/badge.svg)](https://github.com/hoodiehq/first-timers-bot/actions?query=workflow%3ATest+branch%3Amaster) [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/LZ40Lcoj4)

### 🐶🎯⛳ The Motivation

From our own experiences, we know the process of creating a pull request is the biggest barrier for new contributors. We wanted to streamline the process to create very simple contributor-friendly issues to help onboard more people to become Open Source contributors for the first time.

At Hoodie, we aim to become the most [welcoming Open Source community possible](http://hood.ie/blog/welcoming-communities.html). We joined forces with initiatives like [First Timers Only](http://www.firsttimersonly.com/) and [Your First PR](http://yourfirstpr.github.io/) to actively reach out to new contributors and create an environment where they feel encouraged and supported.

Creating what we call [starter issues](http://hood.ie/blog/starter-issues.html) is one aspect of that. And it is one of the most successful. A subset of these starter issues are super simple fixes like typos, so they are perfect to onboard people and help them get familiar with GitHub and the pull request workflow. Because typos and similar issues are so trivial, we should basically be able to automatically generate the entire starter issue based on a diff.

### 💡💥❓ How Things Work

Say I’m a Hoodie contributor and find a typo somewhere. Instead of fixing the issue directly in the master branch or creating a pull request which is time-consuming, I can simply create a new branch that is called something like _first-timers-only-typo-in-title._ GitHub will then notify the **First Timers Bot** about the new branch using Webhooks. The bot is listening to any new branch starting with **first-timers-** and it will create a new issue on your repo. The commit body can be used to add some context information and if left empty, the 🤔 **What you will need to know** section of the issue will simply say "Nothing :)".

### 😮🙌👀🎉 Use Our Bot!

First-timers-bot is built with [Probot](https://probot.github.io/).

<table>
    <tr>
        <th>Steps</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>1) <a href="https://github.com/apps/first-timers">Install App</a> on a repo of your choice</td>
        <td><img src="/assets/Install-App.png?raw=true"></td>
    </tr>
    <tr>
        <td>2) Click on the file you want to edit.</td>
        <td><img src="/assets/editPic.png?raw=true"></td>
    </tr>
    <tr>
        <td>3) Make the change and write your commit message under <b>Commit changes</b>.  Make sure to check <i>Create a new branch</i> at the bottom and the branch needs to start with <b>"first-timers-"</b>.</td>
        <td><img src="/assets/Committing-Branch.png?raw=true"></td>
    </tr>
    <tr>
        <td>4) Click on the <b>issues</b> tab and notice your issue was created with your change and commit message. The contributor would then follow the steps on the issue message.</td>
        <td><img src="/assets/Issue-Generated.png?raw=true"</td>
    </tr>
</table>

### 😱🙌😎 Result

[Issue Example Here](https://github.com/arlene-perez/bot-app-test/issues/1)

<p align="center"><img src="/assets/Issue-Done.png"></p>

### Configuration

The first-timers app works without configuration. If you want to change the default settings, create a .github/first-timers.yml file with the content below and then you can adjust the options to your preference. When both the template & the repository is set, then the template is loaded from the _configured_ repository at the configured template path.

```yaml
# You can change the labels to suit your needs if "first-timers-only" is not what you are looking for.
# These are some examples.
labels:
  - first-timers-only

# If you would like to add your own template for the issue, add an .md file to your .github folder
template: .github/first-timers-issue-template.md
# In order to load the template from another repository, prefix the path with "<repo>:", e.g.
# template: other-repo:.github/first-timers-issue-template.md

# You can create the issue in a different repo than where the problem is. Just make sure you installed the bot on the configured repository.
# The issue will link back to the original repository where the contribution will be made.
repository: repo-name
```

The following placeholders are supported in the template and will be replaced upon creation:

- `$DIFF`: The diff string
- `$FILENAME`: The file name
- `$BRANCH_URL`: URL to the file on github.com
- `$REPO`: name of the repository
- `$AUTHOR`: author of the user who created the commit
- `$COMMIT_BODY`: The body of the commit

**Configuration Example** 🖥 💯

Our `hoodiehq/first-timers-bot` repository’s [`.github/first-timers.yml`](https://github.com/hoodiehq/first-timers-bot/blob/master/.github/first-timers.yml) file is using `hoodiehq/camp` repository’s [`.github/FIRST_TIMERS_ISSUE_TEMPLATE.md`](https://github.com/hoodiehq/camp/blob/gh-pages/.github/FIRST_TIMERS_ISSUE_TEMPLATE.md) file as a template to create an issue such as this one: https://github.com/hoodiehq/camp/issues/126.

### Server Status

Make sure to verify that the **status** badge at the top of this file is labeled as `up`. You can check the current status at https://stats.uptimerobot.com/LZ40Lcoj4

### 👩‍💻💕About Us

<!-- Contributors START
Angie_Gonzalez agonzalez0515 https://agonzalez0515.github.io
Arlene_Perez techforchange https://github.com/techforchange
Contributors END -->
<!-- Contributors table START -->

| <img src="https://avatars.githubusercontent.com/agonzalez0515?s=100" width="100" alt="Angie Gonzalez" /><br />[<sub>Angie Gonzalez</sub>](https://agonzalez0515.github.io)<br /> | <img src="https://avatars.githubusercontent.com/techforchange?s=100" width="100" alt="Arlene Perez" /><br />[<sub>Arlene Perez</sub>](https://github.com/techforchange)<br /> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- Contributors table END -->

Angie and Arlene are LA natives that met while attending Dev Bootcamp in San Francisco. After bootcamp was over and they were back in LA, they wanted to once again be part of an amazing, welcoming community like DBC was. They found Hoodie through [Rails Girls Summer of Code](https://railsgirlssummerofcode.org/)! This project is extra special for them as it is their first contribution to open source.

### Contributors

Thank you to everyone who has helped with this project.

<!-- Contributors START
 Michael_McCombie michaelmccombie https://twitter.com/michaelbuilds design
 Gregor_Martynus gr2m https://twitter.com/gr2m mentor
 Contributors END -->
<!-- Contributors table START -->

| <img src="https://avatars.githubusercontent.com/michaelmccombie?s=100" width="100" alt="Michael McCombie" /><br />[<sub>Michael McCombie</sub>](https://twitter.com/michaelbuilds)<br />[🎨](https://raw.githubusercontent.com/hoodiehq/first-timers-bot/51742c62ae3e4e2be7e58d170a9eab73a3871bf4/assets/avatar.png) | <img src="https://avatars.githubusercontent.com/gr2m?s=100" width="100" alt="Gregor Martynus" /><br />[<sub>Gregor Martynus</sub>](https://twitter.com/gr2m)<br />👨🏻‍🏫 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- Contributors table END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

### License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
