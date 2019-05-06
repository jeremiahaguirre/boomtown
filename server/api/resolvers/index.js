const { ApolloError } = require('apollo-server-express');
// const jwt = require('jsonwebtoken');
const AuthMutationsFunction = require('./auth');
const { DateScalar } = require('../custom-types');

module.exports = app => {
  const authMutations = AuthMutationsFunction(app);
  return {
    Date: DateScalar,
    Query: {
      viewer(parent, args, context, info) {
        if (context.token) {
          return context.token;
        }
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
      ...authMutations,

      async addItem(parent, { item }, context, info) {
        console.log('item server', item);
        const user = context.token.id;
        try {
          const newItem = await context.pgResource.saveNewItem({
            item: item,
            user
          });
          return newItem;
        } catch (e) {
          throw new ApolloError(e);
        }
      }
    }
  };
};
