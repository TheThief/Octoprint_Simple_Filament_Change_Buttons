/*
 * View model for simple_filament_change_buttons
 *
 * Author: Gareth Martin
 * License: mit
 */
$(function() {
	function Simple_Filament_Change_Buttons_ViewModel(parameters) {
		var self = this;

		// assign the injected parameters
		self.controlViewModel = parameters[0];

		self.getAdditionalControls = function() {
			return [{
				'layout': 'horizontal', 'name': 'Filament Change', 'children':[
					/*{'commands': [
						'M125'
						],
						'additionalClasses': 'sfcb fa-pause', 'name': ' Park'},*/
					{'commands': [
						'M702'
						],
						'additionalClasses': 'sfcb fa-fast-backward', 'name': ' Unload'},
					{'commands': [
						'M701'
						],
						'additionalClasses': 'sfcb fa-step-forward', 'name': ' Load'},
					{'commands': [
						'M600'
						],
						'additionalClasses': 'sfcb fa-sync', 'name': ' Change Filament'},
					{'commands': [
						'M108'
						],
						'additionalClasses': 'sfcb fa-play', 'name': ' Resume'},
				]
			}];
		};
	}

    /* view model class, parameters for constructor, container to bind to
     * Please see http://docs.octoprint.org/en/master/plugins/viewmodels.html#registering-custom-viewmodels for more details
     * and a full list of the available options.
     */
	OCTOPRINT_VIEWMODELS.push({
		construct: Simple_Filament_Change_Buttons_ViewModel,
		dependencies: [ "controlViewModel" ]
	});
});
