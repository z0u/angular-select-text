'use strict';
/**
 * angular-select-text directive
 */
angular.module('angular-select-text', []).
  service('selectElement', ['$window', function($window) {
    if ($window.document.selection) {
      return function(element) {
        var range = $window.document.body.createTextRange();
        range.moveToElementText(element[0]);
        range.select();
      };
    } else if ($window.getSelection) {
      return function(element) {
        var range = $window.document.createRange();
        range.selectNode(element[0]);
        $window.getSelection().removeAllRanges();
        $window.getSelection().addRange(range);
      };
    }
  }]).

  directive('selectText', ['selectElement', function (selectElement) {
    return {
      restrict: 'A',
      controller: ['$scope', function($scope) {
        this.register = function(callback) {
          $scope.callback = callback;
        };
      }],
      link: function(scope, element, attrs){
        element.bind('click', function(){
          if (scope.callback)
            scope.callback();
          else
            selectElement(element);
        });
      }
    };
  }]).

  directive('selectTextTarget', ['selectElement', function(selectElement) {
    return {
      restrict: 'A',
      require: '^selectText',
      link: function(scope, element, attrs, selectText) {
        selectText.register(function() {
          selectElement(element);
        });
      }
    };
  }]);
