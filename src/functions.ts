/// <reference types="cypress" />
/// <reference path="../types/index.d.ts" />

import {
  BulkWriteOptions,
  Document,
  Filter,
  FindOptions,
  InsertOneOptions,
  OptionalId,
  UpdateFilter,
} from "mongodb";
import { functions } from "./enums";

module.exports = function () {
  Cypress.Commands.add(
    "mongoFindMany",
    (
      collection: string,
      filter?: Filter<Document>,
      options?: FindOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoFindMany,
        collection,
        findParameters: { filter, options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoFindOne",
    (
      collection: string,
      filter?: Filter<Document>,
      options?: FindOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoFindOne,
        collection,
        findParameters: { filter, options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoInsertOne",
    (
      collection: string,
      item: OptionalId<Document>,
      options?: InsertOneOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoInsertOne,
        collection,
        insertParameters: { item, options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoInsertMany",
    (
      collection: string,
      item: OptionalId<Document>[],
      options?: BulkWriteOptions
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoInsertMany,
        collection,
        insertParameters: { item, options },
      });
    }
  );
  Cypress.Commands.add(
    "mongoDeleteMany",
    (collection: string, filter: Filter<Document>): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoDeleteMany,
        collection,
        deleteParameters: { filter },
      });
    }
  );
  Cypress.Commands.add(
    "mongoDeleteOne",
    (collection: string, filter: Filter<Document>): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoDeleteOne,
        collection,
        deleteParameters: { filter },
      });
    }
  );
  Cypress.Commands.add(
    "mongoUpdateMany",
    (
      collection: string,
      filter: Filter<Document>,
      update: UpdateFilter<Document>
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoUpdateMany,
        collection,
        updateParameters: { filter, update },
      });
    }
  );
  Cypress.Commands.add(
    "mongoUpdateOne",
    (
      collection: string,
      filter: Filter<Document>,
      update: UpdateFilter<Document>
    ): any => {
      return cy.task("mongoConnection", {
        fun: functions.mongoUpdateOne,
        collection,
        updateParameters: { filter, update },
      });
    }
  );
};
