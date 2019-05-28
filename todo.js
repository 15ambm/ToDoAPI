
class ToDo {
    constructor(name) {
        this._listName = name;
        this.list = [];
    }
    add_item(item) {
        this.list.push(item);
    }
    get_list() {
        return this.list;
    }

    update_item(id, change) {
        let index = this.list.findIndex((obj => obj.id == id));
        
        this.list[index] = change;
        return;
    }

    static isValid(item) {
        //console.log(item);
        if(!item.id) {
            return false;
        } else if(!item.name) {
            return false;
        } else if (!item.description) {
            return false;
        } else if (!item.tags) {
            return false;
        } else if (!item.status) {
            return false;
        } else {
            return true;
        }
    }

    static packageItem(item){
        const newItem = {
            name:item.name,
            description:item.description,
            tags:item.tags,
            status:item.status
        }
        return newItem;
    }


}

module.exports = ToDo;