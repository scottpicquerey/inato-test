import React, {useState} from "react";
import graphql from "babel-plugin-relay/macro";
import styled from "styled-components";
import {QueryRenderer} from "react-relay";

import ClinicalTrials from "./ClinicalTrials";
import environment from "./environment";
import {AppQuery} from "./__generated__/AppQuery.graphql";

const Layout = styled.div`
  background: #f6f7fa;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const Content = styled.div`
  margin-top: 48px;
  max-width: 1300px;
  width: 100%;
`;

export type SortDirection = 'asc' | 'desc' | null;
export type Country = string | null;

const App: React.FC = () => {
  const [patientsSortDirection, setPatientsSortDirection] = useState<SortDirection>(null);
  const [countrySortDirection, setCountrySortDirection] = useState<SortDirection>(null);
  const [countries, setCountries] = useState<Country[]>([]);
  const [selectedCountries, setSelectedCountries] = useState<Country[]>([]);
  const [showCountries, setShowCountries] = useState<Boolean>(false);
  const [countriesFiltered, setCountriesFiltered] = useState<Boolean>(false);

    return (
      <Layout>
        <Content>
          <QueryRenderer<AppQuery>
            environment={environment}
            query={graphql`
          query AppQuery($patientsSortDirection: String, $countrySortDirection: String, $countries: [String])  {
            clinicalTrials(patientsSortDirection:$patientsSortDirection, countrySortDirection:$countrySortDirection, countries:$countries) {
              country
              patients
              site
              city
            }
          }
        `}
            variables={{
              patientsSortDirection,
              countrySortDirection,
              countries
            }}
            render={({props}) => {
              if (!props) {
                return;
              }
              return <ClinicalTrials patientsSortDirection={patientsSortDirection}
                                     setPatientsSortDirection={setPatientsSortDirection}
                                     countrySortDirection={countrySortDirection}
                                     setCountrySortDirection={setCountrySortDirection}
                                     setCountries={setCountries}
                                     showCountries={showCountries}
                                     setShowCountries={setShowCountries}
                                     countriesFiltered={countriesFiltered}
                                     setCountriesFiltered={setCountriesFiltered}
                                     selectedCountries={selectedCountries}
                                     setSelectedCountries={setSelectedCountries}
                                     clinicalTrials={props.clinicalTrials}/>;
            }}
          />
        </Content>
      </Layout>
    );
};

export default App;
