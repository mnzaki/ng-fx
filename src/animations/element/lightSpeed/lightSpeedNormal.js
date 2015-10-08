const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s lightSpeedNormalIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s lightSpeedNormalOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-light-speed';
const lightSpeed = {creator, classname};

export {lightSpeed};
