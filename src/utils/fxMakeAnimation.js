import merge from 'lodash/object/merge';

/**
 * factory function to help with the
 * basics of creating the events animaton
 * object for $animate to consume
 * @param  {[Object]} $animateCss part of ngAnimate
 * @param  {[Object]} $$fx     helper object to assist in getting
 *                                meta data from the element
 * @return {[Function]}           function used to pass in animation options from
 *                                the ngmodule.animation() methods
 */
const fxMakeAnimation = ($animateCss, $$fx) => {

  /**
   * takes in different animation objects for each animation event
   * in ngAnimate. All are optional. The objects are given straight to
   * $animateCss after the element's classList is parsed for information
   * about duration and staggering
   * @param  {[Object]}  enter object describing the enter animation
   * @param  {[Object]}  leave object describing the leave animation
   * @param  {[Object]}  move  object describing the move animation
   * @param  {...[Object]} rest  rest of the objects for the other event type aniamtions
   * @return {[Object]}          the animation object for ngAnimate to consume
   */
  const create = (enter, leave, move, addClass, removeClass, setClass) => {
    move = move || enter;

    let ngAnimateConsumable = $$fx.createAnimationsForSimilarEvents({enter, leave, move});

    let classConsumables = $$fx.createClassAnimations({addClass, removeClass, setClass});

    ngAnimateConsumable = merge(ngAnimateConsumable, classConsumables);

    return ngAnimateConsumable;
  };

  return {create};
}

fxMakeAnimation.$inject = ['$animateCss', '$$fx'];

export {fxMakeAnimation};
