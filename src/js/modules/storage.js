function storeItem(item) {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  items.push(item);
  localStorage.setItem('items', JSON.stringify(items));
}

function getItemsFromStorage() {
  const items = JSON.parse(localStorage.getItem('items')) || [];
  return items;
}

function updateItemInStorage(updatedItem) {
  let items = JSON.parse(localStorage.getItem('items'));
  items.forEach(function(item, index) {
    if (updatedItem.id === item.id) {
      items.splice(index, 1, updatedItem);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

function deleteItemFromStorage(id) {
  let items = JSON.parse(localStorage.getItem('items'));
  items.forEach(function(item, index) {
    if (id === item.id) {
      items.splice(index, 1);
    }
  });
  localStorage.setItem('items', JSON.stringify(items));
}

const storage = {
  storeItem,
  getItemsFromStorage,
  updateItemInStorage,
  deleteItemFromStorage
}

export default storage;
