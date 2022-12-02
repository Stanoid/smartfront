
import {
  ColumnDef,
  FilterFn,
  SortingFn,
  sortingFns,
} from '@tanstack/react-table'

import { Person } from './makeData'
import {
  rankItem,
  compareItems,
  RankingInfo,
} from '@tanstack/match-sorter-utils'
import IndeterminateCheckbox from './components/InderterminateCheckbox'




import {
  ColumnFiltersState,
  getCoreRowModel,
  getFacetedMinMaxValues,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getGroupedRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  GroupingState,
  useReactTable,
} from '@tanstack/react-table'
import React from 'react'
import { makeData } from './makeData'

import styled from '@emotion/styled'
import { useSkipper } from './hooks'

import DebouncedInput from './components/DebouncedInput'
import ActionButtons from './components/ActionButtons'
import { faker } from '@faker-js/faker'
import CustomTable from './components/CustomTable'



 const fuzzyFilter: FilterFn<Person> = (
  row,
  columnId,
  value,
  addMeta
) => {
  // Rank the item
  const itemRank = rankItem(row.getValue(columnId), value)

  // Store the ranking info
  addMeta(itemRank)

  // Return if the item should be filtered in/out
  return itemRank.passed
}

 const fuzzySort: SortingFn<Person> = (rowA, rowB, columnId) => {
  let dir = 0

  // Only sort by rank if the column has ranking information
  if (rowA.columnFiltersMeta[columnId]) {
    dir = compareItems(
      rowA.columnFiltersMeta[columnId]! as RankingInfo,
      rowB.columnFiltersMeta[columnId]! as RankingInfo
    )
  }

  // Provide an alphanumeric fallback for when the item ranks are equal
  return dir === 0 ? sortingFns.alphanumeric(rowA, rowB, columnId) : dir
}

 type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

// Give our default column cell renderer editing superpowers!
 const defaultColumn: Partial<ColumnDef<Person>> = {
  cell: ({ getValue, row: { index }, column: { id }, table }) => {
    const initialValue = getValue()
    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue)

    // When the input is blurred, we'll call our table meta's updateData function
    const onBlur = () => {
      ;(table.options.meta as TableMeta).updateData(index, id, value)
    }

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => {
      
      setValue(initialValue)
    }, [initialValue])

    return (
      <input
        value={value as string}
        onChange={e => setValue(e.target.value)}
        onBlur={onBlur}
      />
    )
  },
}


 const getTableMeta = (
  setData: React.Dispatch<React.SetStateAction<Person[]>>,
  skipAutoResetPageIndex: () => void
) =>
  ({
    updateData: (rowIndex, columnId, value) => {
      // Skip age index reset until after next rerender
      skipAutoResetPageIndex()
      setData(old =>
        old.map((row, index) => {
          if (index !== rowIndex) return row

          return {
            ...old[rowIndex]!,
            [columnId]: value,
          }
        })
      )
    },
  } as TableMeta)


const Styles = styled.div`
  padding: 1rem;

  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }

    td {
      input {
        font-size: 1rem;
        padding: 0;
        margin: 0;
        border: 0;
      }
    }
  }

  .pagination {
    padding: 0.5rem;
  }
`

export const TableTan = (props) => {
  const rerender = React.useReducer(() => ({}), {})[1]

  const [data, setData] = React.useState(props.data)
  //const refreshData = () => setData(makeData(1000))

  
 const columns: ColumnDef<Person>[] = props.colomn;


  const [columnVisibility, setColumnVisibility] = React.useState({})
  const [grouping, setGrouping] = React.useState<GroupingState>([])
  const [isSplit, setIsSplit] = React.useState(false)
  const [rowSelection, setRowSelection] = React.useState({})
  const [columnPinning, setColumnPinning] = React.useState({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
  const [globalFilter, setGlobalFilter] = React.useState('')

  const [autoResetPageIndex, skipAutoResetPageIndex] = useSkipper()

  const table = useReactTable({
    data,
    columns,
    defaultColumn,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getGroupedRowModel: getGroupedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFacetedMinMaxValues: getFacetedMinMaxValues(),
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    
    globalFilterFn: fuzzyFilter,
    autoResetPageIndex,
    onColumnVisibilityChange: setColumnVisibility,
    onGroupingChange: setGrouping,
    onColumnPinningChange: setColumnPinning,
    onRowSelectionChange: setRowSelection,
    // Provide our updateData function to our table meta
    meta: getTableMeta(setData, skipAutoResetPageIndex),
    state: {
      grouping,
      columnFilters,
      globalFilter,
      columnSizing: {
        "clientName": 1000,
        "lastName": 189.5,
        "Name": 189.5
      },
      columnVisibility,
      columnPinning,
      rowSelection,
    },
    debugTable: false,
    debugHeaders: false,
    debugColumns: false,
  })

  React.useEffect(() => {
//console.log("use log",props.data)
//setData(props.data)
    

    

  }, [
    // table.getState().columnFilters[0]?.id
  ])

  // const randomizeColumns = () => {
  //   table.setColumnOrder(
  //     faker.helpers.shuffle(table.getAllLeafColumns().map(d => d.id))
  //   )
  // }

  return (
    <Styles>
      <div  className="p-2 grid grid-cols-4 gap-4  " style={{width:"100%"}}>
      
        <div className="p-2">
          Search:
          <DebouncedInput
            value={globalFilter ?? ''}
            onChange={value => setGlobalFilter(String(value))}
            className="mx-1 p-2 font-lg shadow border border-block"
            placeholder="Search all columns..."
          />
        </div>
        {/* <div className="p-2 inline-block border border-black shadow rounded">
          <div className="px-1 border-b border-black">
            <label>
              <input
                type="checkbox"
                checked={table.getIsAllColumnsVisible()}
                onChange={table.getToggleAllColumnsVisibilityHandler()}
                className="mr-1"
              />
              Toggle All
            </label>
          </div>
          {table.getAllLeafColumns().map(column => {
            return (
              <div key={column.id} className="px-1">
                <label>
                  <input
                    type="checkbox"
                    checked={column.getIsVisible()}
                    onChange={column.getToggleVisibilityHandler()}
                    className="mr-1"
                  />
                  {column.id}
                </label>
              </div>
            )
          })}
        </div> */}
        {/* <div className="p-2">
          <div>
            <input
              type="checkbox"
              checked={isSplit}
              onChange={e => setIsSplit(e.target.checked)}
              className="mx-1"
            />
            Split Mode
          </div>
          <button onClick={randomizeColumns} className="border rounded p-1">
            Shuffle Columns
          </button>
        </div> */}
      </div>
      <div>
      <CustomTable
          table={table}
          tableGroup={isSplit ? 'center' : undefined}
        />
      </div>
    
      <ActionButtons
        getSelectedRowModel={table.getSelectedRowModel}
        hasNextPage={table.getCanNextPage()}
        hasPreviousPage={table.getCanPreviousPage()}
        nextPage={table.nextPage}
        pageCount={table.getPageCount()}
        pageIndex={table.getState().pagination.pageIndex}
        pageSize={table.getState().pagination.pageSize}
        previousPage={table.previousPage}
        // refreshData={refreshData}
        rerender={rerender}
        rowSelection={rowSelection}
        setPageIndex={table.setPageIndex}
        setPageSize={table.setPageSize}
        totalRows={table.getPrePaginationRowModel().rows.length}
      />
      <div className="p-2" />
      {/* <pre>{JSON.stringify(table.getState(), null, 2)}</pre> */}
    </Styles>
  )
}

export default TableTan
