// describe('FadeAnimation constructor', function(){
//   var newAnimation,
//       effect,
//       element,
//       win,
//       complete;

//       effect = {
//         enter: {opacity: 1},
//         leave: {opacity: 0},
//         animation: 'fade-normal'
//       };

//       element = angular.element('<div>...</div>');
//       element.css('opacity', 0);
//       complete = function(log){
//         console.log(log);
//       };
//   beforeEach(module('fx.animations.fades'));

//   beforeEach(function(){
//     inject(function(FadeAnimation, $window){
//       win = $window
//       newAnimation = new FadeAnimation(effect);
//     });
//   });

//   it('should fade in on enter', function(done){
//     newAnimation.enter(element, complete);
//     console.log(element.css('opacity'));
//     win.setTimeout(function(){
//       console.log(element.css('opacity'));
//       done();
//     }, 2000);
//   });
// });

describe('Testing Async Animations', function() {
  var testCase = false;
  beforeEach(module('ngAnimate'));
  beforeEach(module('ngAnimateMock'));
  beforeEach(module(function($animateProvider){
    $animateProvider.register('.fade', function(){
      return {
        enter: function(element, done){
          testCase = true;
          done();
        }
      };
    });
  }));

  it("should asynchronously test the animation", function() {
    inject(function($animate, $compile, $document, $rootScope, $rootElement) {
      var element = $compile('<div class="fade">hello</div>')($rootScope);
      $rootElement.append(element);
      angular.element($document[0].body).append($rootElement);
      $animate.enabled(true);
      $animate.enter(element, $rootElement);
      $rootScope.$digest();
      expect(testCase).to.be(true);
    });
  });

});