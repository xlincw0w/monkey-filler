function clickNextUntilGone() {
  cy.get("body").then(($body) => {
    if ($body.find('button:contains("次へ")').length > 0) {
      cy.log("New Iteration.");

      cy.get('[data-testid="QuestionSpacing__paddingBox"]').each(($question) => {
        if ($question.find('[data-testid="answer-layout-column"]').length > 0) {
          cy.wrap($question)
            .find('[data-testid="answer-layout-column"]')
            .first()
            .children()
            .first()
            .children()
            .first("radio or checkbox")
            .click({ force: true });
        }

        if ($question.find('[data-testid="select"]').length > 0) {
          cy.wrap($question)
            .find('[data-testid="select"]')
            .then(($select) => {
              const firstValue = $select.find("option").eq(1).val();
              cy.wrap($select).select(firstValue);
            });
        }

        if ($question.find('[role="row"]').length > 0) {
          cy.wrap($question)
            .find('[role="row"]')
            .each(($row) => {
              if ($row.attr("id")) {
                cy.wrap($row).find("input").first().click({ force: true });
              }
            });
        }
      });

      cy.contains("次へ").click();

      cy.wait(2000);
      clickNextUntilGone();
    }
  });
}

describe("Monkey filler", () => {
  it("main", () => {
    cy.visit(`/${Cypress.env("surveyMonkeyId")}`);
    cy.contains("OK").click();
    cy.contains("次へ").click();

    clickNextUntilGone();

    cy.contains("完了").click();
  });
});
