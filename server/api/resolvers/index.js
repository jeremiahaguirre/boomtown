/**
 *  @TODO: Handling Server Errors
 *
 *  Once you've completed your pg-resource.js methods and handled errors
 *  use the ApolloError constructor to capture and return errors from your resolvers.
 *
 *  Throwing ApolloErrors from your resolvers is a nice pattern to follow and
 *  will help you easily debug problems in your resolving functions.
 *
 *  It will also help you control th error output of your resource methods and use error
 *  messages on the client! (More on that later).
 *
 *  The user resolver has been completed as an example of what you'll need to do.
 *  Finish of the rest of the resolvers when you're ready.
 */
const { ApolloError } = require('apollo-server-express');

// @TODO: Uncomment these lines later when we add auth
// const jwt = require("jsonwebtoken")
// const authMutations = require("./auth")
// -------------------------------
const { DateScalar } = require('../custom-types');

module.exports = app => {
  return {
    // Date: DateScalar,

    Query: {
      viewer() {
        /**
         * @TODO: Authentication - Server
         *
         *  If you're here, you have successfully completed the sign-up and login resolvers
         *  and have added the JWT from the HTTP cookie to your resolver's context.
         *
         *  The viewer is what we're calling the current user signed into your application.
         *  When the user signed in with their username and password, an JWT was created with
         *  the user's information cryptographically encoded inside.
         *
         *  To provide information about the user's session to the app, decode and return
         *  the token's stored user here. If there is no token, the user has signed out,
         *  in which case you'll return null
         */
        return null;
      },
      async user(parent, { id }, { pgResource }, info) {
        try {
          const user = await pgResource.getUserById(id);
          if (user === null) {
            throw 'Wrong User';
          } else {
            return user;
          }
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async items(parent, { filter }, { pgResource }) {
        try {
          const items = await pgResource.getItems(filter);
          return items;
        } catch (e) {
          throw new ApolloError(e);
        }
      },
      async tags(parent, args, { pgResource }) {
        try {
          const tags = await pgResource.getTags();
          return tags;
        } catch (e) {
          throw new AppoloError(e);
        }
      }
    },

    User: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The User GraphQL type has two fields that are not present in the
       *  user table in Postgres: items and borrowed.
       *
       *  According to our GraphQL schema, these fields should return a list of
       *  Items (GraphQL type) the user has lent (items) and borrowed (borrowed).
       *
       */

      async items({ id }, args, { pgResource }) {
        try {
          const itemowner = await pgResource.getItemsForUser(id);
          return itemowner;
        } catch (e) {
          throw new AppoloError(e);
        }
      },
      async borrowed({ id }, args, { pgResource }) {
        try {
          const borrowedItem = await pgResource.getBorrowedItemsForUser(id);
          return borrowedItem;
        } catch (e) {
          throw new AppoloError(e);
        }
      }
    },

    Item: {
      /**
       *  @TODO: Advanced resolvers
       *
       *  The Item GraphQL type has two fields that are not present in the
       *  Items table in Postgres: itemowner, tags and borrower.
       *
       * According to our GraphQL schema, the itemowner and borrower should return
       * a User (GraphQL type) and tags should return a list of Tags (GraphQL type)
       *
       */

      async itemowner({ itemowner }, args, { pgResource }) {
        try {
          const getItemOwner = await pgResource.getUserById(itemowner);
          return getItemOwner;
        } catch (e) {
          throw new AppoloError(e);
        }
      },
      async tags({ id }, args, { pgResource }) {
        try {
          const getTags = await pgResource.getTagsForItem(id);
          return getTags;
        } catch (e) {
          throw new AppoloError(e);
        }
      },
      async borrower({ id }, args, { pgResource }) {
        try {
          const borrowedItem = await pgResource.getUserById(id);
          return borrowedItem;
        } catch (e) {
          throw new AppoloError(e);
        }
      }
    },

    Mutation: {
      // @TODO: Uncomment this later when we add auth
      // ...authMutations(app),
      // -------------------------------

      async addItem(parent, { item }, { pgResource }, info) {

        // image = await image;
        // const user = await jwt.decode(context.token, app.get('JWT_SECRET'));
        try {
          const user = {
            //current user
          }
          const newItem = await context.pgResource.saveNewItem({
            item: item,
            user
            // image: args.image,
            // user
          });
          return newItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    }
  };
};
