describe('Fade animation constructor', function(){
  var newAnimation,
      effect,
      element,
      fin,
      $win;
  beforeEach(module('fx.animations.create'));

  beforeEach(function(){
    inject(function(FadeAnimation, $window){
      effect = {
        enter: {opacity: 1},
        leave: {opacity: 0},
        animation: 'fade-normal'
      };
      element = angular.element('<div class="fx-fade-normal">..</div>');
      fin = function(){return;};
      $win = $window;
      newAnimation = new FadeAnimation(effect);
    });
  });

  it('should return a new instance', function(){
    expect(newAnimation.enter).to.be.a('function');
    expect(newAnimation.leave).to.be.a('function');
    expect(newAnimation.move).to.be.a('function');
  });

  it('should return cancel function', function(){
    expect(newAnimation.enter(element, fin)).to.be.a('function');
    expect(newAnimation.leave(element, fin)).to.be.a('function');
    expect(newAnimation.move(element, fin)).to.be.a('function');
  });
});