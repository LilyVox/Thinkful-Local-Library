// Note: Please do not change the name of the functions. The tests use those names to validate your code.

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let loanedOut = books.filter((book) => !book.borrows[0].returned);
  let onHand = books.filter((book) => book.borrows[0].returned);
  return [loanedOut, onHand];
}

function getBorrowersForBook(book, accounts) {
  let { borrows } = book;
  let borrowers = borrows.map(({ id, returned }) => {
    const borrower = accounts.find((account) => account.id === id);
    return { ...borrower, ...{ returned } };
  }, []);
  return borrowers.slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
