describe('FadeAnimation constructor', function(){
  var newAnimation,
      effect;
  beforeEach(module('fx.animations.create'));

  beforeEach(function(){
    inject(function(BounceAnimation){
      effect = {
        enter: {opacity: 1},
        leave: {opacity: 0},
        animation: 'bounce-normal'
      };
      newAnimation = new BounceAnimation(effect);
    });
  });

  it('should return a new animation instance', function(){
    expect(newAnimation.enter).to.be.a('function');
    expect(newAnimation.leave).to.be.a('function');
    expect(newAnimation.move).to.be.a('function');
    expect(newAnimation.removeClass).to.be.a('function');
    expect(newAnimation.addClass).to.be.a('function');
  });
});