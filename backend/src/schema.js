const Mongoose = require("mongoose");
const {
    GraphQLID,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLObjectType,
    GraphQLSchema
} = require("graphql");

Mongoose.connect("mongodb://localhost:27017/test");

const CatModel = Mongoose.model("cats", {
        name: String,
        breed: String,
        dob: String,
        gender: String,
        dropped_by: String,
        picked_by: String
});

const ContactModel = Mongoose.model("contacts", {
    name: String,
    address: String,
    phone_number: String,
});

const ContactType = new GraphQLObjectType({
    name: "Contact",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        address: { type: GraphQLString },
        phone_number: { type: GraphQLString },
        cats_picked: {
          type: GraphQLList(CatType),
          resolve(parentValue, args) {
            return CatModel.find().where({picked_by: parentValue.id}).exec();
          }
        },
        cats_dropped: {
          type: GraphQLList(CatType),
          resolve(parentValue, args) {
            return CatModel.find().where({dropped_by: parentValue.id}).exec();
          }
        },
    })
});

const CatType = new GraphQLObjectType({
    name: "Cat",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        breed: { type: GraphQLString },
        dob: { type: GraphQLString },
        gender: { type: GraphQLString },
        dropped_by: { type: GraphQLString },
        picked_by: { type: GraphQLString },
        dropped: {
          type: ContactType,
          resolve(parentValue, args) {
            return parentValue.dropped_by ? ContactModel.findById(parentValue.dropped_by).exec() : {};
          }
        },
        picked: {
          type: ContactType,
          resolve(parentValue, args) {
            return parentValue.picked_by ? ContactModel.findById(parentValue.picked_by).exec() : {};
          }
        },
    })
});

const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      cats: {
        type: GraphQLList(CatType),
        resolve: (root, args, context, info) => {
          return CatModel.find().exec();
        }
      },
      cat: {
        type: CatType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args, context, info) => {
          return CatModel.findById(args.id).exec();
        }
      },
      contacts: {
        type: GraphQLList(ContactType),
        resolve: (root, args, context, info) => {
          return ContactModel.find().exec();
        }
      },
      contact: {
        type: ContactType,
        args: {
          id: { type: GraphQLNonNull(GraphQLID) }
        },
        resolve: (root, args, context, info) => {
          return ContactModel.findById(args.id).exec();
        }
      }
    }
  }),
  mutation: new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addCat: {
            type: CatType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                breed: { type: GraphQLNonNull(GraphQLString) },
                dob: { type: GraphQLNonNull(GraphQLString) },
                gender: { type: GraphQLNonNull(GraphQLString) },
                picked_by: { type: GraphQLNonNull(GraphQLString) },
                dropped_by: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, args, context, info) => {
                var cat = new CatModel(args);
                return cat.save();
            }
        },
        addContact: {
            type: ContactType,
            args: {
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
                phone_number: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, args, context, info) => {
                var contact = new ContactModel(args);
                return contact.save();
            }
        },
        deleteCat: {
            type: CatType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, { id }) => {
                return CatModel.remove({"_id": id});
            }
        },
        deleteContact: {
            type: ContactType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, { id }) => {
                return ContactModel.remove({"_id": id});
            }
        },
        editCat: {
            type: CatType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                breed: { type: GraphQLNonNull(GraphQLString) },
                dob: { type: GraphQLNonNull(GraphQLString) },
                gender: { type: GraphQLNonNull(GraphQLString) },
                dropped_by: { type: GraphQLNonNull(GraphQLString) },
                picked_by: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, args, context, info) => {
                return CatModel.update({_id: args.id}, args);
            }
        },
        editContact: {
            type: ContactType,
            args: {
                id: { type: GraphQLNonNull(GraphQLString) },
                name: { type: GraphQLNonNull(GraphQLString) },
                address: { type: GraphQLNonNull(GraphQLString) },
                phone_number: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve: (root, args, context, info) => {
                return ContactModel.update({_id: args.id}, args);
            }
        },
    }
  })

});

module.exports = schema;
