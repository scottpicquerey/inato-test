import {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLNonNull,
  GraphQLList,
  GraphQLString
} from "graphql";
import { nodeDefinitions } from "graphql-relay";

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
          countries: {
            type: GraphQLList(GraphQLString)
          }
        },
        resolve: (__, { patientsSortDirection, countrySortDirection, countries }) => {
          let baseQuery = queryBuilder("clinical_trial");
          if (countrySortDirection !== null  && countrySortDirection !== undefined) {
            baseQuery = baseQuery.orderBy("country", countrySortDirection);
          } else if (patientsSortDirection !== null && patientsSortDirection !== undefined) {
            baseQuery = baseQuery.orderBy("patients", patientsSortDirection);
          }
          if (countries !== null && countries !== undefined && countries.length > 0) {
            baseQuery.whereIn("country", countries);
          }
          return baseQuery.select();
        }
      }
    }
  })
});
