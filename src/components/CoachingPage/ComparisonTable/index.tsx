/* eslint-disable react/no-array-index-key */
/* eslint-disable max-len */
import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ITableData } from '@/app/services/apiService/CoachingAPI';
import { ITitleAttributes } from '@/components/HomePage/ServicesListing/interafces';
import SectionContainer from '@/components/Containers/SectionContainers';
import SectionHeadings from '@/components/UIElements/SectionHeadings';

interface TableAllData extends ITitleAttributes {
  json_content: ITableData;
  className?: string;
}

const ComparisonTable: React.FC<TableAllData> = ({ title, sub_title, json_content, className }) => {
  const { columns, rows } = json_content.languageTests;
  return (
    <div className="background-[#F3F3F3]">
      <SectionContainer cssClass={`${className} py-10 md:py-[100px] blogs-listing`}>
        <SectionHeadings title={title} subTitle={sub_title} h2Subtitle />
        <div className="h-[100%] overflow-auto mt-10 md:mt-10 ">
          <Paper className="">
            <TableContainer className="max-h-[500px] border border-[#D2D2D2]" component={Paper}>
              <Table sx={{ borderCollapse: 'separate', tableLayout: 'fixed', width: 'auto' }}>
                <TableHead className="sticky top-0 z-20 text-center table-header font-semibold">
                  <TableRow>
                    {columns.map((col, index) => {
                      return (
                        <TableCell
                          key={index}
                          className={`${
                            index === 0
                              ? 'min-w-[120px] sticky left-0 z-30 table-header !font-bold text-left border-0'
                              : 'min-w-[200px] table-header text-left !font-bold'
                          }`}
                        >
                          {col.label}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row, rowIndex) => {
                    return (
                      <TableRow hover key={rowIndex}>
                        {columns.map((col, colIndex) => {
                          return (
                            <TableCell
                              key={colIndex}
                              className={`${
                                colIndex === 0
                                  ? 'sticky left-0 table-header font-bold z-10 text-left border-0 border-r border-[#D2D2D2]'
                                  : 'text-left table-body'
                              }`}
                            >
                              {colIndex === 0 ? row.testName : row[col.dataKey]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </div>
      </SectionContainer>
    </div>
  );
};

export default ComparisonTable;
