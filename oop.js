

class event {
    constructor(id, title , dicreption){
        this.id = id
        this.title = title
        this.dicreption = dicreption
    }


    Diplayinfo(){
        console.log(`Event id ${this.id} event title ${this.title}  event dicreption ${this.dicreption}`)
    }
}


let UCl = new event("15" , "real madrid" , "they won last 5 years" )

console.log(UCl.Diplayinfo())
console.log(UCl.id)
console.log(UCl.title)
console.log(UCl.dicreption)


