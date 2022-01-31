declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Custom command to ... add your description here
     * @example cy.clickOnMyJourneyInCandidateCabinet()
     */
    mongoFind(
      collection: string,
      filter?: Filter<Document>,
      options?: FindOptions
    ): Promise<WithId<Document>[]>;
    patata(): any;
  }
}
