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
  SelectedCountryCell,
  SelectedCountriesParagraph
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
  setCountries: (
    countries: Country[]
  ) => void;
  selectedCountries: Country[]
  setSelectedCountries: (
    selectedCountries: Country[]
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
  setCountries,
  showCountries,
  setShowCountries,
  countriesFiltered,
  setCountriesFiltered,
  selectedCountries,
  setSelectedCountries
}: Props) => {
  const toggleSortDirection = useCallback((columnName: string) => {
    if (columnName === "patients") {
      sortColumnDirection(patientsSortDirection, setPatientsSortDirection, setCountrySortDirection)
    } else if (columnName === "country") {
      sortColumnDirection(countrySortDirection, setCountrySortDirection, setPatientsSortDirection)
    }
  }, [patientsSortDirection, setPatientsSortDirection, countrySortDirection, setCountrySortDirection]);

  const toggleCountriesFiltering = useCallback(() => {
    if (selectedCountries.length > 0) {
      setCountries(selectedCountries);
      setCountriesFiltered(true)
    }
  }, [setCountries, setCountriesFiltered, selectedCountries]);

  const toggleResetFiltering = useCallback(() => {
    setCountries([]);
    setShowCountries(false)
    setCountriesFiltered(false)
    setSelectedCountries([]);
  }, [setCountries, setShowCountries, setCountriesFiltered, setSelectedCountries])
  
  const getAllCountries = useCallback(() => {
    const countries = _.map(clinicalTrials, "country")
    const countriesUniq = _.uniq(countries)
    return _.sortBy(countriesUniq)
  }, [clinicalTrials]);

  const displayCountries = useCallback(() => {
    setShowCountries(!showCountries);
  }, [showCountries, setShowCountries]);

  const selectCountry = useCallback((country: string) => {
    let countries = [...selectedCountries];
    if (!countries.includes(country)) {
      countries.push(country);
    } else {
      countries = countries.filter(x => x!== country);
    }
    setSelectedCountries(countries);
  }, [selectedCountries, setSelectedCountries]);
  
  const displaySelectedCountries = useCallback(() => {
    let inlineCountries = "";
    selectedCountries.forEach((country, index) => {
      index === selectedCountries.length - 1 ? inlineCountries += country : inlineCountries += `${country}, `;
    });
    return <SelectedCountriesParagraph>Selected countries: {inlineCountries}</SelectedCountriesParagraph>;
  }, [selectedCountries]);
  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <CountrySelector>
        {
          countriesFiltered?
          <Fragment>
            {
              displaySelectedCountries()
            }
            <CountrySelectorBtn style={removeMargin} onClick={toggleResetFiltering}>Reset filters</CountrySelectorBtn>
          </Fragment>:
          <Fragment>
            <p>Filter by country: </p>
            <CountryTable>
              <CountryCell onClick={displayCountries} key="country-default">Select countries</CountryCell>
              {
                getAllCountries().map((country) => {
                  if (showCountries === true) {
                    return selectedCountries.includes(country)?
                    <SelectedCountryCell onClick={() => {selectCountry(country)}} key={country}>{country}</SelectedCountryCell>:
                    <CountryCell onClick={() => {selectCountry(country)}} key={country}>{country}</CountryCell>
                  } else {
                    return null
                  }
                })
              }
            </CountryTable>
            <CountrySelectorBtn onClick={toggleCountriesFiltering}>Filter</CountrySelectorBtn>
          </Fragment>
        }
      </CountrySelector>
      <Table>
        <Header>
          <HeaderCell>site</HeaderCell>
          <HeaderCell>city</HeaderCell>
          <ClickableHeaderCell onClick={() => {toggleSortDirection("country")}}>
            country{sortDirectionIndicator(countrySortDirection)}
          </ClickableHeaderCell>
          <ClickableHeaderCell onClick={() => {toggleSortDirection("patients")}}>
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
  setOtherColumnSortDirection(null)
};

/* CSS Adjustments */
const removeMargin = {
  margin: 0
} as CSSProperties;

export default ClinicalTrials;
