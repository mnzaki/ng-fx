const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s zoomLeftIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s zoomLeftOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-zoom-left';
const zoomLeft = {creator, classname}

export {zoomLeft};
