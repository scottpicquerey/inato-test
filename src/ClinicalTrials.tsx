import React, { Fragment, useCallback } from "react";
import _ from "lodash";

import {
  Table,
  Header,
  Body,
  Row,
  HeaderCell,
  ClickableHeaderCell,
  Cell,
  CountrySelector,
  CountrySelectorBtn,
  CountryTable,
  CountryCell,
  CountryTableContainer,
  CountryCellHeader
} from "./style"
import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { SortDirection, Country } from "./App";
import { CSSProperties } from "styled-components";


interface Props {
  clinicalTrials: AppQueryResponse["clinicalTrials"];
  patientsSortDirection: SortDirection;
  setPatientsSortDirection: (
    patientsSortDirection: SortDirection
  ) => void;
  countrySortDirection: SortDirection;
  setCountrySortDirection: (
    countrySortDirection: SortDirection
  ) => void;
  setCountry: (
    country: Country
  ) => void;
  showCountries: Boolean;
  setShowCountries: (
    showCountries: Boolean
  ) => void;
  countriesFiltered: Boolean;
  setCountriesFiltered: (
    countriesFiltered: Boolean
  ) => void;
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  countrySortDirection,
  setCountrySortDirection,
  setCountry,
  showCountries,
  setShowCountries,
  countriesFiltered,
  setCountriesFiltered
}: Props) => {
  const toggleSortDirection = useCallback((columnName: string) => {
    if (columnName === "patients") {
      sortColumnDirection(patientsSortDirection, setPatientsSortDirection, setCountrySortDirection);
    } else if (columnName === "country") {
      sortColumnDirection(countrySortDirection, setCountrySortDirection, setPatientsSortDirection);
    }
  }, [patientsSortDirection, setPatientsSortDirection, countrySortDirection, setCountrySortDirection]);

  const toggleCountryFiltering = useCallback((country) => {
    setCountry(country);
    setCountriesFiltered(true);
  }, [setCountry, setCountriesFiltered]);

  const selectCountry = useCallback((country) => {
    toggleCountryFiltering(country);
    setShowCountries(true);
  }, [setShowCountries, toggleCountryFiltering]);

  const toggleResetFiltering = useCallback(() => {
    setCountry(null);
    setShowCountries(false);
    setCountriesFiltered(false);
  }, [setCountry, setShowCountries, setCountriesFiltered]);

  const getQueryCountries = useCallback(() => {
    const countries = _.map(clinicalTrials, "country");
    const countriesUniq = _.uniq(countries);
    return _.sortBy(countriesUniq);
  }, [clinicalTrials]);

  const displayCountries = useCallback(() => {
    setShowCountries(!showCountries);
  }, [showCountries, setShowCountries]);

  return (
    <Fragment>
      <h1>Clinical trials</h1>
      {
        countriesFiltered ?
          <Fragment>
            <CountrySelector>
              <p>Country selected: {getQueryCountries()[0]}</p>
              <CountrySelectorBtn onClick={toggleResetFiltering}>Reset</CountrySelectorBtn>
            </CountrySelector>
          </Fragment> :
          <Fragment>
            <CountrySelector>
              <p>Filter by country: </p>
              <CountryTableContainer>
                <CountryCellHeader onClick={displayCountries} key="country-default">Select a country</CountryCellHeader>
                <CountryTable style={showCountries ? undefined : removeBorder}>
                  {
                    getQueryCountries().map((country) => showCountries ? <CountryCell onClick={() => { selectCountry(country) }} key={country}>{country}</CountryCell> : null)
                  }
                </CountryTable>
              </CountryTableContainer>
              <CountrySelectorBtn onClick={toggleResetFiltering}>Reset</CountrySelectorBtn>
            </CountrySelector>
          </Fragment>
      }
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <HeaderCell>city</HeaderCell>
          <ClickableHeaderCell onClick={() => { toggleSortDirection("country") }}>
            country{sortDirectionIndicator(countrySortDirection)}
          </ClickableHeaderCell>
          <ClickableHeaderCell onClick={() => { toggleSortDirection("patients") }}>
            patients{sortDirectionIndicator(patientsSortDirection)}
          </ClickableHeaderCell>
        </Header>
        <Body>
          {clinicalTrials.map(clinicalTrial => (
            <Row key={clinicalTrial.site}>
              <Cell>{clinicalTrial.site}</Cell>
              <Cell>{_.capitalize(clinicalTrial.city)}</Cell>
              <Cell>{clinicalTrial.country}</Cell>
              <Cell>{clinicalTrial.patients}</Cell>
            </Row>
          ))}
        </Body>
      </Table>
    </Fragment>
  );
};

const sortDirectionIndicator = (
  columnName: string | null
) => {
  if (columnName === "asc") return "↑";
  if (columnName === "desc") return "↓";
  return "";
};

const sortColumnDirection = (
  columnDirection: string | null,
  setColumnSortDirection: Function,
  setOtherColumnSortDirection: Function
) => {
  if (columnDirection == null) {
    setColumnSortDirection("asc");
  } else if (columnDirection === "asc") {
    setColumnSortDirection("desc");
  } else {
    setColumnSortDirection(null);
  }
  setOtherColumnSortDirection(null);
};

/* CSS Adjustments */
const removeBorder = {
  border: "none"
} as CSSProperties;
export default ClinicalTrials;
