<a name"1.1.0"></a>
## 1.1.0 (2015-11-02)


#### Bug Fixes

* **default dur:** make sure that default duration is .5s ([015eae1f](https://github.com/Hendrixer/ng-Fx.git/commit/015eae1f))
* **specs:** add pllyfill for function bind for phantomjs ([b101d2c2](https://github.com/Hendrixer/ng-Fx.git/commit/b101d2c2))


#### Features

* **$$fx:** add helper factory to help build animations ([b2a994e7](https://github.com/Hendrixer/ng-Fx.git/commit/b2a994e7))
* **bounce:**
  * finish bounce animations ([c12e2761](https://github.com/Hendrixer/ng-Fx.git/commit/c12e2761))
  * add bounce left animation ([f2de3a32](https://github.com/Hendrixer/ng-Fx.git/commit/f2de3a32))
* **bounceDown:** add bounce down ([efce8c8d](https://github.com/Hendrixer/ng-Fx.git/commit/efce8c8d))
* **classAnimations:** add support for class based animations ([bc1e2c19](https://github.com/Hendrixer/ng-Fx.git/commit/bc1e2c19))
* **fade:** add fade animations module and setup ([5dd85d27](https://github.com/Hendrixer/ng-Fx.git/commit/5dd85d27))
* **fades:** complete fades ([e8026f05](https://github.com/Hendrixer/ng-Fx.git/commit/e8026f05))
* **rotates:** add new rotate animations ([68f104b4](https://github.com/Hendrixer/ng-Fx.git/commit/68f104b4))
* **view:** add infra for view animations ([675cb4cf](https://github.com/Hendrixer/ng-Fx.git/commit/675cb4cf))
* **zoom:** create zoom infra ([fc5e28df](https://github.com/Hendrixer/ng-Fx.git/commit/fc5e28df))
* **zoomDown:** add zoom down animation ([982c8238](https://github.com/Hendrixer/ng-Fx.git/commit/982c8238))


<a name"1.1.0"></a>
## 1.1.0 bigsnbigs (2015-10-07)


#### Bug Fixes

* **default dur:** make sure that default duration is .5s ([015eae1f](https://github.com/Hendrixer/ng-Fx.git/commit/015eae1f))


#### Features

* **$$fx:** add helper factory to help build animations ([b2a994e7](https://github.com/Hendrixer/ng-Fx.git/commit/b2a994e7))
* **bounce:**
  * finish bounce animations ([c12e2761](https://github.com/Hendrixer/ng-Fx.git/commit/c12e2761))
  * add bounce left animation ([f2de3a32](https://github.com/Hendrixer/ng-Fx.git/commit/f2de3a32))
* **bounceDown:** add bounce down ([efce8c8d](https://github.com/Hendrixer/ng-Fx.git/commit/efce8c8d))
* **classAnimations:** add support for class based animations ([bc1e2c19](https://github.com/Hendrixer/ng-Fx.git/commit/bc1e2c19))
* **fade:** add fade animations module and setup ([5dd85d27](https://github.com/Hendrixer/ng-Fx.git/commit/5dd85d27))
* **fades:** complete fades ([e8026f05](https://github.com/Hendrixer/ng-Fx.git/commit/e8026f05))
* **view:** add infra for view animations ([675cb4cf](https://github.com/Hendrixer/ng-Fx.git/commit/675cb4cf))
* **zoom:** create zoom infra ([fc5e28df](https://github.com/Hendrixer/ng-Fx.git/commit/fc5e28df))
* **zoomDown:** add zoom down animation ([982c8238](https://github.com/Hendrixer/ng-Fx.git/commit/982c8238))


<a name"1.1.0"></a>
## 1.1.0 (2015-04-05)


#### Features

* **animations:** add static animations ([e665b9b8](https://github.com/Hendrixer/ng-Fx.git/commit/e665b9b8))


#### Breaking Changes

* you must now include the ngAnimate
module inside your app. ngFx no longer consumes it

Before:

angular.module('yourApp', ['ngFx'])

After:

angular.module('yourApp', ['ngFx', 'ngAnimate'])

This decouples all dependencies from ngFx and can
be entirely self managed
-

 ([e665b9b8](https://github.com/Hendrixer/ng-Fx.git/commit/e665b9b8))

