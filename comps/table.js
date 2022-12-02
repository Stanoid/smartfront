import React, { Component } from 'react'

import Table from 'react-tailwind-table';
import 'react-tailwind-table/dist/index.css';

function TableVanilla(props){

    return <Table 
   
    columns={props.coloumns}
     rows={props.rows} />
  }

  export default TableVanilla;
