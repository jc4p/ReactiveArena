# ReactiveArena
React Native based front-end for http://are.na

I freaking love are.na for collating everything from my thoughts (so over having 100+ items in a bookmark folder on Chrome) to dank af memes. I'm a mobile dev by trade and have been thinking about how perfect are.na's interface will be for phones/tablets since the first time I loaded the webpage, so...

Hopefully this will become a full fledged client for are.na, but right now it only loads one channel ( https://www.are.na/lukas-wp/communist-memes ) which is images-only. My current build looks like this:

[![screencap ios](http://i.imgur.com/e0W7wI1.png)](http://i.imgur.com/e0W7wI1.png)
[![screencap android](http://i.imgur.com/Tzxpckt.jpg)](http://i.imgur.com/Tzxpckt.jpg)

## Code Layout

All the code you might possibly care about is in `src/`. The rest is React Native skeleton generated from the initial `react-native init`. I have been testing on iOS only so far, which means Android doesn't work yet. I'm not using any iOS specific components (lesson learned!) so I should just need to hook some wires up to make it work (fingers crossed emoji).

[`src/index.js`](https://github.com/jc4p/ReactiveArena/blob/master/src/index.js) is the main view controller, and [`src/api.js`](https://github.com/jc4p/ReactiveArena/blob/master/src/api.js) is my work-bed for the actual are.na API code.

I'm hoping that as I add the API calls I need (and auth) to `api.js`, eventually I'll spin it out as its own node module for are.na that anyone else can use too.

## Contributing

Please dear god feel free to help in any way you would like. Anything from helping flesh out requirements (open Issues or leave comments on [Version 0.1 Milestone](https://github.com/jc4p/ReactiveArena/issues/1)!), to styling (I need a better dev story for this, I'm not a fan of styles-as-js like React Native likes) to implementing features.

To run the app locally, you first need to install some tooling, see [React Native's Getting Started](https://facebook.github.io/react-native/docs/getting-started.html). Once you have `react-native-cli` installed, clone this repository and:

- `cd ReactiveArena`
- `npm install`
- `react-native run-ios`
