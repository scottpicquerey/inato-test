import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from "graphql";
import { nodeDefinitions } from "graphql-relay";
import _ from "lodash"

import { ClinicalTrialType } from "./clinicalTrials";
import { queryBuilder } from "./database";

const { nodeField } = nodeDefinitions(() => {
  return null;
});

export const schema = new GraphQLSchema({
  query: new GraphQLObjectType({
    name: "Query",
    fields: {
      node: nodeField,
      clinicalTrials: {
        type: GraphQLNonNull(GraphQLList(GraphQLNonNull(ClinicalTrialType))),
        args: {
          patientsSortDirection: {
            type: GraphQLString
          },
          countrySortDirection: {
            type: GraphQLString
          },
          country: {
            type: GraphQLString
          }
        },
        resolve: (__, { patientsSortDirection, countrySortDirection, country }) => {
          let baseQuery = queryBuilder("clinical_trial");
          if (countrySortDirection !== null  && countrySortDirection !== undefined) {
            baseQuery = baseQuery.orderBy("country", countrySortDirection);
          } else if (patientsSortDirection !== null && patientsSortDirection !== undefined) {
            baseQuery = baseQuery.orderBy("patients", patientsSortDirection);
          }
          if (country !== null && country !== undefined) {
            baseQuery.where("country", _.capitalize(country));
          }
          return baseQuery.select();
        }
      }
    }
  })
});
