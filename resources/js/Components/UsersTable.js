import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import UsersListSpecificEnhancedTable from './Tables/UsersListSpecificEnhancedTable'

const UsersTable = ({
  tableData,
  rankData
}) => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Nama',
        accessor: 'nama',
      },
      {
        Header: 'Email',
        accessor: 'email',
      },
      {
        Header: 'Jabatan',
        accessor: 'jabatan',
      },
      {
        Header: 'Atasan',
        accessor: 'atasan',
      },
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

  return (
    <div>
      <CssBaseline />
      <UsersListSpecificEnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        rankData={rankData}
      />
    </div>
  )
}

export default UsersTable
