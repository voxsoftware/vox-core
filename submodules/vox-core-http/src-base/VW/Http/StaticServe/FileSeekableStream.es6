import {Readable} from 'stream'

class FileSeekableStream{


	static async _read(){

		if(!this.$length){
			this.$length = this.maxPosition!== undefined ? this.maxPosition : this.$stream.length
			this.$position= this.$stream.position
		}

		var len= Math.min(8192*3, this.$length-this.$position)
		if(len==0){
			return this.push(null)
		}


		var buf= new Buffer(len)
		var readed= await this.$stream.readAsync(buf, 0, len)
		this.$position+= readed
		return this.push(buf/*.slice(0,readed)*/)

	}



	static createStream(fileStream){
		var readable= new Readable()
		readable._read= FileSeekableStream._read
		readable.$stream= fileStream
		//readable.$buffer= new Buffer(8192)
		return readable
	}

}

export default FileSeekableStream
