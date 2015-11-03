import toArray from 'lodash/lang/toArray';
import merge from 'lodash/object/merge';
import {curves} from './easings';
/**
 * helper function to supply utility method for animations
 * is registed as the $$fx factory
 * @return {[Object]} public object of the methods to help with animations
 */
const fxHelp = ($animateCss)=> {
  // group of similar animation events
  const similarEvents = ['enter', 'leave', 'move'];
  const classEvents = ['addClass', 'setClass', 'removeClass'];

  const durationRegxpString = '(\\d+)';
  const durationRegxp = new RegExp(durationRegxpString);

  /**
   * takes in a fx-{option} and creates a regexp for
   * checking against an element's classList
   * @param  {[String]} option the fx-{option}
   * @param  {[Boolean]} text   should the regexp loof for alphabet chars after the option
   *                            ex: fx-ease-back
   * @return {[Regexp]}        the composed regexp
   */
  const makeFxOptionRegexp = (option, text)=> {
    let afterOption = text ? '[A-Za-z]' : durationRegxpString;
    return new RegExp(`fx\\-${option}\\-${afterOption}`);
  };

  /**
   * given a css classname, will check to see if it
   * is trying to describe the duration of the animation
   * with fx-speed-{num in ms}
   * @param  {[String]} className a css classname
   * @return {[Number]}           duration in seconds
   */
  const getDuration = (className) => {
    // default to half a second duration

    let duration = 500;

    // allow usres to use fx-speed|dur|duration-{num in ms}
    if (makeFxOptionRegexp('(speed|dur|duration)').test(className)) {
      try {
        duration = parseInt(className.match(durationRegxp)[0]);
      } catch (e) {
      }
    }

    // convert ms to seconds for $animateCss to consume
    return duration / 1000;
  };

  /**
   * given a css classname, it will check to see if it
   * trying to describe the stagger delay if any for the animation
   * with fx-stagger-{num in ms}
   * @param  {[String]} className css class name
   * @return {[Number]}           number in seconds
   */
  const getStagger = (className) => {
    if (makeFxOptionRegexp('stagger').test(className)) {
      let stagger = undefined;
      try {
        stagger = parseInt(className.match(durationRegxp)[0]);
      } catch (e) {
        return;
      }
      // convert ms to seconds for $animateCss to consume
      return stagger / 1000;
    }
  };

  /**
   * takes a class name and checks to see if it is trying
   * to describe an ease type
   * @param  {String} className css class name
   * @return {Array}           bezier curve coordinates
   */
  const getEase = (className) => {
    let bezier = '';

    if (!makeFxOptionRegexp('ease', true).test(className)) {
      return;
    } else {
      const easeOptions = className.slice(8);
      const [ease, dir, dir2=''] = easeOptions.split('-');
      const curve = curves[ease.trim()];

      if (!curve) {
        return;
      }

      if (!dir) {
        return curve.inout;
      } else {
        const direction = `${dir}${dir2}`.trim();
        return curve[direction];
      }
    }
  };

  /**
   * takes an element, parses the className, and returns
   * an object of defined fx options
   * @param  {DOM node} element
   * @return {Object}           the fx options object for the element
   */
  const parseClassList = (element)=> {
    const list = toArray(element[0].classList);
    const classList = list.join(' ');
    
    // will capture anything with `fx-thing-thing`
    const fxRegexp = /(fx\-\w+\-(.*?)(\s|$))/g;

    const options = classList.match(fxRegexp);

    const results = options.reduce((_results, option) => {
      if (/stagger/.test(option)) {

        let stagger = getStagger(option);
        _results.stagger = stagger ? stagger : undefined;

      } else if (/ease/.test(option)) {
        const ease = getEase(option);

        if (ease) {
          _results.easing = `cubic-bezier(${ease.join()})`;
        }

      } else if (/(speed|dur|duration)/.test(option)) {
        _results.duration = getDuration(option);
      }

      return _results;
      // default to half a second animations
    }, {duration: .5});

    return results;
  };

  /**
   * helper function to build ngAnimate animation object using $animateCss
   * @param  {[DOM NODE]} element   the element that will be animated
   * @param  {[Object]}   animation the object defining the animation, using
   *                                $animateCss config
   * @return {[Promise]}           whatver $animateCss returns
   */
  const buildAnimation = (element, animation) => {
    const opts = parseClassList(element);
    let animateInstructions = merge(animation, opts);
    return $animateCss(element, animateInstructions);
  };
  
  /**
   * helper function to buid the `enter`, `leave`, and `move` animation
   * functions for ngAnimate to consume
   * @param  {Object} animationConfigs all the animation objects for the
   *                                     `enter`, `leave`, and `move` events
   * @return {Object}                  animation object to feed ngAnimate
   */
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
  };
  
  /**
   * helper function to build `addClass` and `removeClass` animation
   * functions for ngAnimate to consume
   * @param  {Object} animationConfigs all the animations for the
   *                                   `addClass` and `removeClass` events
   * @return {Object}                  animation object to feed ngAnimate
   */
  const createClassAnimations = (animationConfigs) => {
    return classEvents.reduce((result, event) => {
      const animationConfig = animationConfigs[event];

      if (animationConfig) {
        result[event] = (element, className, done) => {
          if (/(addClass|removeClass)/.test(event)) {
            return buildAnimation(element, animationConfig);
          } else {
            done();
          }
        };
      }

      return result;
    }, {});
  };

  // expose all for testing purposes
  return {
    getStagger,
    getDuration,
    getEase,
    parseClassList,
    buildAnimation,
    createAnimationsForSimilarEvents,
    createClassAnimations,
  };
};

fxHelp.$inject = ['$animateCss'];
export {fxHelp};
