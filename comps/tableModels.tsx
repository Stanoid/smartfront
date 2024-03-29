import {
  ColumnDef,
  FilterFn,
  SortingFn,
  sortingFns,
} from '@tanstack/react-table'
import React from 'react'
import { Person } from './makeData'
import {
  rankItem,
  compareItems,
  RankingInfo,
} from '@tanstack/match-sorter-utils'
import IndeterminateCheckbox from './components/InderterminateCheckbox'

export const fuzzyFilter: FilterFn<Person> = (
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

export const fuzzySort: SortingFn<Person> = (rowA, rowB, columnId) => {
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

export type TableMeta = {
  updateData: (rowIndex: number, columnId: string, value: unknown) => void
}

// Give our default column cell renderer editing superpowers!
export const defaultColumn: Partial<ColumnDef<Person>> = {
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

export const columns: ColumnDef<Person>[] = [
  {
    id: 'select',
    
    header: ({ table }) => (
      <IndeterminateCheckbox
        checked={table.getIsAllRowsSelected()}
        indeterminate={table.getIsSomeRowsSelected()}
        onChange={table.getToggleAllRowsSelectedHandler()}
      />
    ),
    cell: ({ row }) => (
      <div className="px-1">
        <IndeterminateCheckbox
          checked={row.getIsSelected()}
          indeterminate={row.getIsSomeSelected()}
          onChange={row.getToggleSelectedHandler()}
        />
      </div>
    ),
  },
 
 
      {
        header:'CLIENT',
        accessorKey: 'clientName',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'TYPE',
        accessorKey: 'type',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'STATUS',
        accessorKey: 'status',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'TID',
        accessorKey: 'tid',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'MID',
        accessorKey: 'mid',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'SECTOR',
        accessorKey: 'sector',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'PROVIDER',
        accessorKey: 'bankName',
         enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'DEVICE',
        accessorKey: 'model',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

      {
        header:'PHONE',
        accessorKey: 'clientPhone',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },
    
      {
        header:'PRIORITY',
        accessorKey: 'priority',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },

    
      {
        header:'ASSIGNED',
        accessorKey: 'asigndate',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },
      {
        header:'INCHARGE',
        accessorKey: 'incharge',
        enableColumnFilter:true,
        cell: info => info.getValue(),
      },
    
    

    
      // {
      //   accessorFn: row => `${row.firstName} ${row.lastName}`,
      //   id: 'fullName',
      //   header: 'Full Name',
      //   cell: info => info.getValue(),
     
      //   filterFn: fuzzyFilter,
      //   sortingFn: fuzzySort,
      // },
    
  
      // {
      //   accessorKey: 'age',
      //   header: () => 'Age',
       
      // },
    
      //     {
      //       accessorKey: 'visits',
      //       header: () => <span>Visits</span>,
           
      //     },
      //     {
      //       accessorKey: 'status',
      //       header: 'Status',
          
      //     },
      //     {
      //       accessorKey: 'progress',
      //       header: 'Profile Progress',
           
      //     },
]

export const getTableMeta = (
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
