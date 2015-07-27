const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s zoomUpIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s zoomUpOut'
  };

  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-zoom-up';
const zoomUp = {creator, classname}

export {zoomUp};
