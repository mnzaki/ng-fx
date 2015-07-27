const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s zoomRightIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s zoomRightOut'
  };

  return $fxMakeAnimation.create(enterAnimation, leaveAnimation);
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-zoom-right';
const zoomRight = {creator, classname}

export {zoomRight};
