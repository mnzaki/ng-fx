import toArray from 'lodash/lang/toArray';
import merge from 'lodash/object/merge';
import {curves} from './easings';
/**
 * helper function to supply utility method for animations
 * is registed as the $$fx factory
 * @return {[Object]} public object of the methods to help with animations
 */
const fxHelp = ($animateCss)=> {

  const similarEvents = ['enter', 'leave', 'move'];
  const durationRegxpString = '(\\d+)';
  const durationRegxp = new RegExp(durationRegxpString);

  const makeFxOptionRegexp = (option, text)=> {
    let afterOption = text ? '[A-Za-z]' : durationRegxpString;
    return new RegExp(`fx\\-${option}\\-${afterOption}`);
  };

  const getDuration = (className) => {
    let duration = 500;
    if (makeFxOptionRegexp('speed').test(className)) {
      try {
        duration = parseInt(className.match(durationRegxp)[0]);
      } catch (e) {
      }
    }

    return duration / 1000;
  };

  const getStagger = (className) => {
    if (makeFxOptionRegexp('stagger').test(className)) {
      let stagger = undefined;
      try {
        stagger = parseInt(className.match(durationRegxp)[0]);
      } catch (e) {
      }

      return stagger / 1000;
    }
  };

  const getEase = (className) => {
    let ease;
    let bezier = curves.back.inOut;

    if (makeFxOptionRegexp('ease', true).test(className)) {
      ease = className.slice(8);

    } else {
      return;
    }

    let [easeType='', direction='', direction2=''] = ease.split('-');

    if (!easeType) {
      return bezier;
    }

    let curve = curves[easeType.toLowerCase()];
    // let directionRegexp = /(in|out)/i;

    if ((!direction && !direction2) || (/in/i.test(direction) && /out/i.test(direction2))) {
      bezier = curve.inOut;

    } else {
      bezier = curve[direction];
    }
    console.log('bezzy', bezier)
    return bezier;
  };

  /*
   *
   */
  const parseClassList = (element)=> {
    let ease;
    let list = toArray(element[0].classList);

    const results = list.reduce((ops, className)=> {
      ops.duration = getDuration(className);
      let ease = getEase(className);
      if (ease) {
        ease = ease.join();
        console.log('ease', ease);
        ops.easing = `cubic-bezier(${ease})`;
      }

      let stagger = getStagger(className);

      if (stagger) {
        ops.stagger = stagger
      }

      return ops
    }, {});

    return results;
  };

  const buildAnimation = (element, animation) => {
    const opts = parseClassList(element);

    let animateInstructions = merge(animation, opts);
    console.log(animateInstructions)
    return $animateCss(element, animateInstructions);
  };

  const createAnimationsForSimilarEvents = (animationConfigs) => {

    return similarEvents.reduce((result, event) => {
      const animationConfig = animationConfigs[event];

      if (animationConfig) {
        result[event] = (element, done) => {
          return buildAnimation(element, animationConfig);
        };
      }

      return result;
    }, {});
  }

  // expose all for testing purposes
  return {
    getStagger,
    getDuration,
    getEase,
    parseClassList,
    buildAnimation,
    createAnimationsForSimilarEvents
  };
};

fxHelp.$inject = ['$animateCss'];
export {fxHelp};
