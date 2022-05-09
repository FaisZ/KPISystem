import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import makeData from './makeData'
import { Button } from '@material-ui/core'
import MaUTable from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell, {tableCellClasses} from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import { styled } from '@material-ui/core'
import AtasanViewSubmittedActivitySpecificEnhancedTable from './Tables/AtasanViewSubmittedActivitySpecificEnhancedTable'

const AtasanViewSubmittedActivityTable = ({
  tableData,
  buktiFisikData,
  allUnsur,
  allRank
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nama Pegawai',
        accessor: 'namaPegawai',
      },
      {
        Header: 'Aktivitas',
        accessor: 'aktivitas',
      },
      {
        Header: 'Status',
        accessor: 'status',
      },
      {
        Header: 'Tanggal Pengajuan',
        accessor: 'updated_at',
      },
      {
        Header: 'Angka Kredit',
        accessor: 'angkaKredit',
      },
      {
        // Make an expander cell
        Header: 'Tahapan',
        //accessor: 'tahapan',
        id: 'tahapan', // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          // <>Klik Disini</>
          <span {...row.getToggleRowExpandedProps()}>
            <>Klik Disini</>
          </span>
        ),
      },
      // {
      //   Header: 'Tahapan',
      //   accessor: 'status',
      // },
      // {
      //   Header: 'Bukti Fisik',
      //   accessor: 'progress',
      // },
    ],
    []
  )

  //const [data, setData] = React.useState(React.useMemo(() => makeData(20), []))
  const [data, setData] = React.useState(React.useMemo(() => tableData, []))
  const [skipPageReset, setSkipPageReset] = React.useState(false)

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true)
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
  }

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));
  
  function drawTahapanAndBuktiFisik(selectedActivityIndex){
    var res = [];
    for(var i=0; i<count(buktiFisikData[selectedActivityIndex]); i++){
      res.push(<TableCell>({buktiFisikData[selectedActivityIndex][i].description}) </TableCell>)
    }
    return res;
  }

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
      >
      <MaUTable sx={{ minWidth: 650 }} size='small'>
        <TableHead>
            <TableRow>
              <TableCell>
                Tahapan
              </TableCell>
              <TableCell>
                Bukti Fisik 
              </TableCell>
            </TableRow>
        </TableHead>
        <TableBody>
            <TableCell>
              {tableData[row.index].tahapan}
            </TableCell>
              <TableCell>
                {buktiFisikData[row.index].map(function(object, i){
                    return <div key={i}>
                      {object.description}
                    </div>;
                })}
              </TableCell>
        </TableBody>
      </MaUTable>
      </pre>
    ),
    []
  )

  return (
    <div>
      <CssBaseline />
      <AtasanViewSubmittedActivitySpecificEnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        allUnsur={allUnsur}
        allRank={allRank}
        buktiFisikData={buktiFisikData}
        // We added this as a prop for our table component
        // Remember, this is not part of the React Table API,
        // it's merely a rendering option we created for
        // ourselves
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  )
}

export default AtasanViewSubmittedActivityTable
