

class ConsoleContext extends core.VW.E6Html.Context{
	constructor(){
		super(core.VW.Console)
		this.env= process.env
	}
}
export default ConsoleContext