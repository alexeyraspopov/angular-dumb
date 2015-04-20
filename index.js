var INPUT_CHANGE_ATTR = 'flChange',
	INPUT_VALUE_ATTR = 'flValue';

angular.module('flDumb', [])
	.directive(INPUT_CHANGE_ATTR, handleInputChanges)
	.directive(INPUT_VALUE_ATTR, bindInputValue);

function handleInputChanges() {
	return function(scope, element, attrs) {
		var expression = attrs[INPUT_CHANGE_ATTR],
			eval = function(event) {
				scope.$eval(expression, {
					$event: event,
					$value: getEventValue(event)
				});
			};

		switch(element.attr('type')){
			case 'radio':
				// TODO: implement me
				// break;
				// falls through

			case 'checkbox':
				element.bind('change', eval);
				break;

			default:
				element.bind('keyup', eval);
		}
	};
}

function bindInputValue() {
	return function(scope, element, attrs) {
		var expression = attrs[INPUT_VALUE_ATTR];

		scope.$watch(expression, function(value) {
			switch(element.attr('type')){
				case 'radio':
					// TODO: implement me
					// break;
					// falls through

				case 'checkbox':
					element[0].checked = Boolean(value);
					break;

				default:
					element[0].value = value === undefined ? '' : value;
			}
		});
	};
}

function getEventValue(event) {
	// TODO: check target type
	return event.target.value;
}
