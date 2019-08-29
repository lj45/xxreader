"use strict";

import {CardStackStyleInterpolator} from 'react-navigation-stack';
import {Easing, Animated, Platform} from 'react-native';

// animate
const forReverseHorizontal = 'forReverseHorizontal';
const forReverseVertical = 'forReverseVertical';

export default {
  // ...
  // transition
  transitionForHorizontal: 'forHorizontal',
  transitionForVertical: 'forVertical',
  transitionForFadeFromBottomAndroid: 'forFadeFromBottomAndroid',
  transitionForReverseHorizontal: forReverseHorizontal,
  transitionForReverseVertical: forReverseVertical,
  // transition config
  transitionConfig: () => {
    return {
      transitionSpec: {
        duration: 500,
        easing: Easing.out(Easing.poly(4)),
        timing: Animated.timing,
        useNativeDriver: true,
      },
      screenInterpolator: (sceneProps) => {
        const {position, layout, scene, index, scenes} = sceneProps;
        // Use default animate 需求3
        const {route} = scene;
        const params = route.params || {};
        if (params.transition) {
          return CardStackStyleInterpolator[params.transition](sceneProps);
        }

        const toIndex = index;
        const thisSceneIndex = scene.index;
        const {
          initHeight: height,
          initWidth: width,
        } = layout || {};

        // Use custom reverse animate 需求2
        if (params.reverseTransition) {
          const translateX = position.interpolate({
            inputRange: [thisSceneIndex - 1, thisSceneIndex, thisSceneIndex + 1],
            outputRange: [-width, 0, 0],
          });

          if (params.reverseTransition === forReverseHorizontal) {
            return {transform: [{translateX}], overflow: 'hidden'};
          }
          const translateY = position.interpolate({
            inputRange: [0, thisSceneIndex],
            outputRange: [-height, 0],
          });

          if (params.reverseTransition === forReverseVertical) {
            return {transform: [{translateY}], overflow: 'hidden'};
          }
        }

        console.log("+++++++++position:",position,thisSceneIndex,route);
        // Use custom animate 需求1
        let translateX = position.interpolate({
          inputRange: [thisSceneIndex - 1, thisSceneIndex],
          outputRange: [width, 0],
        });

        //splash动画需要特别处理，因为最开始是默认放入了两个screen在路由栈中
        if(route && route.routeName === 'Splash'){
          return null;
        }

        // Since we want the card to take the same amount of time
        // to animate downwards no matter if it's 3rd on the stack
        // or 53rd, we interpolate over the entire range from 0 - thisSceneIndex
        const translateY = position.interpolate({
          inputRange: [0, thisSceneIndex],
          outputRange: [height, 0],
        });

        const slideFromRight = {transform: [{translateX}], overflow: 'hidden'};
        const slideFromBottom = {transform: [{translateY}], overflow: 'hidden'};

        const lastSceneIndex = scenes[scenes.length - 1].index;

        // Test whether we're skipping back more than one screen
        // and slide from bottom if true
        if (lastSceneIndex - toIndex > 1) {
          // Do not transoform the screen being navigated to
          if (scene.index === toIndex) return;
          // Hide all screens in between
          if (scene.index !== lastSceneIndex) return {opacity: 0};
          // Slide top screen down
          return slideFromBottom;
        }
        // Otherwise slide from right
        return slideFromRight;
      },
    };
  },
};


