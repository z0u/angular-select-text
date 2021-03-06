describe('angular-select-text', function() {
  var elm, scope, getSelection;

  // load the angular-select-text code
  beforeEach(module('angular-select-text'));

  beforeEach(inject(function($rootScope, $compile, $window) {
    // we might move this tpl into an html file as well...
    elm = angular.element(
      '<div id="selection" select-text>' +
        'hello world' +
      '</div>');

    getSelection = function() {
      var text = "";
      if ($window.getSelection) {
        text = $window.getSelection().toString();
      } else if ($window.document.selection && $window.document.selection.type != "Control") {
        text = $window.document.selection.createRange().text;
      }
      return text;
    };

    angular.element($window.document.body).append(elm);

    scope = $rootScope;
    $compile(elm)(scope);
    scope.$digest();
  }));

  it('should be clickable', function() {
    expect(elm.length).toBe(1);
    expect(elm.text()).toBe('hello world');
    elm[0].click();
    expect(getSelection()).toBe('hello world');
  });

});