// Note: Please do not change the name of the functions. The tests use those names to validate your code.

const { partitionBooksByBorrowedStatus } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  // return the number of books currently loaned out
  //since we already have a function that gives us the loaned out books, 
  //we can destruct the array and return the length of the un-nested array.
  [loanedOut, available] = partitionBooksByBorrowedStatus(books);
  return loanedOut.length;
}

function getMostCommonGenres(books) {
  // Return an array of {name: genre, count: 1} which counts every genre.
  let genresOnHand = [];
  let objectify = {};

  for(book of books){
    if(objectify[book.genre]){
      objectify[book.genre]++;
    }
    else{
      objectify[book.genre] = 1;  
    }
  } // from here we have a list of genres 

  let nKeys = Object.keys(objectify);
  for(key of nKeys){
    genresOnHand.push({name: key, count: objectify[key]});
  }
  genresOnHand.sort((itemA, itemB)=> itemB.count - itemA.count);

  return genresOnHand.length > 4 ? genresOnHand.splice(0, 5): genresOnHand;
}


function getMostPopularBooks(books) {
  // find the top five "most popular" books, return a list of book names sorted by most borrows or 'count'.
    // output needs to look like [{name: incididunt nostrud, count: 30}, {}...]

  //first we'll get an array of the borrows by the name of the book. 
  let collection = books.map(book=> {
    return {name : book.title, count : book.borrows.length}
  });
  // then we sort it
  _sortIt(collection);
  // and trim what we don't need. 
  return collection.length > 4? collection.splice(0, 5): collection;
}

function getMostPopularAuthors(books, authors) {
  // Returns the top five or fewer authors by books checked out the most. 
    // Find all books written by an author and add up the borrows.
    
  
    //then save that value and output an object literal for each author in the same format as before. 
  let popAuthors = authors.map(author=>{ //for each author, access their books 
    let chkID = author.id; 
    let aName = `${author.name.first} ${author.name.last}`; // grab the whole name for outputting
    let bCount = 0; //and use a running tally to count the book.borrows.length
    const writtenBooks = books.filter(book=> book.authorId === chkID); //collect all the books with their ID on it. 
    writtenBooks.forEach(book => bCount+=book.borrows.length); //then count how many borrows the book had
    return {name: aName, count: bCount }
  })
  // then sort it descending
      //popAuthors.sort((authA, authB)=> authA.count < authB.count? 1:-1);
    _sortIt(popAuthors);
  // finally return it, checking if it's longer than 4 to splice it at 5. 
  return popAuthors.length > 4? popAuthors.splice(0, 5): popAuthors;
}

function _sortIt(arr){
  return arr.sort((thingA, thingB)=> thingA.count < thingB.count? 1:-1);
}


module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
