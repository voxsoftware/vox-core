
class ServerCookie{

  constructor(){
    this.$json={}
  }

  set(name, value){
    name= name.toLowerCase().trim()
    this.$json[name]= value.toString()
  }

  get(name){
    return this.$json[name]
  }

  keys(){
    return Object.keys(this.$json)
  }

  toStr(id){
    return id + "=" +  this.$json[id]
  }

  toString(){
    var e=[]
    for(var id in this.$json){
      e.push(this.toStr(id))
    }
    e.push("")
    return e.join("; ")
  }

  static fromString(str){
    var d={},p,p1,p2
    var items= str.split(";")
    for(var item of items){
      if(item){
        p=item.indexOf("=")
        p1= item.substring(0, p).trim()
        p2= item.substring(p+1).trim()
        if(p1){
          d[p1]= p2
        }
      }
    }

    var c= new ServerCookie()
    c.$json= d
    return c
  }

  toJSON(){
    return this.$json
  }

}

export default ServerCookie
