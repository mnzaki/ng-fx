const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s zoomDownIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s zoomDownOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-zoom-down';
const zoomDown = {creator, classname}

export {zoomDown};
