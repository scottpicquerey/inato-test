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
  CountryInput,
  CountrySelectorBtn
} from "./style"
import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { SortDirection, Country } from "./App";

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
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  countrySortDirection,
  setCountrySortDirection,
  setCountry
}: Props) => {
  const toggleSortDirection = useCallback((columnName: string) => {
    if (columnName === "patients") {
      sortColumnDirection(patientsSortDirection, setPatientsSortDirection, setCountrySortDirection)
    } else if (columnName === "country") {
      sortColumnDirection(countrySortDirection, setCountrySortDirection, setPatientsSortDirection)
    }
  }, [patientsSortDirection, setPatientsSortDirection, countrySortDirection, setCountrySortDirection]);

  const toggleCountryFiltering = useCallback(() => {
    const inputCountryValue = (document.getElementById("country-input") as HTMLInputElement).value;
    setCountry(inputCountryValue);
  }, [setCountry]);

  const toggleResetFiltering = useCallback(() => {
    setCountry(null);
  }, [setCountry])
  
  return (
    <Fragment>
      <h1>Clinical trials</h1>
      <CountrySelector>
        <p>Filter by country: </p>
        <CountryInput autoComplete="off" id="country-input" placeholder="Type a country..."></CountryInput>
        <CountrySelectorBtn onClick={toggleCountryFiltering}>Filter</CountrySelectorBtn>
        <CountrySelectorBtn onClick={toggleResetFiltering}>Reset</CountrySelectorBtn>
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

const sortColumnDirection = (columnDirection: string | null, setColumnSortDirection: Function, setOtherColumnSortDirection: Function) => {
  if (columnDirection == null) {
    setColumnSortDirection("asc");
  } else if (columnDirection === "asc") {
    setColumnSortDirection("desc");
  } else {
    setColumnSortDirection(null);
  }
  setOtherColumnSortDirection(null)
};

export default ClinicalTrials;
