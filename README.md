# Simple Filament Change Buttons

This plugin simply adds some buttons to send the filament load/unload/change commands for Marlin, so you don't have to use the LCD menu.

## Setup

Install via the bundled [Plugin Manager](https://github.com/foosel/OctoPrint/wiki/Plugin:-Plugin-Manager)
or manually using this URL:

    https://github.com/TheThief/Octoprint_Simple_Filament_Change_Buttons/archive/master.zip

## Use

To use automated filament change (M600):

* Click **Change Filament** to automatically park the head and then unload filament.
* When new filament is ready to load, click the LCD button or the **Resume** button in Octoprint.

To manually unload/load (M702/M701):

* Make sure the nozzle is heated
* On the Control tab, click **Unload** to unload the old filament
* Feed in the new filament to the extruder gear. Then click **Load** to load the new filament

## Configuration

Enable ADVANCED_PAUSE_FEATURE in your Marlin firmware, along with PARK_HEAD_ON_PAUSE and FILAMENT_LOAD_UNLOAD_GCODES. I also recommend having EMERGENCY_PARSER enabled.
