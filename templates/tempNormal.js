const creator = ($fxMakeAnimation)=> {

  let enterAnimation = {
    keyframeStyle: '.1s <%= name %>NormalIn'
  };

  let leaveAnimation = {
    keyframeStyle: '.1s <%= name %>NormalOut'
  };

  return $fxMakeAnimation.create(
    enterAnimation,
    leaveAnimation
  );
};

creator.$inject = ['$fxMakeAnimation'];

const classname = '.fx-<%= dashName %>';
const <%= name %> = {creator, classname};

export {<%= name %>};
