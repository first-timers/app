# first-timers-bot

[![Build Status](https://travis-ci.org/hoodiehq/first-timers-bot.svg?branch=master)](https://travis-ci.org/hoodiehq/first-timers-bot) [![Coverage Status](https://coveralls.io/repos/github/hoodiehq/first-timers-bot/badge.svg?branch=master)](https://coveralls.io/github/hoodiehq/first-timers-bot?branch=master) [![Greenkeeper badge](https://badges.greenkeeper.io/hoodiehq/first-timers-bot.svg)](https://greenkeeper.io/) [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/LZ40Lcoj4)

### 🐶🎯⛳ Die Motivation

Aus eigener Erfahrung wissen wir, dass der Prozess der Erstellung einer Pull-Anfrage das größte Hindernis für neue Mitwirkende darstellt. Wir wollten den Prozess rationalisieren, um sehr einfache beitragsorientierte Themen zu erstellen, mit denen mehr Menschen zum ersten Mal Open Source-Beiträge leisten können.


Unser Ziel bei Hoodie ist es, die einladendste Open Source-Community zu werden (http://hood.ie/blog/welcoming-communities.html). Wir haben uns mit Initiativen wie [First Timers Only] (http://www.firsttimersonly.com/) und [Your First PR] (http://yourfirstpr.github.io/) zusammengetan, um neue Mitarbeiter zu erreichen und neue zu schaffen ein Umfeld, in dem sie sich ermutigt und unterstützt fühlen.


### 💡💥❓ Wie Dinge funktionieren


Angenommen, ich bin ein Hoodie-Mitarbeiter und finde irgendwo einen Tippfehler. Anstatt das Problem direkt im Hauptzweig zu beheben oder eine zeitaufwendige Pull-Anforderung zu erstellen, kann ich einfach einen neuen Zweig mit dem Namen _first-timers-only-typo-in-title erstellen ._ GitHub benachrichtigt dann Der ** First Timers Bot ** über den neuen Zweig mit Webhooks. Der Bot hört sich jeden neuen Zweig an, der mit ** first-timers - ** beginnt, und erstellt eine neue Ausgabe auf Ihrem Repo. Der Festschreibungshauptteil kann verwendet werden, um einige Kontextinformationen hinzuzufügen, und wenn er leer gelassen wird, sagt der Abschnitt "Was Sie wissen müssen" des Problems einfach "Nichts :)".


### 😮🙌👀🎉 Nutzen Sie unseren Bot!

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

### 😱🙌😎 Ergebnis

[Issue Example Here](https://github.com/arlene-perez/bot-app-test/issues/1)

<p align="center"><img src="/assets/Issue-Done.png"></p>

### Aufbau

Die Erstanwender-App funktioniert ohne Konfiguration. Wenn Sie die Standardeinstellungen ändern möchten, erstellen Sie eine .github / first-timers.yml-Datei mit dem folgenden Inhalt. Anschließend können Sie die Optionen nach Ihren Wünschen anpassen. Wenn sowohl die Vorlage als auch das Repository festgelegt sind, wird die Vorlage aus dem konfigurierten Repository im konfigurierten Vorlagenpfad geladen.


```yaml
# Sie können die Beschriftungen an Ihre Bedürfnisse anpassen, wenn "nur für Erstanwender" nicht das ist, wonach Sie suchen.
# Dies sind einige Beispiele.
Etiketten:
  - nur für Erstbesucher

# Wenn Sie eine eigene Vorlage für das Problem hinzufügen möchten, fügen Sie Ihrem Ordner .github eine .md-Datei hinzu
template: .github / first-timers-issue-template.md

# Sie können das Problem in einem anderen Repo als dem erstellen, in dem es liegt. Stellen Sie einfach sicher, dass Sie den Bot auf dem konfigurierten Repository installiert haben.
# Das Problem wird mit dem ursprünglichen Repository verknüpft, in dem der Beitrag geleistet wird.
Repository: Reponame
```
**Konfigurationsbeispiel** 🖥 💯

Our `hoodiehq/first-timers-bot` repository’s [`.github/first-timers.yml`](https://github.com/hoodiehq/first-timers-bot/blob/master/.github/first-timers.yml) file is using `hoodiehq/camp` repository’s [`.github/FIRST_TIMERS_ISSUE_TEMPLATE.md`](https://github.com/hoodiehq/camp/blob/gh-pages/.github/FIRST_TIMERS_ISSUE_TEMPLATE.md) file as a template to create an issue such as this one: https://github.com/hoodiehq/camp/issues/126.

### Server Status
Vergewissern Sie sich, dass das ** Status ** -Zeichen oben in dieser Datei mit `up` gekennzeichnet ist. First Timers Bot ist eine Node-App, auf der derzeit ausgeführt wird
[Now](https://zeit.co/now).

### 👩‍💻💕Über uns

<!-- Contributors START
Angie_Gonzalez agonzalez0515 https://agonzalez0515.github.io
Arlene_Perez techforchange https://github.com/techforchange
Contributors END -->
<!-- Contributors table START -->
| <img src="https://avatars.githubusercontent.com/agonzalez0515?s=100" width="100" alt="Angie Gonzalez" /><br />[<sub>Angie Gonzalez</sub>](https://agonzalez0515.github.io)<br /> | <img src="https://avatars.githubusercontent.com/techforchange?s=100" width="100" alt="Arlene Perez" /><br />[<sub>Arlene Perez</sub>](https://github.com/techforchange)<br /> |
| :---: | :---: |
<!-- Contributors table END -->

Angie und Arlene sind Einheimische aus LA, die sich auf dem Dev Bootcamp in San Francisco kennengelernt haben. Nachdem das Bootcamp vorbei war und sie wieder in LA waren, wollten sie wieder Teil einer fantastischen, einladenden Community wie DBC sein. Sie fanden Hoodie durch [Rails Girls Summer of Code] (https://railsgirlssummerofcode.org/)! Dieses Projekt ist für sie etwas Besonderes, da es ihr erster Beitrag zu Open Source ist.

### Mitwirkende

Vielen Dank an alle, die an diesem Projekt mitgewirkt haben.

<!-- Contributors START
 Michael_McCombie michaelmccombie https://twitter.com/michaelbuilds design
 Gregor_Martynus gr2m https://twitter.com/gr2m mentor
 Contributors END -->
<!-- Contributors table START -->
| <img src="https://avatars.githubusercontent.com/michaelmccombie?s=100" width="100" alt="Michael McCombie" /><br />[<sub>Michael McCombie</sub>](https://twitter.com/michaelbuilds)<br />[🎨](https://raw.githubusercontent.com/hoodiehq/first-timers-bot/51742c62ae3e4e2be7e58d170a9eab73a3871bf4/assets/avatar.png) | <img src="https://avatars.githubusercontent.com/gr2m?s=100" width="100" alt="Gregor Martynus" /><br />[<sub>Gregor Martynus</sub>](https://twitter.com/gr2m)<br />👨🏻‍🏫 |
| :---: | :---: |
<!-- Contributors table END -->
This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification.

### Lizenz

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
