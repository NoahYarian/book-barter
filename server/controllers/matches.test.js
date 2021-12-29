import mongoose from 'mongoose';
import { getBooksMatchingWishes, getItemsForUser, isMatchingBookOrAuthor } from './matches.js';


const ObjectId = mongoose.Types.ObjectId;
const books = [
    {
    _id: new ObjectId("61ca309e777d377bfd2a3cc6"),
    title: 'Man and his Symbols',
    author: 'Carl G. Jung',
    isbn: '9780440351832',
    year: '1964',
    format: 'Hardcover',
    condition: 'Fair',
    details: 'slightly torn dust jacket',
    userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
    __v: 0
    },
    {
    _id: new ObjectId("61ca30c3777d377bfd2a3ccb"),
    title: '1',
    author: '2',
    isbn: '4',
    year: '3',
    format: '5',
    condition: '6',
    details: '7',
    userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
    __v: 0
    },
    {
    _id: new ObjectId("61ca30c8777d377bfd2a3ccd"),
    title: '2',
    author: '3',
    isbn: '5',
    year: '4',
    format: '6',
    condition: '7',
    details: '8',
    userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
    __v: 0
    },
    {
    _id: new ObjectId("61ca3e74a831cff21ba34f5b"),
    title: '3',
    author: '4',
    isbn: '6',
    year: '5',
    format: '7',
    condition: '8',
    details: '9',
    userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
    __v: 0
    },
    {
    _id: new ObjectId("61ca5632a831cff21ba34f6f"),
    title: "The web designer's idea book",
    author: 'Patrick McNeil',
    isbn: '1440333157',
    year: '2014',
    format: 'Hardcover',
    condition: 'Good',
    details: '',
    userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7baccfaf8385e2742fcd"),
    title: 'Book1',
    author: 'Author1',
    isbn: '',
    year: '',
    format: 'lkj',
    condition: 'lkj',
    details: '',
    userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7bbfcfaf8385e2742fcf"),
    title: 'Book2',
    author: 'Author1',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7bd0cfaf8385e2742fd1"),
    title: 'Book3',
    author: 'Author2',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7bdbcfaf8385e2742fd3"),
    title: 'Book4',
    author: 'Author2',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7cc9cfaf8385e2742fdd"),
    title: 'Book7',
    author: 'Author5',
    isbn: '',
    year: '',
    format: 'lkj',
    condition: 'lkj',
    details: '',
    userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7cfecfaf8385e2742fe0"),
    title: 'Book6',
    author: 'Author4',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
    __v: 0
    },
    {
    _id: new ObjectId("61ca7d12cfaf8385e2742fe2"),
    title: 'Book8',
    author: 'Author6',
    isbn: '',
    year: '',
    format: 'lkjh',
    condition: 'ljkh',
    details: '',
    userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
    __v: 0
    },
    {
    _id: new ObjectId("61ca81aecfaf8385e2742ff8"),
    title: 'Book1',
    author: 'Author1',
    isbn: '',
    year: '',
    format: 'kjh',
    condition: 'kjh',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
    },
    {
    _id: new ObjectId("61ca81b9cfaf8385e2742ffa"),
    title: 'Book2',
    author: 'Author1',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
    },
    {
    _id: new ObjectId("61ca81c4cfaf8385e2742ffc"),
    title: 'Book3',
    author: 'Author2',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
    },
    {
    _id: new ObjectId("61ca81cfcfaf8385e2742ffe"),
    title: 'Book4',
    author: 'Author2',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
    },
    {
    _id: new ObjectId("61cb8c9ce2f68f7642901bc2"),
    title: "Book1",
    author: "Author3",
    isbn: "",
    year: "",
    format: "asdf",
    condition: "asdf",
    details: "",
    userId: "9d23d69c-63ac-480c-81ba-e69fd0b94619",
    __v: 0
    }
];
const wishes = [
    {
      _id: new ObjectId("61ca3c04a831cff21ba34f4e"),
      author: 'Carl G. Jung',
      title: 'The Red Book',
      userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
      __v: 0
    },
    {
      _id: new ObjectId("61ca3c18a831cff21ba34f50"),
      author: 'Joseph Campbell',
      title: 'The Power of Myth',
      userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
      __v: 0
    },
    {
      _id: new ObjectId("61ca689ea81767380d8bbc65"),
      author: 'Alan Watts',
      title: '',
      userId: '1e3a8095-cf2f-488b-82b4-5a5e4e0c2c5a',
      __v: 0
    },
    {
      _id: new ObjectId("61ca7c2ccfaf8385e2742fd5"),
      author: 'Author3',
      title: 'Book5',
      userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
      __v: 0
    },
    {
      _id: new ObjectId("61ca7c44cfaf8385e2742fd7"),
      author: 'Author4',
      title: 'Book6',
      userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
      __v: 0
    },
    {
      _id: new ObjectId("61ca7c5acfaf8385e2742fd9"),
      author: 'Author5',
      title: '',
      userId: '1d8f0bcb-f64c-45f2-8097-1778a737dc62',
      __v: 0
    },
    {
      _id: new ObjectId("61ca7d26cfaf8385e2742fe4"),
      author: 'Author1',
      title: 'Book1',
      userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
      __v: 0
    },
    {
      _id: new ObjectId("61ca7d38cfaf8385e2742fe6"),
      author: 'Author2',
      title: '',
      userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
      __v: 0
    },
    {
      _id: new ObjectId("61ca81e0cfaf8385e2743000"),
      author: 'Author3',
      title: 'Book5',
      userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
      __v: 0
    },
    {
      _id: new ObjectId("61ca81f1cfaf8385e2743002"),
      author: 'Author4',
      title: 'Book6',
      userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
      __v: 0
    },
    {
      _id: new ObjectId("61ca81f9cfaf8385e2743004"),
      author: 'Author5',
      title: '',
      userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
      __v: 0
    }
  ];
