angular.module('ngConfirm', [])
.directive('confirm', function () {
  return {
    scope: true,
    controller: ['$scope', '$element', '$attrs', '$compile', '$templateRequest', function ($scope, $element, $attrs, $compile, $templateRequest) {
      var openConfirmBox = (function () {
        if ($attrs.template) {
          return function () {
              $templateRequest($attrs.template).then(function (template) {
                var html = $compile(template)($scope);
                angular.element(document).find('body').append(html);
              });
          }
        } else {
          return function () {
              var template =  '<div class="alertify">' +
                                '<div class="dialog">' +
                                  '<div>' +
                                    '<p class="msg">{{ctrl.msg}}</p>' +
                                    '<nav>' +
                                      '<button class="cancel btn btn-default" ng-click="ctrl.cancel()">Cancel</button>' +
                                      '<button class="ok btn btn-primary" ng-click="ctrl.ok()">Ok</button>' +
                                    '</nav>' +
                                  '</div>' +
                                '</div>' +
                              '</div>';
              var html = $compile(template)($scope);
              angular.element(document).find('body').append(html);            
          }
        } 
      })();
          
      this.msg = $scope.$eval($attrs.confirm);
      
      this.confirm = function () {
          $scope.$apply(openConfirmBox);
      };
      
      this.ok = function () {
        angular.element(document.querySelector('.alertify')).remove();
        $attrs.ok && $scope.$parent.$eval($attrs.ok);
      };
      
      this.cancel = function () {
        angular.element(document.querySelector('.alertify')).remove();
        $attrs.cancel && $scope.$parent.$eval($attrs.cancel);
      }
    }],
    controllerAs: 'ctrl',
    require: 'confirm',
    link: function (scope, element, attrs, ctrl) {
      element.on('click', ctrl.confirm);
    }
  };
})
