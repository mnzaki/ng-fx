ngAnimations.js
===============

A conversion of animate.css into angular ngAnimate javascript. ALl animations are don in Javascript, no CSS.


## How to use it
1. all you need is `dist/animations.js`
2. `bower install` ng-Animations rely on ng-animate and GSAP
3. add to your angular app and your HTML file

``` javascript

angular.module('app', ['animations'])
```

### Applying the animations
1. animations work with ng-animate so you can use them on ng-repeat/ng-show/ng-hide/ng-if/ng-switch/ng-class/ng-view/nginclude
2. Just add the name of the animation as the class on the element you want to animate

``` html
<h1 ng-init='nums=[1,2,3,4]' ng-repeat='num in nums' class='fade-left'>
  {{ num }}
</h1>
```

## What's next?
1.Eventing system for animations, so for example below, the element will trigger an even when the fade-up animation is complete.

2.animations for dom events / directives, so for example, below, the img will render a shake animation when the mouse hovers over it

3.More animations!

4 A better README.md :)
``` html
<div ng-if='show' class='trigger fade-up'>Hey</div> <!-- eventing system -->
```

``` html
<img src='pic.jpeg' class='img' animate-hover='shake' /> <!-- dom events -->
```