const memberUserId = "9d23d69c-63ac-480c-81ba-e69fd0b94619";
const test2UserId = "3b4a99cd-c106-4390-95ec-d2fc8a37869d";

const memberBooks = [
{
    _id: new ObjectId("61ca81aecfaf8385e2742ff8"),
    title: 'Book1',
    author: 'Author1',
    isbn: '',
    year: '',
    format: 'kjh',
    condition: 'kjh',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
},
{
    _id: new ObjectId("61ca81b9cfaf8385e2742ffa"),
    title: 'Book2',
    author: 'Author1',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
},
{
    _id: new ObjectId("61ca81c4cfaf8385e2742ffc"),
    title: 'Book3',
    author: 'Author2',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
},
{
    _id: new ObjectId("61ca81cfcfaf8385e2742ffe"),
    title: 'Book4',
    author: 'Author2',
    isbn: '',
    year: '',
    format: 'lij',
    condition: 'lij',
    details: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
},
{
    _id: new ObjectId("61cb8c9ce2f68f7642901bc2"),
    title: "Book1",
    author: "Author3",
    isbn: "",
    year: "",
    format: "asdf",
    condition: "asdf",
    details: "",
    userId: "9d23d69c-63ac-480c-81ba-e69fd0b94619",
    __v: 0
  }
];
const memberWishes = [
  {
    _id: new ObjectId("61ca81e0cfaf8385e2743000"),
    author: 'Author3',
    title: 'Book5',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
  },
  {
    _id: new ObjectId("61ca81f1cfaf8385e2743002"),
    author: 'Author4',
    title: 'Book6',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
  },
  {
    _id: new ObjectId("61ca81f9cfaf8385e2743004"),
    author: 'Author5',
    title: '',
    userId: '9d23d69c-63ac-480c-81ba-e69fd0b94619',
    __v: 0
  }
];
const test2Books = [
    {
        _id: new ObjectId("61ca7cc9cfaf8385e2742fdd"),
        title: 'Book7',
        author: 'Author5',
        isbn: '',
        year: '',
        format: 'lkj',
        condition: 'lkj',
        details: '',
        userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
        __v: 0
    },
    {
        _id: new ObjectId("61ca7cfecfaf8385e2742fe0"),
        title: 'Book6',
        author: 'Author4',
        isbn: '',
        year: '',
        format: 'lij',
        condition: 'lij',
        details: '',
        userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
        __v: 0
    },
    {
        _id: new ObjectId("61ca7d12cfaf8385e2742fe2"),
        title: 'Book8',
        author: 'Author6',
        isbn: '',
        year: '',
        format: 'lkjh',
        condition: 'ljkh',
        details: '',
        userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
        __v: 0
    }
];
const test2Wishes = [
    {
      _id: new ObjectId("61ca7d26cfaf8385e2742fe4"),
      author: 'Author1',
      title: 'Book1',
      userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
      __v: 0
    },
    {
      _id: new ObjectId("61ca7d38cfaf8385e2742fe6"),
      author: 'Author2',
      title: '',
      userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
      __v: 0
    }
];

describe('getBooksMatchingWishes', () => {
    test('returns matching books', () => {
        const foundBooks = [
            {
                _id: new ObjectId("61ca7cfecfaf8385e2742fe0"),
                title: 'Book6',
                author: 'Author4',
                isbn: '',
                year: '',
                format: 'lij',
                condition: 'lij',
                details: '',
                userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
                __v: 0
            },
            {
                _id: new ObjectId("61ca7cc9cfaf8385e2742fdd"),
                title: 'Book7',
                author: 'Author5',
                isbn: '',
                year: '',
                format: 'lkj',
                condition: 'lkj',
                details: '',
                userId: '3b4a99cd-c106-4390-95ec-d2fc8a37869d',
                __v: 0
            }
        ];
        expect(getBooksMatchingWishes(books, memberWishes)).toEqual(foundBooks);
    });
});

describe('isMatchingBookOrAuthor', () => {
    test('returns true with matching title and author', () => {
        const book = memberBooks[0];
        const wish = test2Wishes[0];
        expect(isMatchingBookOrAuthor(book, wish)).toBe(true);
    });
    test('returns true with blank wish title and matching author', () => {
        const book = memberBooks[2];
        const wish = test2Wishes[1];
        expect(isMatchingBookOrAuthor(book, wish)).toBe(true);
    });
    test('returns false with matching title but not author', () => {
        const book = memberBooks[4];
        const wish = test2Wishes[0];
        expect(isMatchingBookOrAuthor(book, wish)).toBe(false);
    });
    test('returns false with unmatching title and author', () => {
        const book = memberBooks[2];
        const wish = test2Wishes[0];
        expect(isMatchingBookOrAuthor(book, wish)).toBe(false);
    });
    test('returns false with blank wish title and unmatching author', () => {
        const book = memberBooks[0];
        const wish = test2Wishes[1];
        expect(isMatchingBookOrAuthor(book, wish)).toBe(false);
    });
});

describe('getItemsForUser', () => {
    test("returns a user's books", () => {
        expect(getItemsForUser(books, memberUserId)).toEqual(memberBooks);
    });
    test("returns a user's wishes", () => {
        expect(getItemsForUser(wishes, memberUserId)).toEqual(memberWishes);
    });
});
