ng-Fx    [![Build Status](https://travis-ci.org/Hendrixer/ngFx.svg?branch=master)](https://travis-ci.org/Hendrixer/ng-Fx)   <img src="http://img.shields.io/badge/Built%20with-Gulp-red.svg" />
===============

### A simple way to add beautiful animations to your angular apps. Animations based off [animate.css](http://daneden.github.io/animate.css/). All animations are built in JavaScript.

#### ng-Fx does not rely on CSS for animations. This allows it to be dynamic and able to adjust on the fly. The only predefined CSS classes are the animations and the easings. ngAnimate allows ngFx to create JavaScript based animations, so the classes do not correspond to a style in a CSS file.

## Interactive Demo
Preview the goodness at [hendrixer.github.io](https://hendrixer.github.io/).

## Dependencies
+ Angular.js (1.3+)
+ GSAP/tweenmax.js
+ ngAnimate (1.3+)

## Downloading
1. The best way to install ng-Fx is to use bower or npm
    + ```bower install ngFx --save```
    + ```npm i ngFx --save```
2. Or, from this repo
  + you'll need the main file in ```dist/ngFx.js```

## Installing
2. Include  ```ngFx.js``` into your html. 
  + __Note:__ ```ngFx``` depends on ```ngAnimate``` and ```GSAP - TweenMax.js```
3. Include the dependencies into your angular app,  ```ngFx```
```javascript
angular.module('myApp', ['ngFx', 'ngAnimate'])
```
##Using
###Animations
There are two types of animations:
* Dynamic
  - Animations that will result in an element entering/leaving the page (fade-out)
* Static
  - Animations that will not result in an element entering/leaving the page (shake)
+ All dynamic animations tie into ngAnimate hooks. So you can apply them to...
  + ng-hide / ng-show
  + ng-include
  + ng-if
  + ng-view
  + ui-view (if you're using ui.router)
  + ng-switch
  + ng-class
  + ng-repeat
+ Static animations can be applied manually with `$animate`.
+ Adding the animations are as simple as adding a css class. ngFx uses the ```'fx'``` name space. Here's an example using a fade animation. The list items will enter / leave / and move with the 'fade-down' animation. __Note that ngAnimate will not trigger animations upon page load, to prevent all animations firing at once.Can hack this with a delay__.

```javascript
angular.module('foodApp', ['ngFx'])
.controller('FoodController', function($scope, $timeout){
  $scope.foods = [];
  $timeout(function(){
    $scope.foods = ['apple', 'muffin', 'chips'];
  },0);
});
```
```html
<ul ng-controller="FoodController">
  <li class='fx-fade-down' ng-repeat="food in foods">
    {{ food }}
  </li>
</ul>
```

+ Here's and example of manually trigger a static animation with `$animate`

```javascript
angular.module('foodApp', ['ngFx'])
.directive('pulseOnClick', function($animate){
  return function(scope, elem){
    elem.on('click', function(){
      $animate.animate(elem, 'someclass')
        .then(function(){
          console.log('Done pulsing');
        })
      scope.$apply();
    });
  };
});
```
```html
<button class="fx-pulse fx-speed-1232" pulse-on-click>pulsing</button>
```

###Easings
+ You can also add a different easing to any animation you want. It is as easy as adding an animation, just use a CSS class. Building on the previous example, you can just add ```fx-easing-your easing here```
```html
<ul ng-controller="FoodController">
  <li class='fx-fade-down fx-easing-bounce' ng-repeat="food in foods">
    {{ food }}
  </li>
</ul>
```
###Speed
+ Adjusting the speed in the ng-fx is a snap too! The speeds at which your animations enter and leave your app are totally up to you. You just have to add a CSS class. ```fx-speed-your speed in milliseconds```. All animations have their own default speed if not provided by you. There are __no predefined classes for speeds__. Any speed (in ms) can be accepted.
```html
<ul ng-controller="FoodController">
  <li class='fx-fade-down fx-easing-bounce fx-speed-800' ng-repeat="food in foods">
    {{ food }}
  </li>
</ul>
```
###Events
+ Animations will emit events to your app when they have finished. You can listen to these events in your controllers and directives to perform other things. When an animation is complete the event will look like so ' [animation name] :[enter or leave]', for example 'fade-down:enter' or 'zoom-up:leave'. You just have to add the CSS class ```fx-trigger``` to an animated element.
```javascript
angular.module('myApp', ['ngFx'])
.controller('FoodController', function($scope, $timeout){
  $scope.foods = [];
  $timeout(function(){
    $scope.foods = ['apple', 'muffin', 'chips'];
  }, 100);
})
.directive('goAway', function($animate){
  function link(scope, element){
    scope.$on('fade-down:enter', function(){
      $animate.leave(element);
    });
  }
  return {
    restrict: 'A',
    link: link
  };
});
```
```html
<div ng-controller="FoodController">
  <h1 go-away class='fx-zoom-up'> This will zoom out when the fade animation is done</h1>
  <ul>
    <li class='fx-fade-down fx-easing-bounce fx-speed-800 fx-trigger' ng-repeat="food in foods">
      {{ food }}
    </li>
  </ul>
</div>
```
###List of animations and ease types
+ [Animations](https://github.com/Hendrixer/ng-Fx/blob/master/animationList.txt)
+ [Ease Types](https://github.com/Hendrixer/ng-Fx/blob/master/easingList.txt)

##What's next
+ More animations
+ More flexibility
+ Easy api to create your own animations
+ Events triggered are unique to element and not just animation type

##Contributing
1. Fork it
2. Clone your fork
3. Create new branch
4. Make changes
5. Make test and check test
6. Build it, run ```gulp``` and the files will be concatenated, and minified
7. Push to new branch on your forked repo
8. Pull request from your branch to ngFx master

###Format for pull request
+ Pretty standard
  + in your commit message; ```(type) message [issue # closed]```
    + ```(bug) killed that bug, closes #45```
  + if you're submitting new animations:
    + ```(new fx) added 3d rotation animation ```
+ Submit issues as you see them. There are probably better, faster, easier ways to achieve what ngFx is designed to do so.

###Testing
+ ngFx uses Karma + Jasmine + Travis for unit and ci
+ Make sure you didn't break anything
  + run ```karma start``` to test in Chrome with karma
+ Features will not be accepted without specs created for them
+ Run ```gulp``` and all the source files will be watched and concatenated
+ Open the ```index.html``` and use the test app as a playground
