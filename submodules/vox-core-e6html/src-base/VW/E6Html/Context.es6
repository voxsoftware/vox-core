import util from 'util'
class Context{

	constructor(stream){
		this.out= stream
		this.sections={}
	}

	section(section){
		var func,self= this
		while(self){
			if(self.sections){
				func= self.sections[section]
				if(func)
					break
			}
			self= self.parent
		}


		if(func)
			return func() // Devuelve promise porque el parser crear funciones async ...

	}


	include(source, args){
		if(this.e6htmlFolder){
			return this.e6htmlFolder.invoke(source, this, args)
		}
	}

	transform(obj){
		if(obj===undefined || obj===null){
			obj=""
		}
		if(typeof obj != "string" && !Buffer.isBuffer(obj)){
			obj=util.inspect(obj)
		}
		return obj
	}

	write(obj){
		return this.out.write(this.transform(obj))
	}


}
export default Context
