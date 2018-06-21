<!-- <img src="/assets/pwa_badge.svg" align="right" /> -->

# Bablo - bo hajs musi się zgadzać

[![style: styled-components](https://img.shields.io/badge/style-%F0%9F%92%85%20styled--components-orange.svg?colorB=daa357&colorA=db748e)](https://github.com/styled-components/styled-components)

![Bablo - bo hajs musi się zgadzać](/assets/bablo_wide.svg)

> Working demo here [bablo.herokuapp.com](https://bablo.herokuapp.com). Best to open on a mobile.

A PWA (Progessive Web App) for your delight. This app will make a tedious process of calculating the arithmetic average of the USD to UAH currency rates from the last three months from the date you choose as simple as pressing a button. Plus there's a two-way calculator to convert both currencies.

## How to use 🔨

[animowany gif jak uywać]

## Why? 🧐

You police?

## How? ✨

[ReactJS](https://reactjs.org) with [create-react-app](https://github.com/facebook/create-react-app)!

Instead of Redux I've used the new Context API. It worked well for simple tasks like localization. Redux would be much better choice for more complicated tasks, but thanks to small scale of the app, the Context API worked well too.

Besides there's a great [ChartJS](https://chartjs.org) library used for the graph, [momentjs](http://momentjs.com/) to deal with time, [styled-components](https://www.styled-components.com/) and [react-datepicker](https://reactdatepicker.com/).

## PWA 🚀

Thanks to the Service Worker the app works offline, it prompts the user for the installation and caches last results in local storage. It works on iOS 11.3 too, with expception of the install prompt of course.
[animowany gif pokazujący instalację]

## Installing 🔩

Just clone the repo and then run

```
yarn install
```

or if you stick to raw npm, then

```
npm install
```

Rest of the scripts are the same as in [create-react-app](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#available-scripts) toolbox.

## Contributing 🤝

If you find this little project interesting and wanted to add something, or you've found some utter nonsense in the code that infuses internal pain in you, than don't hesitate and do a PR or report an issue. All are very much welcome.
