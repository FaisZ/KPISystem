import React from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import makeData from './makeData'
import ActivitySpecificEnhancedTable from './Tables/ActivitySpecificEnhancedTable'

const ActivityTable = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: 'Unsur',
        accessor: 'firstName',
      },
      {
        Header: 'Aktivitas',
        accessor: 'lastName',
      },
      {
        Header: 'Jabatan',
        accessor: 'age',
      },
      {
        Header: 'Angka Kredit',
        accessor: 'visits',
      },
      {
        // Make an expander cell
        Header: 'Tahapan',
        id: 'expander', // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? '👇' : '👉'}
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

  const [data, setData] = React.useState(React.useMemo(() => makeData(20), []))
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

  // Create a function that will render our row sub components
  const renderRowSubComponent = React.useCallback(
    ({ row }) => (
      <pre
        style={{
          fontSize: '10px',
        }}
      >
        <code>{JSON.stringify({ values: row.values }, null, 2)}</code>
      </pre>
    ),
    []
  )

  return (
    <div>
      <CssBaseline />
      <ActivitySpecificEnhancedTable
        columns={columns}
        data={data}
        setData={setData}
        updateMyData={updateMyData}
        skipPageReset={skipPageReset}
        // We added this as a prop for our table component
        // Remember, this is not part of the React Table API,
        // it's merely a rendering option we created for
        // ourselves
        renderRowSubComponent={renderRowSubComponent}
      />
    </div>
  )
}

export default ActivityTable
