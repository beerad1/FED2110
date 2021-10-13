class Bookshelf {
	constructor() {	// the function to help instantiate onbjects
					//runs immediately once the instance is called
		this.favoriteBooks = [];
	}

	// removes books with 'Great' in the title from array
 	addFavoriteBook(bookName) {
	  	if (!bookName.includes("Great")) {
		  	// Array.push()
		  	this.favoriteBooks.push(bookName);
	  	}
  	}
  	printFavoriteBooks() {
	  	// string interpolation
	  	// Array.length === number
	  	console.log(`Favorite Books: ${this.favoriteBooks.length}`);
	  	// for of loop: iterate through arrays and strings
		for (let bookName of this.favoriteBooks) {
			// this 'String(bookName)' constrains 'bookName' to a String
            // has to be defined in the loop or it will only show the first element of the array
			console.log(String(bookName));
	  	}
  	}
}

// use bookInst for Bookshelf Instance
function loadBooks(bookLoadInst) {

  	fakeAjax(BOOK_API, function(bookList){

	// for loop for iterating through array
    for( i = 0; i < bookList.length; i++) {

    	// bookList[i] is current array element
		bookLoadInst.addFavoriteBook(bookList[i]); 
    }

	// just prints the list to screen one element at a time
	bookLoadInst.printFavoriteBooks();
  });
}

// changed name to bookShowInst to help readability
var bookShowInst = new Bookshelf();
loadBooks(bookShowInst);

var BOOK_API = "https://some.url/api";

// ***********************

// NOTE: don't modify this function at all
function fakeAjax(url,cb) {
	setTimeout(function fakeLoadingDelay(){
		cb([
			"A Song of Ice and Fire",
			"The Great Gatsby",
			"Crime & Punishment",
			"Great Expectations",
			"You Don't Know JS"
		]);
	},500);
}