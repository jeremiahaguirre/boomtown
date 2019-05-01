function tagsQueryString(tags, itemid, result) {
  /**
   * Challenge:
   * This function is more than a little complicated.
   *  - Can you refactor it to be simpler / more readable?
   *  - Is this
   */
  const length = tags.length;
  return length === 0
    ? `${result};`
    : tags.shift() &&
        tagsQueryString(
          tags,
          itemid,
          `${result}($${tags.length + 1}, ${itemid})${length === 1 ? '' : ','}`
        );
}

module.exports = postgres => {
  return {
    async createUser({ fullname, email, password }) {
      const newUserInsert = {
        text: '', // @TODO: Authentication - Server
        values: [fullname, email, password]
      };
      try {
        const user = await postgres.query(newUserInsert);
        return user.rows[0];
      } catch (e) {
        switch (true) {
          case /users_fullname_key/.test(e.message):
            throw 'An account with this username already exists.';
          case /users_email_key/.test(e.message):
            throw 'An account with this email already exists.';
          default:
            throw 'There was a problem creating your account.';
        }
      }
    },
    async getUserAndPasswordForVerification(email) {
      const findUserQuery = {
        text: '', // @TODO: Authentication - Server
        values: [email]
      };
      try {
        const user = await postgres.query(findUserQuery);
        if (!user) throw 'User was not found.';
        return user.rows[0];
      } catch (e) {
        throw 'User was not found.';
      }
    },
    async getUserById(id) {
      /**
       
       *  This will be the basic logic for this resource method:
       *  3) If the user is found and there are no errors, return only the id, email, fullname, bio fields.
       *     -- this is important, don't return the password!
       */

      const findUserQuery = {
        text: 'SELECT * FROM users WHERE id = $1', // @TODO: Basic queries
        values: id ? [id] : []
      };

      try {
        const user = await postgres.query(findUserQuery);

        return user.rows[0];
      } catch (err) {
        throw err;
      }
    },
    async getItems(idToOmit) {
      const getItemsQuery = {
        text: `SELECT * FROM items WHERE items.itemowner !=$1;`,
        values: idToOmit ? [idToOmit] : []
      };
      try {
        const items = await postgres.query(getItemsQuery);
        return items.rows;
      } catch (err) {
        throw err;
      }
    },
    async getItemsForUser(id) {
      const itemowener = {
        text: `SELECT * FROM items WHERE itemowner = $1`,
        values: [id]
      };
      try {
        const items = await postgres.query(itemowener);
        return items.rows;
      } catch (err) {
        throw err;
      }
    },
    async getBorrowedItemsForUser(id) {
      const borrowed = {
        text: `SELECT * FROM items WHERE borrower = $1`,
        values: [id]
      };
      try {
        const items = await postgres.query(borrowed);
        return items.rows;
      } catch (err) {
        throw err;
      }
    },
    async getTags() {
      try {
        const tags = await postgres.query('SELECT * FROM tags');
        return tags.rows;
      } catch (err) {
        throw err;
      }
    },
    async getTagsForItem(id) {
      const tagsQuery = {
        text: `SELECT * FROM tags INNER JOIN itemtags ON tags.id=itemtags.tagid WHERE itemtags.itemid= $1`,
        values: [id]
      };

      try {
        const tags = await postgres.query(tagsQuery);
        return tags.rows;
      } catch (err) {
        throw err;
      }
    },
    async saveNewItem({ item, user }) {
      return new Promise((resolve, reject) => {
        postgres.connect((err, client, done) => {
          try {
            client.query('BEGIN', async err => {
              const { title, description, tags } = item;
              const itemQuery = {
                text: `INSERT INTO items(title, description, ownerid) VALUES ($1, $2, $3) RETURNING *`,
                values: [title, description, user.id]
              };

              const newItem = await postgres.query(itemQuery);
              const tagsWithItems = {
                text: `INSERT INTO itemtags(itemid, tagid) VALUES ${tagsQueryString(
                  [...tags],
                  newItem.rows[0].id,
                  ''
                )} `,
                values: tags.map(tag => tag.id)
              };
              await postgres.query(tagsWithItems);
              client.query('COMMIT', err => {
                if (err) {
                  throw err;
                }
                
                done();
                resolve(newItem.rows[0]);
              });
            });
          } catch (e) {
            client.query('ROLLBACK', err => {
              if (err) {
                throw err;
              }

              done();
            });
            switch (true) {
              default:
                throw e;
            }
          }
        });
      });
    }
  };
};
