// angular.module('fx.animations.create', ['fx.animations.assist'])


//   .factory('Flip3d', ['$window', function ($window){
//     return function (effect){
//       var axis = effect.axis;
//       var flipType = 'fx-flip'+axis;
//       this.addClass = function(el, className, done){
//         var wrapper = angular.element(el.children()[0]);
//         var myDone = function(){
//           return done();
//         };
//         if(className === flipType){
//           effect.transform.ease = $window.Bounce.easeOut;
//           effect.transform.onComplete = myDone;
//           TweenMax.to(wrapper, effect.duration, effect.transform);
//         } else {
//           done();
//         }
//       };

//       this.removeClass = function(el, className, done){
//         var wrapper = angular.element(el.children()[0]);
//         var myDone = function(){
//           return done();
//         };
//         if(className === flipType){
//           effect.reset.ease = $window.Bounce.easeOut;
//           effect.reset.onComplete = myDone;
//           TweenMax.to(wrapper, effect.duration, effect.reset);
//         } else {
//           done();
//         }
//       };
//     };
//   }]);


