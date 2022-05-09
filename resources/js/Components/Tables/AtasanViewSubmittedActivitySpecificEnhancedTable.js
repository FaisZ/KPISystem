import React from 'react'

import Checkbox from '@material-ui/core/Checkbox'
import PropTypes from 'prop-types'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableFooter from '@material-ui/core/TableFooter'
import TablePagination from '@material-ui/core/TablePagination'
import TablePaginationActions from './TablePaginationActions'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TableToolbar from './TableToolbar'
import ReactModal from '../ReactModal'
import Button from '../Button'
import {
  useGlobalFilter,
  usePagination,
  useRowSelect,
  useSortBy,
  useTable,
  useExpanded
} from 'react-table'
import AtasanViewSubmittedActivityForm from '../Forms/AtasanViewSubmittedActivityForm'

const IndeterminateCheckbox = React.forwardRef(
  ({ indeterminate, ...rest }, ref) => {
    const defaultRef = React.useRef()
    const resolvedRef = ref || defaultRef

    React.useEffect(() => {
      resolvedRef.current.indeterminate = indeterminate
    }, [resolvedRef, indeterminate])

    return (
      <>
        <Checkbox ref={resolvedRef} {...rest} />
      </>
    )
  }
)

const inputStyle = {
  padding: 0,
  margin: 0,
  border: 0,
  background: 'transparent',
}

// Create an editable cell renderer
const EditableCell = ({
  value: initialValue,
  row: { index },
  column: { id },
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)

  const onChange = e => {
    setValue(e.target.value)
  }

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value)
  }

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <div key={id} >
      <input
        style={inputStyle}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
    </div>
  )
}

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired,
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired,
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  updateMyData: PropTypes.func.isRequired,
}

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell,
}

const AtasanViewSubmittedActivitySpecificEnhancedTable = ({
  columns,
  data,
  buktiFisikData,
  renderRowSubComponent,
  setData,
  updateMyData,
  skipPageReset,
  allUnsur,
  allRank
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    visibleColumns,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, selectedRowIds, globalFilter, expanded },
  } = useTable(
    {
      columns,
      data,
      //defaultColumn,
      autoResetPage: !skipPageReset,
      // updateMyData isn't part of the API, but
      // anything we put into these options will
      // automatically be available on the instance.
      // That way we can call this function from our
      // cell renderer!
      updateMyData,
    },
    useGlobalFilter,
    useSortBy,
    useExpanded, // We can useExpanded to track the expanded state
    // for sub components too!
    usePagination,
    useRowSelect
    // hooks => {
    //   hooks.allColumns.push(columns => [
    //     // Let's make a column for selection
    //     {
    //       id: 'selection',
    //       // The header can use the table's getToggleAllRowsSelectedProps method
    //       // to render a checkbox.  Pagination is a problem since this will select all
    //       // rows even though not all rows are on the current page.  The solution should
    //       // be server side pagination.  For one, the clients should not download all
    //       // rows in most cases.  The client should only download data for the current page.
    //       // In that case, getToggleAllRowsSelectedProps works fine.
    //       Header: ({ getToggleAllRowsSelectedProps }) => (
    //         <div>
    //           <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
    //         </div>
    //       ),
    //       // The cell can use the individual row's getToggleRowSelectedProps method
    //       // to the render a checkbox
    //       Cell: ({ row }) => (
    //         <div>
    //           <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
    //         </div>
    //       ),
    //     },
    //     ...columns,
    //   ])
    // }
  )

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage)
  }

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value))
  }

  const removeByIndexs = (array, indexs) =>
    array.filter((_, i) => !indexs.includes(i))

  const token = document.head.querySelector('meta[name="csrf-token"]').content;
    // Render the UI for your table
  return (
    <TableContainer>
      <TableToolbar
        // numSelected={Object.keys(selectedRowIds).length}
        // deleteUserHandler={deleteUserHandler}
        // addUserHandler={addUserHandler}
        tableName='Daftar Aktivitas'
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead>
          {headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <TableCell
                  {...(column.id === 'selection'
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  {column.render('Header')}
                  {column.id !== 'selection' ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? 'desc' : 'asc'}
                    />
                  ) : null}
                </TableCell>
              ))}
                <TableCell>Bukti Fisik</TableCell>
                <TableCell>Setujui</TableCell>
                <TableCell>Tolak</TableCell>
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row)
            return (
              // Use a React.Fragment here so the table markup is still valid
              // <React.Fragment {...row.getRowProps()}>
              <React.Fragment>
                {/* trigger the switch for the whole row => {...row.getToggleRowExpandedProps()} */}
                {/* <TableRow {...row.getToggleRowExpandedProps()}> */}
                <TableRow>
                  {row.cells.map(cell => {
                    return (
                      <TableCell {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </TableCell>
                    )
                  })}
                <TableCell> 
                  <ReactModal 
                    modalOpenText={'Lihat'} 
                    modalTitle={'Lihat Bukti Fisik'}
                    modalContent={<AtasanViewSubmittedActivityForm allUnsur={allUnsur} allRank={allRank} selectedData={data[row.index]} selectedRow={row} buktiFisik={buktiFisikData[row.index]}/>}
                    modalWidth={'60%'}
                  />
                </TableCell>
                <TableCell> 
                  <form method="POST" action="/atasan/setuju">
                    <input type="hidden" name="_token" value={token} />
                    <input hidden="true" name="id" value={data[row.index].id}/>
                    <div className="p-2">
                      <Button children='Setujui' />
                    </div>
                  </form>
                </TableCell>
                <TableCell> 
                  <form method="POST" action="/atasan/tolak">
                    <input type="hidden" name="_token" value={token} />
                    <input hidden="true" name="id" value={data[row.index].id}/>
                    <div className="p-2">
                      <Button children='Tolak' />
                    </div>
                  </form>
                </TableCell>
                </TableRow>
                {row.isExpanded ? (
                  <tr>
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {renderRowSubComponent({ row })}
                    </td>
                  </tr>
                ) : null}
              </React.Fragment>
            )
          })}
        </TableBody>

        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[
                5,
                10,
                25,
                { label: 'All', value: data.length },
              ]}
              colSpan={3}
              count={data.length}
              rowsPerPage={pageSize}
              page={pageIndex}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </MaUTable>
    </TableContainer>
  )
}

AtasanViewSubmittedActivitySpecificEnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired,
}

export default AtasanViewSubmittedActivitySpecificEnhancedTable
