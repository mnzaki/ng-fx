const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s zoomNormalIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s zoomNormalOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-zoom-normal';
const zoomNormal = {creator, classname}

export {zoomNormal};
