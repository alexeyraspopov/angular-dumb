angular.module('ngDumb', [])
	.directive('flChange', function() {
		return function(scope, element, attrs) {
			var eval = function(event) { scope.$eval(attrs.flChange, { $event: event }); };

			switch(element.attr('type')){
				case 'checkbox':
					element.bind('change', eval);
					break;

				default:
					element.bind('keyup', eval);
			}
		};
	})
	.directive('flValue', function() {
		return function(scope, element, attrs) {

			scope.$watch(attrs.flValue, function(value) {
				switch(element.attr('type')){
					case 'radio':
						// TODO: implement me
						break;

					case 'checkbox':
						element[0].checked = Boolean(value);
						break;

					default:
						element[0].value = value === undefined ? '' : value;
				}
			});
		};
	});