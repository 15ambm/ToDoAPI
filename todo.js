
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
    if (!item.id) {
      return false;
    } if (!item.name) {
      return false;
    } if (!item.description) {
      return false;
    } if (!item.tags) {
      return false;
    } if (!item.status) {
      return false;
    }
    return true;
  }

  static packageItem(item) {
    const newItem = {
      name: item.name,
      description: item.description,
      tags: item.tags,
      status: item.status,
    };
    return newItem;
  }
}

module.exports = ToDo;
