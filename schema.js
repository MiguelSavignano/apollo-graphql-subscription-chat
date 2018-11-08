const { gql } = require('apollo-server');
const fs = require('fs');
const typeDefs = gql`${fs.readFileSync(__dirname.concat('/schema.graphql'), 'utf8')}`;

exports.typeDefs = typeDefs
