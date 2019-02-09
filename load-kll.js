var Path= require("path")
//core.org.kodhe.package.Manager.import(Path.join(__dirname,"libraries", "voxcore.runtime.kll"), "")
core.org.kodhe.package.Manager.importDirectory(Path.join(__dirname,"libraries", "runtime"), "")


var e=core.org.kodhe.package.VirtualFileSystem
