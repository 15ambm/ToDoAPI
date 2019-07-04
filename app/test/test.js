
const chai = require("chai");
const ToDo = require("../controllers/todo");
const expect = chai.expect;

describe('isValid() Tests', () => {
  it('Add empty object should fail', () => {
    const badObj = {
    };
    expect(ToDo.isValid(badObj)).eql(false);
  })
  it('Add object with bad name property should fail', () => {
    const badObj = {
        naaame: "alex",
        description: "hello"
    };
    expect(ToDo.isValid(badObj)).eql(false);
  })
  it('Add object with bad description property should fail', () => {
    const badObj = {
        name: "alex",
        descriptionnn: "hello"
    };
    expect(ToDo.isValid(badObj)).eql(false);
  })

});

describe('updateIDs() and deleteItem() Tests', () => {
    const newList = new ToDo('testList');
    newList.addItem({
        name:"obj1",
        description:"description1"
    });
    newList.addItem({
        name:"obj2",
        description:"description2"
    });
    newList.addItem({
        name:"obj3",
        description:"description3"
    });

    it('Check ids are assigned properly', () => {
        for(let i = 0; i < newList.getList().length - 1; i++) {
            expect(newList.getList()[i].id).equal(i+1);
        }
    })
    it('Delete an item and check that ids are correct', () => {
        newList.deleteItem({
            name:"obj2",
            description:"description2"
        }, 2)
        for(let i = 0; i < newList.getList().length - 1; i++) {
            expect(newList.getList()[i].id).eql(i+1);
        }
    })

})  

describe('updateItem() Tests', () => {
    let newList = new ToDo('testList');
    newList.addItem({
        name:"obj1",
        description:"description1"
    });
    newList.addItem({
        name:"obj2",
        description:"description2"
    });
    newList.addItem({
        name:"obj3",
        description:"description3"
    });
    
    it('Update item with new name and description', () => {
        const item = {
            id: 1,
            name: "update",
            description: "new"
        }
        newList.updateItem(1,item)
        expect(newList.getList()[0].name).equals(item.name);
        expect(newList.getList()[0].description).equals(item.description);

    }); 
})