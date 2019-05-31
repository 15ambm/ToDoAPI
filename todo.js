
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
    if (!item.id || typeof item.id !== 'string') {
      return false;
    } if (!item.name) {
      return false;
    } return true;
  }

  static packageItem(item) {
    const newItem = {
      id: item.id,
      name: item.name,
      description: item.description,
      tags: item.tags,
      status: item.status,
    };
    return newItem;
  }
}

module.exports = ToDo;
