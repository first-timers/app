# first-timers-only-bot

### 🐶 🎯⛳ The Motivation

From our own experiences, we know the process of creating a pull request is the biggest barrier for new contributors.  We wanted to streamline the process to create very simple contributor-friendly issues to help onboard more people to become Open Source contributors for the first time.

At Hoodie, we aim to become the most [welcoming Open Source community possible](http://hood.ie/blog/welcoming-communities.html). We joined forces with initiatives like [First Timers Only](http://www.firsttimersonly.com/) and [Your First PR](http://yourfirstpr.github.io/) to actively reach out to new contributors and create an environment where they feel encouraged and supported.

Creating what we call [starter issues](http://hood.ie/blog/starter-issues.html) is one aspect of that. And it is one of the most successful. A subset of these starter issues are super simple fixes like typos, so they are perfect to onboard people and help them get familiar with GitHub and the pull request workflow. Because typos and similar issues are so trivial, we should basically be able to automatically generate the entire starter issue based on a diff.

### 💡💥❓ How things work

Say I’m a Hoodie contributor and find a typo somewhere. Instead of fixing the issue directly in the master branch or creating a pull request which is time-consuming, I can simply create a new branch that is called something like **first-timers-only-typo-in-title.** GitHub will then notify the "first-timers-only issue bot" about the new branch using Webhooks. The bot is listening to any new branch starting with **first-timers-only** and it will create a new issue on your repo. It is currently setup to the Hoodie repo with a template and assigns the first-timers-only and up-for-grabs labels but can be modified by the developer. The commit body can be used to add some context information and if left empty, the 🤔 **What you will need to know** section of the issue will simply say "Nothing :)".


### 😮 🙌 👀 🎉 Use Our Bot!

<table>
    <tr>
        <th>Steps</th>
        <th>Example</th>
    </tr>
    <tr>
        <td>1) [Install App](https://github.com/apps/first-timers-bot)</td>
    </tr>
    <tr>
        <td>2) Try it out on this [repo](https://github.com/First-timers-bot/first-timers-test)!</td>
    </tr>
    <tr>
        <td>3) No need to fork the repo. Edit the file your change and commit message <b>directly</b> on the repo where your Github App is installed on with. Make sure to click on <i>Create a new branch</i> at the bottom and begin the title of the branch with <b>first-timers-only</b>.</td>
        <td><img src="/assets/Committing-Branch.png?raw=true"></td>
    </tr>
    <tr>
        <td>4) Click on the <b>issues</b> tab and notice your issue was created with your change and commit message. The contributor would then follow the steps on the issue message.</td>
        <td><img src="/assets/Issue-Generated.png?raw=true"</td>
</tr>
</table>

### 😱 🙌 😎Result

[Issue Example Here](https://github.com/arlene-perez/bot-app-test/issues/1)

<p align="center"><img src="/assets/Issue-Done.png"></p>


## License

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
