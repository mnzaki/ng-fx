describe('Cap $filter', function(){
  beforeEach(module('fx.animations.assist'));

  it('should capitalize the first letter', function(){
    inject(function($filter){
      var string = 'wassup';
      expect($filter('cap')(string)[0]).to.be('W');
    });
  });
});