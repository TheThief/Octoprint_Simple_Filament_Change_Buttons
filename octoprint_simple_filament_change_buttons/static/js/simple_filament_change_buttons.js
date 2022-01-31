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
			self.currentTargetTemperature().then(temp => {
				cmds = [
					// Heat to specified temp
					"M109 S" + self.desiredTemperature(),
					// Do unload
					"M702",
					// Cool hotend
					"M104 S" + temp
				]	
				OctoPrint.control.sendGcode(cmds)
			})
		}

		self.loadFilament = function() {
			self.currentTargetTemperature().then(temp => {
				cmds = [
					// Heat to specified temp
					"M109 S" + self.desiredTemperature(),
					// Do load
					"M701",
					// Cool hotend
					"M104 S" + temp
				]	
				OctoPrint.control.sendGcode(cmds)
			})
		}

		self.changeFilament = function() {
			cmds = [
				// Change filament at specified temp
				"M600 R" + self.desiredTemperature(),
			]		
			OctoPrint.control.sendGcode(cmds)
		}

		self.resume = function() {
			cmds = [
				'M108'
			]		
			OctoPrint.control.sendGcode(cmds)
		}

		self.desiredTemperature = function()
		{
			// The temperature input field has a "placeholder" attribute that is equal to it's name
			return $('*[placeholder = "Temperature"]')[0].value
		}

		self.currentTargetTemperature = async function()
		{
			state = await OctoPrint.printer.getToolState();
			return state.tool0.target
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
