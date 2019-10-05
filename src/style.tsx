
import styled from "styled-components";

export const Table = styled.div`
    border-collapse: separate;
    border-spacing: 0px 8px;
    display: table;
`;

export const Header = styled.div`
    display: table-header-group;
`;

export const Body = styled.div`
    display: table-row-group;
`;

export const Row = styled.div`
    display: table-row;
`;

export const HeaderCell = styled.div`
    display: table-cell;
    padding: 8px 32px;
    border-radius: 4px;
`;

export const ClickableHeaderCell = styled(HeaderCell)`
    cursor: pointer;
    &:hover {
    background-color: #b5b6ba;
    }
`;

export const Cell = styled.div`
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

export const CountrySelector = styled.div`
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    max-width: 1300px;
    width: 100%;
}
`;

export const CountrySelectorBtn = styled.button`
    height: 35px;
    margin-left: 15px;
    border: 1px solid var(--border-color);
    cursor: pointer;
    padding: 8px 20px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-size: 16px;
    outline: none;
`;

export const CountryTable = styled.ul`
    width: 230px;
    height: 35px;
    margin: 0 0 0 15px;
    outline: none;
    font-size: 16px;
    border: 1px solid var(--border-color);
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    cursor: pointer;
    padding: 0;
`;

export const CountryCell = styled.li`
    list-style: none;
    padding: 8px 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
    &:nth-child(2) {
        border-top: 1px solid grey;
    }
    &:not(:first-child):not(:last-child) {
        border-bottom: 1px solid grey;
    }
`;

export const SelectedCountryCell = styled(CountryCell)`
    background-color: lightgrey;
`;

export const SelectedCountriesParagraph = styled.p`
    line-height: 30px;
    margin-right: 15px;
`;