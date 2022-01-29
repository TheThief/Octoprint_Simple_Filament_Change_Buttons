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

		self.unloadFilament = function() {
			cmds = [
				// Heat to specified temp
				"M109 S" + self.temperature(),
				// Do unload
				"M702",
				// Cool hotend
				"M104 S0"
			]	
			OctoPrint.control.sendGcode(cmds)
		}

		self.loadFilament = function() {
			cmds = [
				// Heat to specified temp
				"M109 S" + self.temperature(),
				// Do load
				"M701",
				// Cool hotend
				"M104 S0"
			]	
			OctoPrint.control.sendGcode(cmds)
		}

		self.changeFilament = function() {
			cmds = [
				// Change filament at specified temp
				"M600 R" + self.temperature(),
			]		
			OctoPrint.control.sendGcode(cmds)
		}

		self.resume = function() {
			cmds = [
				'M108'
			]		
			OctoPrint.control.sendGcode(cmds)
		}

		self.temperature = function()
		{
			return $('*[placeholder="Temperature"]')[0].value
		}


		self.getAdditionalControls = function() {
			return [{
				'layout': 'horizontal', 'name': 'Filament Change', 'children':[
					/*{'commands': [
						'M125'
						],
						'additionalClasses': 'sfcb fa-pause', 'name': ' Park'},*/

					{name: ' Unload', javascript: self.unloadFilament, additionalClasses: 'sfcb fa-fast-backward'},
					{name: ' Load', javascript: self.loadFilament, additionalClasses: 'sfcb fa-step-forward'},
					{name: ' Change Filament', javascript: self.changeFilament, additionalClasses: 'sfcb fa-sync'},
					{name: ' Resume', javascript: self.resume, additionalClasses: 'sfcb fa-play'},

					{'input': [{
							name: 'Temperature',
							parameter: 'temperature',
							default: 200
						}]
					},
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
