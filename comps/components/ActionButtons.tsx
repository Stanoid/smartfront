import { RowData, RowModel } from '@tanstack/react-table'
import React from 'react'
import {FiChevronLeft,FiChevronRight,FiChevronsLeft,FiChevronsRight} from "react-icons/fi"
type Props<T extends RowData> = {
  getSelectedRowModel: () => RowModel<T>
  hasNextPage: boolean
  hasPreviousPage: boolean
  nextPage: () => void
  pageCount: number
  pageIndex: number
  pageSize: number
  previousPage: () => void
  refreshData: () => void
  rerender: () => void
  rowSelection: Object
  setPageIndex: (index: number) => void
  setPageSize: (size: number) => void
  totalRows: number
}

export function ActionButtons<T extends RowData>({
  getSelectedRowModel,
  hasNextPage,
  hasPreviousPage,
  nextPage,
  pageCount,
  pageIndex,
  pageSize,
  previousPage,
  refreshData,
  rerender,
  rowSelection,
  setPageIndex,
  setPageSize,
  totalRows,
}: Props<T>) {
  return (
    <React.Fragment>
      <div className="flex items-center gap-2  " style={{padding:15}}>
        <button
          className="border rounded p-1"
          style={{color:"white",backgroundColor:"#6B617C"}}
          onClick={() => setPageIndex(0)}
          disabled={!hasPreviousPage}
        >
         <FiChevronsLeft/>
        </button>
        <button
          className="border rounded p-1"
          style={{color:"white",backgroundColor:"#6B617C"}}
          onClick={() => previousPage()}
          disabled={!hasPreviousPage}
        >
         <FiChevronLeft/>
        </button>
        <button
          className="border rounded p-1"
          style={{color:"white",backgroundColor:"#6B617C"}}
          onClick={() => nextPage()}
          disabled={!hasNextPage}
        >
        <FiChevronRight/>
        </button>
        <button
          className="border rounded p-1"
          style={{color:"white",backgroundColor:"#6B617C"}}
          onClick={() => setPageIndex(pageCount - 1)}
          disabled={!hasNextPage}
        >
          <FiChevronsRight/>
        </button>
        <span   style={{color:"#6B617C"}} className="flex items-center gap-1">
          
          <div>Page</div>
          <strong>
            {pageIndex + 1} of {pageCount}
          </strong>
        </span>
        <span className="flex items-center gap-1">
          | Go to page:
          <input
            type="number"
            defaultValue={pageIndex + 1}
            onChange={e => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0
              setPageIndex(page)
            }}
            className="border p-1 rounded w-16"
          />
        </span>
        <select
          className="border p-1 rounded"
          value={pageSize}
          onChange={e => {
            setPageSize(Number(e.target.value))
          }}
        >
          {[10, 20, 30, 40, 50].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
      <div>{totalRows} Rows</div>
     
    </React.Fragment>
  )
}

export default ActionButtons
