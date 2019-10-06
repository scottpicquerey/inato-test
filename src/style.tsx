
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
`;

export const CountrySelectorBtn = styled.button`
    border-radius: 4px;
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

export const CountryTableContainer = styled.div`
    position: relative;
    width: 180px;
    height: 35px;
    margin: 0 0 0 15px;
    cursor: pointer;
`;

export const CountryTable = styled.ul`
    width: 100%;    
    border: 1px solid lightgrey;
    max-height: 280px;
    overflow: scroll;
    margin: 36px 0 0 0;
    outline: none;
    font-size: 16px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    position: absolute;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: left;
    background-color: #ffffff;
    padding: 0;
    top: 0;
`;

export const CountryCellHeader = styled.li`
    border-radius: 4px;
    list-style: none;
    padding: 8px 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #ffffff;
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
    &:hover {
        background-color: #b5b6ba;
    }
`;