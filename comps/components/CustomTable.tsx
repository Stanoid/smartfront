import {
  flexRender,
  HeaderGroup,
  Row,
  RowData,
  Table,

} from '@tanstack/react-table'

import React from 'react'
import Filter from './Filter'
import TablePins from './TablePins'
import {useState} from "react"
import {FaSort,FaSortDown,FaSortUp,FaSearch} from 'react-icons/fa'
type TableGroup = 'center' | 'left' | 'right'

function getTableHeaderGroups<T extends RowData>(
  table: Table<T>,
  tg?: TableGroup
): [HeaderGroup<T>[], HeaderGroup<T>[]] {
  if (tg === 'left') {
    return [table.getLeftHeaderGroups(), table.getLeftFooterGroups()]
  }

  if (tg === 'right') {
    return [table.getRightHeaderGroups(), table.getRightFooterGroups()]
  }

  if (tg === 'center') {
    return [table.getCenterHeaderGroups(), table.getCenterFooterGroups()]
  }

  return [table.getHeaderGroups(), table.getFooterGroups()]
}

function getRowGroup<T extends RowData>(row: Row<T>, tg?: TableGroup) {
  if (tg === 'left') return row.getLeftVisibleCells()
  if (tg === 'right') return row.getRightVisibleCells()
  if (tg === 'center') return row.getCenterVisibleCells()
  return row.getVisibleCells()
}

type Props<T extends RowData> = {
  table: Table<T>
  tableGroup?: TableGroup
}

export function CustomTable<T extends RowData>({
  table,
  tableGroup,
}: Props<T>) {
  const [headerGroups, footerGroup] = getTableHeaderGroups(table, tableGroup)
  const [searchvis, setSearchvis] = React.useState(false)
  return ( 
    <div style={{padding:5}}>
<div onClick={()=>{searchvis?setSearchvis(false):setSearchvis(true)}} style={{marginBottom:15,width:"50px",padding:10,borderRadius:5,color:"white",backgroundColor:"#6B617C",display:"flex",justifyContent:"center",alignItems:"center"}}> 
  <FaSearch/>
</div>
    
    <table className='border shadow rounded'  style={{border:"0px solid black"}}>
      <thead style={{border:"0px solid black",fontSize:"12px",color:"#6B617C"}}>
        {headerGroups.map(headerGroup => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map(header => (
              <th
                className="relative"
                key={header.id}
                style={{
                  
                  width: header.getSize(),
                  border:"0px solid black",
                }}
                colSpan={header.colSpan}
              >
                {header.isPlaceholder ? null : (
                  <>
                    <div>
                      {/* {header.column.getCanGroup() ? (
                        // If the header can be grouped, let's add a toggle
                        <button
                          onClick={header.column.getToggleGroupingHandler()}
                          style={{
                            cursor: 'pointer',
                          }}
                        >
                          {header.column.getIsGrouped()
                            ? `(${header.column.getGroupedIndex()})`
                            : ``}
                        </button>
                      ) : null}{' '} */}
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}{' '}
                      <br/>
                      <button
                        onClick={header.column.getToggleSortingHandler()}
                        className={
                          header.column.getCanSort()
                            ? 'cursor-pointer select-none'
                            : ''
                        }
                      >
                        {{
                          asc: <FaSortUp/>,
                          desc: <FaSortDown/>,
                        }[header.column.getIsSorted() as string] ?? <FaSort/>}
                      </button>
                    </div>
                    {header.column.getCanFilter() ? (
                     searchvis?
                      <div  style={{display:"block"}}>
                        <Filter column={header.column} table={table} />
                      </div>:null

                    ) : null}
                  </>
                )}
                <div
                  className="absolute right-0 top-0 h-full w-1 bg-blue-300 select-none touch-none hover:bg-blue-500 cursor-col-resize"
                  onMouseDown={header.getResizeHandler()}
                  onTouchStart={header.getResizeHandler()}
                />
               
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody style={{border:"0px solid black",fontSize:"14px"}}>
        {table.getRowModel().rows.map(row => (
          <tr   style={{borderBottom:"0.5px solid rgba(55,46,66,0.2)"}} key={row.id}>
            {getRowGroup(row, tableGroup).map(cell => (
              <td
              
                key={cell.id}
                style={{
                  width: cell.column.getSize(),
                  
                  border:"0px solid black",
                }}
              >
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
      {/* <tfoot style={{border:"0px solid black"}}>
        {footerGroup.map(footerGroup => (
          <tr key={footerGroup.id}>
            {footerGroup.headers.map(header => (
              <th  key={header.id} colSpan={header.colSpan}>
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.footer,
                      header.getContext()
                    )}
              </th>
            ))}
          </tr>
        ))}
      </tfoot> */}
    </table>
    </div>
  )
}

export default CustomTable
