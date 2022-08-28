describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset");
    const user1 = {
      name: "Administrator",
      username: "Admin",
      password: "adminadmin",
    };
    const user2 = {
      name: "Controller",
      username: "Controller",
      password: "controlcontrol",
    };
    cy.request("POST", "http://localhost:3003/api/users/", user1);
    cy.request("POST", "http://localhost:3003/api/users/", user2);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function () {
    cy.contains("Blogs");
  });

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("Admin");
      cy.get("#password").type("adminadmin");
      cy.get("#login-button").click();
      cy.contains("Administrator logged-in");
    });
    it("fails with wrong credentials", function () {
      cy.contains("login").click();
      cy.get("#username").type("John");
      cy.get("#password").type("johnjohn");
      cy.get("#login-button").click();
      cy.get(".error")
        .should("contain", "wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid");
    });
  });

  describe("when logged in", function () {
    beforeEach(function () {
      // cy.contains('login').click()
      // cy.get('#username').type('Admin')
      // cy.get('#password').type('adminadmin')
      // cy.get('#login-button').click()
      // cy.contains('Administrator logged-in')
      cy.login({ username: "Admin", password: "adminadmin" });
    });

    it("a new blog can be created", function () {
      cy.get("#new-blog-button").click();
      cy.get("#title").type("a title created by cypress");
      cy.get("#author").type("cypress");
      cy.get("#url").type("www.cypress.com/blog_created");

      cy.get("#submit").click();
      cy.contains("a title created by cypress");
    });

    describe("Blog manipulation.", function () {
      beforeEach(function () {
        //populate a blog
        // cy.get("#new-blog-button").click();
        // cy.get("#title").type("a title created by cypress");
        // cy.get("#author").type("cypress");
        // cy.get("#url").type("www.cypress.com/blog_created");
        // cy.get("#submit").click();
        // cy.contains("a title created by cypress");
        cy.createBlog({
          title: "a title created by cypress",
          author: "cypress",
          url: "www.cypress.com/blog_created",
        });
      });

      it("Update : a user can like a blog", function () {
        //click view button
        cy.get("#viewReveal").click();

        //click like button
        cy.get("#likeBlog").click();
        cy.contains("1");
      });

      it("Delete: the user who created a blog can delete it", function () {
        //click view button
        cy.get("#viewReveal").click();

        //get blog title
        const blogTitle = cy.get("#blogTitle");
        //click delete button
        cy.get("#removeBlog").click();
        cy.on("window:confirm", () => true);
        cy.get("html").should("not.contain", blogTitle);
      });

      describe("Blog manipulation with multiple blogs", function () {
        beforeEach(function () {
          cy.createBlog({
            title: "a second title created by cypress",
            author: "cypress",
            url: "www.cypress.com/blog_second_created",
          });
          cy.createBlog({
            title: "a third title created by cypress",
            author: "cypress",
            url: "www.cypress.com/blog_third_created",
          });
        });

        it("blogs are ordered according to likes with the blog with the most likes being first", function () {
          cy.contains("a second title created by cypress")
            .find("#viewReveal")
            .click();
          cy.contains("a second title created by cypress")
            .parent()
            .find("#likeBlog")
            .click();
          cy.contains("a second title created by cypress")
            .parent()
            .find("#likeBlog")
            .click();
          cy.contains("a second title created by cypress")
            .parent()
            .find("#likeBlog")
            .click();

          cy.contains("a third title created by cypress")
            .find("#viewReveal")
            .click();

          cy.contains("a third title created by cypress")
            .parent()
            .find("#likeBlog")
            .click();

          cy.get(".blog")
            .eq(0)
            .get(".longBlog")
            .should("contain", "a second title created by cypress");
          cy.get(".blog")
            .eq(1)
            .get(".longBlog")
            .should("contain", "a third title created by cypress");
        });
      });
    });
  });
});
