---
title: Upgrading to Gatsby 3
date: 2021-05-16
tags:
  - Tech
---

If you're reading this I successfully updated this thing to Gatsby 3. Firstly, as I don't have a large number of dependencies, I decided to update my dependencies one by one and check for breaking changes by running `gatsby build` after every upgrade. I saved big things like React and Gatsby itself for last. I enabled [renovate](https://www.whitesourcesoftware.com/free-developer-tools/renovate) to make this process easier. It still wasn't a painless update, there were various tweaks I had to make on various Gatsby plugins, but the actual upgrade for the core Gatsby went without issue. I initially wasn't in a big rush to upgrade to Gatsby 3, until I read that they were experimenting with server components. Anyway I'm in a hurry, I may update this later with a little more depth.