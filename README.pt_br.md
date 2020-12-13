# first-timers-bot

[![Build Status](https://github.com/hoodiehq/first-timers-bot/workflows/Test/badge.svg)](https://github.com/hoodiehq/first-timers-bot/actions?query=workflow%3ATest+branch%3Amaster) [![Uptime Robot status](https://img.shields.io/uptimerobot/status/m779426128-6b6e81ed8dc987db17d4cad2.svg)](https://stats.uptimerobot.com/LZ40Lcoj4)

### 🐶🎯⛳ A Motivação

Pelas nossas próprias experiências, sabemos que o processo de criar um pull request é a maior barreira para novos contribuidores. Nós queríamos agilizar esse processo criando issues muito simples e amigáveis ao contribuidor, para ajudar mais pessoas a se tornarem contribuidoras Open Source pela primeira vez.

Na Hoodie, nosso objetivo é nos tornarmos a [comunidade Open Source mais acolhedora possível](http://hood.ie/blog/welcoming-communities.html). Unimos forças com iniciativas como a [First Timers Only](http://www.firsttimersonly.com/) e [Your First PR](http://yourfirstpr.github.io/) para buscar ativamente novos contribuidores e criar um ambiente no qual eles se sintam encorajados e apoiados.

Criar o que chamamos de [issues iniciais](http://hood.ie/blog/starter-issues.html) (_starter issues_) é uma possibilidade. E é uma das mais bem sucedidas. Parte dessas issues iniciais são correções simples como erros de digitação, o que é perfeito para integrar pessoas e ajudá-las a se familiarizar com o GitHub e o processo de pull request. Como erros de digitação e issues similares são tão triviais, basicamente poderíamos gerar automaticamente toda a issue inicial com base em um diff.

### 💡💥❓ Como funciona

Digamos que eu seja um contribuidor da Hoodie e encontrei um erro de digitação em algum lugar. Ao invés de corrigir a issue diretamente na branch master ou perder tempo criando um pull request, eu posso simplesmente criar uma nova branch e chamá-la de algo como _first-timers-only-erro-digitacao-no-titulo._ O GitHub irá notificar o **First Timers Bot** sobre a nova branch usando Webhooks. O bot fica de olho em qualquer nova branch que comece com **first-timers-** e criará uma nova issue no seu repositório. O campo commit pode ser usado para contextualizar e adicionar informações e se deixado vazio, a seção 🤔 **What you will need to know** simplesmente exibirá "Nothing :)".

### 😮🙌👀🎉 Use Nosso Bot!

First-timers-bot é construído com [Probot](https://probot.github.io/).

<table>
    <tr>
        <th>Passos</th>
        <th>Exemplo</th>
    </tr>
    <tr>
        <td>1) <a href="https://github.com/apps/first-timers">Instalar App</a> em um repositório à sua escolha</td>
        <td><img src="/assets/Install-App.png?raw=true"></td>
    </tr>
    <tr>
        <td>2) Clique no arquivo que você quer editar.</td>
        <td><img src="/assets/editPic.png?raw=true"></td>
    </tr>
    <tr>
        <td>3) Faça a alteração e escreva a sua mensagem de commit em <b>Commit changes</b>. Certifique-se de marcar <i>Create a new branch</i> no final da página e que a branch começa com <b>"first-timers-"</b>.</td>
        <td><img src="/assets/Committing-Branch.png?raw=true"></td>
    </tr>
    <tr>
        <td>4) Clique na aba <b>issues</b> e perceba que sua issue foi criada com sua alteração e a mensagem de commit. O contribuidor então seguirá os passos na mensagem da issue.</td>
        <td><img src="/assets/Issue-Generated.png?raw=true"</td>
    </tr>
</table>

### 😱🙌😎 Resultado

[Issue de Exemplo Aqui (em Inglês)](https://github.com/arlene-perez/bot-app-test/issues/1)

<p align="center"><img src="/assets/Issue-Done.png"></p>

### Configuração

O app first-timers funciona sem nenhuma configuração. Se você quiser mudar as definições padrões, crie um arquivo .github/first-timers.yml com o conteúdo abaixo e ajuste as opções conforme preferir. Quando tanto o template quanto o repositório estiverem definidos, o template será carregado a partir do repositório _configured_ no caminho de template configurado.

```yaml
# Você pode mudar os labels para se adequarem às suas necessidades se "first-timers-only" não for o que você deseja.
# Esses são alguns exemplos.
labels:
  - first-timers-only

# Se quiser adicionar o seu próprio template a essa issue, crie um arquivo .md na sua pasta .github
template: .github/first-timers-issue-template.md

# Você pode criar uma issue em um repositório diferente do qual o problema está. Apenas certifique-se de que você instalou o bot no repositório configurado.
# A issue irá referenciar o repositório original em que a contribuição será feita.
repository: repo-name
```

**Exemplo de Configuração** 🖥 💯

Nosso arquivo [`.github/first-timers.yml`](https://github.com/hoodiehq/first-timers-bot/blob/master/.github/first-timers.yml) do repositório `hoodiehq/first-timers-bot` está usando o arquivo [`.github/FIRST_TIMERS_ISSUE_TEMPLATE.md`](https://github.com/hoodiehq/camp/blob/gh-pages/.github/FIRST_TIMERS_ISSUE_TEMPLATE.md) do repositório `hoodiehq/camp` como template para criar uma issue como essa: https://github.com/hoodiehq/camp/issues/126.

### Status do Servidor

Verifique se o distintivo de **status** no topo deste arquivo está marcado como `up`.

### 👩‍💻💕Quem Somos

<!-- Contributors START
Angie_Gonzalez agonzalez0515 https://agonzalez0515.github.io
Arlene_Perez techforchange https://github.com/techforchange
Contributors END -->
<!-- Contributors table START -->

| <img src="https://avatars.githubusercontent.com/agonzalez0515?s=100" width="100" alt="Angie Gonzalez" /><br />[<sub>Angie Gonzalez</sub>](https://agonzalez0515.github.io)<br /> | <img src="https://avatars.githubusercontent.com/techforchange?s=100" width="100" alt="Arlene Perez" /><br />[<sub>Arlene Perez</sub>](https://github.com/techforchange)<br /> |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- Contributors table END -->

Angie e Arlene são naturais de Los Angeles e se conheceram ao frequentar o Dev BootCamp em San Francisco. Quando o bootcamp terminou e voltaram a LA, elas ficaram com vontade de fazer parte mais uma vez de uma comunidade incrível e acolhedora como aquela do Dev BootCamp em San Francisco. Por isso fundaram Hoodie através do [Rails Girls Summer of Code](https://railsgirlssummerofcode.org/)! Esse projeto é ainda mais especial para elas por ter sido a primeira contribuição open source de ambas.

### Contribuidores

Obrigado a todos aqueles que contribuíram com esse projeto.

<!-- Contributors START
 Michael_McCombie michaelmccombie https://twitter.com/michaelbuilds design
 Gregor_Martynus gr2m https://twitter.com/gr2m mentor
 Contributors END -->
<!-- Contributors table START -->

| <img src="https://avatars.githubusercontent.com/michaelmccombie?s=100" width="100" alt="Michael McCombie" /><br />[<sub>Michael McCombie</sub>](https://twitter.com/michaelbuilds)<br />[🎨](https://raw.githubusercontent.com/hoodiehq/first-timers-bot/51742c62ae3e4e2be7e58d170a9eab73a3871bf4/assets/avatar.png) | <img src="https://avatars.githubusercontent.com/gr2m?s=100" width="100" alt="Gregor Martynus" /><br />[<sub>Gregor Martynus</sub>](https://twitter.com/gr2m)<br />👨🏻‍🏫 |
| :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :------------------------------------------------------------------------------------------------------------------------------------------------------------------: |

<!-- Contributors table END -->

Esse projeto segue a especificação [all-contributors](https://github.com/kentcdodds/all-contributors).

### Licença

[Apache 2.0](http://www.apache.org/licenses/LICENSE-2.0)
