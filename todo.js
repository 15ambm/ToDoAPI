
class ToDo {
  constructor(name) {
    this.listName = name;
    this.list = [];
  }

  addItem(item) {
    this.list.push(item);
  }

  getList() {
    return this.list;
  }

  updateItem(id, change) {
    const index = this.list.findIndex((obj => obj.id === id));

    this.list[index] = change;
  }

  static isValid(item) {
    // console.log(item);
    if (!item.name || typeof item.name !== 'string') {
      return false;
    } return true;
  }

  packageItem(item) {
    const newItem = {
      id: this.list.length + 1,
      name: item.name,
      description: item.description,
      tags: item.tags,
      status: item.status,
    };
    return newItem;
  }

  updateIDs(id) {
    for (let i = id; i < this.list.length + 1; i++) {
      this.list[i - 1].id = i;
    }
  }
}

module.exports = ToDo;
