import styled from "styled-components";
import React, { Fragment, useCallback } from "react";
import * as _ from "lodash"

import { AppQueryResponse } from "./__generated__/AppQuery.graphql";
import { SortDirection } from "./App";

const Table = styled.div`
  border-collapse: separate;
  border-spacing: 0px 8px;
  display: table;
`;

const Header = styled.div`
  display: table-header-group;
`;

const Body = styled.div`
  display: table-row-group;
`;

const Row = styled.div`
  display: table-row;
`;

const HeaderCell = styled.div`
  display: table-cell;
  padding: 8px 32px;
  border-radius: 4px;
`;

const ClickableHeaderCell = styled(HeaderCell)`
  cursor: pointer;
  &:hover {
    background-color: #b5b6ba;
  }
`;

const Cell = styled.div`
  --border-color: #eaedf1;
  display: table-cell;
  vertical-align: middle;
  padding: 16px 32px;
  background: #ffffff;
  border-width: 1px;
  border-style: solid none;
  border-color: var(--border-color);

  &:first-child {
    border-left: 1px solid var(--border-color);
    border-radius: 4px 0 0 4px;
  }

  &:last-child {
    border-right: 1px solid var(--border-color);
    border-radius: 0 4px 4px 0;
  }
`;

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
}

const ClinicalTrials: React.FC<Props> = ({
  clinicalTrials,
  patientsSortDirection,
  setPatientsSortDirection,
  countrySortDirection,
  setCountrySortDirection
}: Props) => {
  const toggleSortDirection = useCallback((columnName: string) => {
    if (columnName === "patients") {
      sortColumnDirection(patientsSortDirection, setPatientsSortDirection, setCountrySortDirection)
    } else if (columnName === "country") {
      sortColumnDirection(countrySortDirection, setCountrySortDirection, setPatientsSortDirection)
    }
  }, [patientsSortDirection, setPatientsSortDirection, countrySortDirection, setCountrySortDirection]);

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

  return (
    <Fragment>
      <h1>Clinical trials</h1>
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

export default ClinicalTrials;
