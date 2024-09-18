import {
  InsertManyResult,
  InsertOneResult,
  UpdateResult,
  DeleteResult,
  Document,
} from "mongodb";

describe("Testing MongoDB Plugin", () => {
  const testCollection = `testCollection_${Date.now()}`;

  it("should insert multiple documents and verify insertion", () => {
    cy.mongoInsertMany(testCollection, [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Carla", age: 25 },
    ]).then((result: InsertManyResult<Document>) => {
      expect(result.insertedCount).to.equal(3);
    });
  });

  it("should find one document by name", () => {
    cy.mongoFindOne(testCollection, { name: "Alice" }).then(
      (result: Document | null) => {
        expect(result).to.not.be.null;
        expect(result).to.have.property("name", "Alice");
      }
    );
  });

  it("should find multiple documents by age", () => {
    cy.mongoFindMany(testCollection, { age: 25 }).then(
      (results: Document[]) => {
        expect(results).to.have.length(2);
      }
    );
  });

  it("should insert a single document and verify", () => {
    cy.mongoInsertOne(testCollection, { name: "David", age: 30 })
      .then((result: InsertOneResult<Document>) => {
        expect(result.acknowledged).to.be.true;
        expect(result.insertedId).to.exist;

        // Verify the inserted document
        return cy.mongoFindOne(testCollection, { name: "David" });
      })
      .then((doc: Document | null) => {
        expect(doc).to.not.be.null;
        expect(doc).to.have.property("name", "David");
      });
  });

  it("should update multiple documents and verify update", () => {
    cy.mongoUpdateMany(testCollection, { age: 25 }, { $set: { age: 26 } })
      .then((result: UpdateResult) => {
        expect(result.modifiedCount).to.equal(2);

        // Verify the update
        return cy.mongoFindMany(testCollection, { age: 26 });
      })
      .then((results: Document[]) => {
        expect(results).to.have.length(2);
      });
  });

  it("should delete one document and verify deletion", () => {
    cy.mongoDeleteOne(testCollection, { name: "David" })
      .then((result: DeleteResult) => {
        expect(result.deletedCount).to.equal(1);

        // Verify the deletion
        return cy.mongoFindOne(testCollection, { name: "David" });
      })
      .then((doc: Document | null) => {
        expect(doc).to.be.null;
      });
  });

  it("should delete multiple documents and verify deletion", () => {
    cy.mongoDeleteMany(testCollection, { age: 26 })
      .then((result: DeleteResult) => {
        expect(result.deletedCount).to.equal(2);

        // Verify that no documents with age 26 remain
        return cy.mongoFindMany(testCollection, { age: 26 });
      })
      .then((results: Document[]) => {
        expect(results).to.have.length(0);
      });
  });
  it("should insert a document with nested objects and verify", () => {
    const nestedDoc = {
      name: "Eve",
      age: 28,
      address: {
        street: "123 Main St",
        city: "Anytown",
        zip: "12345",
      },
      hobbies: ["reading", "gaming"],
    };

    cy.mongoInsertOne(testCollection, nestedDoc)
      .then((result: InsertOneResult<Document>) => {
        expect(result.acknowledged).to.be.true;
        expect(result.insertedId).to.exist;

        // Verify the inserted document
        return cy.mongoFindOne(testCollection, { name: "Eve" });
      })
      .then((doc: Document | null) => {
        expect(doc).to.not.be.null;
        expect(doc).to.have.property("name", "Eve");
        expect(doc).to.have.nested.property("address.city", "Anytown");
        expect(doc).to.have.property("hobbies").that.includes("gaming");
      });
  });

  it("should update a single document and verify update", () => {
    cy.mongoUpdateOne(testCollection, { name: "Eve" }, { $set: { age: 29 } })
      .then((result: UpdateResult) => {
        expect(result.modifiedCount).to.equal(1);

        // Verify the update
        return cy.mongoFindOne(testCollection, { name: "Eve" });
      })
      .then((doc: Document | null) => {
        expect(doc).to.not.be.null;
        expect(doc).to.have.property("age", 29);
      });
  });

  it("should increment a field using $inc operator", () => {
    cy.mongoUpdateOne(testCollection, { name: "Eve" }, { $inc: { age: 1 } })
      .then((result: UpdateResult) => {
        expect(result.modifiedCount).to.equal(1);

        // Verify the increment
        return cy.mongoFindOne(testCollection, { name: "Eve" });
      })
      .then((doc: Document | null) => {
        expect(doc).to.not.be.null;
        expect(doc).to.have.property("age", 30);
      });
  });

  it("should attempt to delete a non-existing document and verify deletion count is zero", () => {
    cy.mongoDeleteOne(testCollection, { name: "NonExistingUser" }).then(
      (result: DeleteResult) => {
        expect(result.deletedCount).to.equal(0);
      }
    );
  });

  it("should delete all documents in the collection", () => {
    cy.mongoDeleteMany(testCollection, {})
      .then((result: DeleteResult) => {
        expect(result.deletedCount).to.be.greaterThan(0);

        // Verify the collection is empty
        return cy.mongoFindMany(testCollection, {});
      })
      .then((docs: Document[]) => {
        expect(docs).to.have.length(0);
      });
  });
});
