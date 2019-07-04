
class ToDo {
  constructor(name) {
    this.listName = name;
    this.list = [];
  }

  addItem(item) {
    const newItem = {
      id: this.list.length + 1,
      name: item.name,
      description: item.description,
      tags: item.tags,
      status: item.status,
    };
    this.list.push(newItem);
  }

  getList() {
    const list = this.list;
    return list;
  }

  updateItem(itemId, update) {
    const index = this.list.findIndex((obj => obj.id === itemId));
    const { id, ...otherProps } = update;

    const newItem = {
      id: this.list[index].id,
      name: otherProps.name,
      description: otherProps.description,
      tags: otherProps.tags,
      status: otherProps.status,
      //...otherProps,
    };
    this.list[index] = newItem;
  }

  static isValid(item) {
    // console.log(item);
    if (item.name && typeof item.name === 'string') {
      if (item.description && typeof item.name === 'string'){
        return true;
      }
    } 
    return false;

  }

  // packageItem(item) {
  //   const newItem = {
  //     id: this.list.length + 1,
  //     name: item.name,
  //     description: item.description,
  //     tags: item.tags,
  //     status: item.status,
  //   };
  //   return newItem;
  // }

  updateIDs(id) {
    for (let i = id; i < this.list.length + 1; i++) {
      this.list[i - 1].id = i;
    }
  }

  deleteItem(item, id) {
    const index = this.list.indexOf(item);
    this.list.splice(index, 1);
    this.updateIDs(id);
  }
}

module.exports = ToDo;
