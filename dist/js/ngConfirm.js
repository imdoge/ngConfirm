angular.module('ngConfirm', [])
    .directive('confirm', function () {
        return {
            scope: true,
            controller: ['$scope', '$element', '$attrs', '$compile', '$animate', '$templateRequest', 
            function ($scope, $element, $attrs, $compile, $animate, $templateRequest) {
                var appendToElement = angular.element(document).find('body'),
                    domEl;
                var openConfirmBox = (function () {
                    if ($attrs.template) {
                        return function () {
                            $templateRequest($attrs.template).then(function (template) {
                                domEl = $compile(template)($scope);
                                $animate.enter(domEl, appendToElement);
                            });
                        }
                    } else {
                        return function () {
                            var template = '<div class="alertify"><div class="dialog"><div><p class="msg">{{ctrl.msg}}</p><nav><button class="cancel btn btn-default" ng-click="ctrl.cancel()">Cancel</button><button class="ok btn btn-primary" ng-click="ctrl.ok()">Ok</button></nav></div></div></div>';
                            domEl = $compile(template)($scope);
                            $animate.enter(domEl, appendToElement);
                        }
                    }
                })();

                this.msg = $scope.$eval($attrs.confirm);

                this.confirm = function () {
                    $scope.$apply(openConfirmBox);
                };

                this.ok = function () {
                    $animate.leave(domEl);
                    $attrs.ok && $scope.$parent.$eval($attrs.ok);
                };

                this.cancel = function () {
                    $animate.leave(domEl);
                    $attrs.cancel && $scope.$parent.$eval($attrs.cancel);
                }
            }],
            controllerAs: 'ctrl',
            require: 'confirm',
            link: function (scope, element, attrs, ctrl) {
                element.on('click', ctrl.confirm);
            }
        };
    });
