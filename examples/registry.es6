var test= async ()=>{
	await core.Microsoft.Win32.Registry.ready();
	vw.info(core.Microsoft.Win32.Registry.classesRoot);
	vw.info(core.Microsoft.Win32.Registry.localMachine);
	vw.info(core.Microsoft.Win32.Registry.currentConfig);
	vw.info(core.Microsoft.Win32.Registry.currentUser);
	var key= await core.Microsoft.Win32.Registry.localMachine.openSubKeyAsync("SYSTEM\\CurrentControlSet\\Control\\TimeZoneInformation")
	vw.info(key)
	
	var value= await key.getValueAsync("TimezoneKeyName");
	vw.info(value)
	await key.dispose();

	core.VW.Clr.Manager.current.close();
	process.exit(0);
}
test()