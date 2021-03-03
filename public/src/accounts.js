// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAccountById(accounts, id) {
  //return account object with matching ID 
  return accounts.find(acc => acc.id === id);
}

function sortAccountsByLastName(accounts) {
  // returns array of objects sorted by last name
  return accounts.sort((accountA, accountB) => accountA.name.last > accountB.name.last? 1:-1);
}

function getTotalNumberOfBorrows(account, books) {
  // returns a NUMBER which represents how many times an account ID appears in any books borrow array.
  let totalBorrows = 0;
  books.forEach(book => {
    book.borrows.forEach(entry => {
      if(entry.id == account.id) totalBorrows++;
    })
  })
  return totalBorrows;
}

function getBooksPossessedByAccount(account, books, authors) {
  // return an array of books and authors which represents all books currently checked out by the account
  return books.filter(book =>{
    const recent = book.borrows[0];
    return !recent.returned&&recent.id===account.id;
  })
  .map(book=>{
    const author = authors.find(author => author.id==book.authorId)
    return {...book, author}
  })

}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
