/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-constant-condition */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react/display-name */
/* eslint-disable no-unused-vars */
/* eslint-disable max-len */
/* eslint-disable react/no-array-index-key */

'use client';

import React, { useState, useCallback, memo, useMemo, useEffect } from 'react';
import {
  Dialog, DialogTitle, DialogContent, DialogActions, Button, Checkbox, FormGroup, FormControlLabel,
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Collapse,
  Chip,
  Link,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Loader from './Loader';
import './Basic.css';
import styles from './Priority.module.css';
import axios from 'axios';
import CircularLoader from '@/components/UIElements/CircularLoader';
import SnackbarAlert from '../Snackbar';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import HelpIcon from '@mui/icons-material/Help';
import Alert from '@mui/material/Alert';
import { useHeaderData } from '@/hooks/HeaderDataProvider';
import { styled } from '@mui/material/styles';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import CSVIcon from '@/components/Icons/CSVIcon';
import StepperPopup from '../Feedback';
import { FaSync } from 'react-icons/fa';
import Joyride, { STATUS } from 'react-joyride';

type CollapsibleRowProps = {
  row: any;
  toggleNotes: (rowId: string) => void;
  expandedNotes: any;
  rowId: string;
  Role?: string | undefined;
  updateVisaPRStatus?: (action: string, course: object, rowId: any) => void;
  visaPRStatus?: any;
  loading?: any;
  activeTab?: string;
  disabledButtons?: any;
  profileState?: string;
};

export const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => {
  return <Tooltip {...props} classes={{ popper: className }} enterTouchDelay={0} />;
})({
  [`& .${tooltipClasses.tooltip}`]: {
    fontSize: '14px',
  },
});

const CollapsibleRow = memo(
  ({
    row,
    toggleNotes,
    expandedNotes,
    rowId,
    Role,
    updateVisaPRStatus,
    visaPRStatus,
    profileState,
    loading,
    activeTab,
    disabledButtons,
  }: CollapsibleRowProps) => {
    const rowClassName = useMemo(() => {
      if (Role === 'User') {
        return styles.noTieUp;
      }
      if (Role === 'Counselor') {
        switch (row.InstituteCategory) {
        case 'Direct':
          return styles.direct;
        case 'In Direct':
          return styles.indirect;
        default:
          return styles.noTieUp;
        }
      }
    }, [row.InstituteCategory]);

    const isRowExpanded = expandedNotes[row.CreatedOn]; // Adjusted for clarity

    // Assuming the structure of 'row' contains all the data as per your example
    const firstDropdownData = [
      { label: 'Application Fee', value: row.ApplicationFee },
      { label: 'Fee', value: row.FeeText },
      { label: 'Intakes', value: row.Seasons },
      { label: 'Status', value: row.Status },
      { label: 'Deadline', value: row.Deadline },
      { label: 'Length', value: row.Length },
    ];

    const thirdDropdownData = [
      { label: 'Percentage', value: row.Percentage },
      { label: 'Backlog', value: row.Backlog },
      { label: 'Gap', value: row.Gap },
      { label: 'Campus', value: row.Campus },
      { label: 'City', value: row.City },
      { label: 'Province', value: row.Province },
    ];

    const secondDropdownData = [
      { label: 'IELTS Overall', value: row.IeltsOverall },
      { label: 'PTE Overall', value: row.PteOverall },
      { label: 'TOEFL Overall', value: row.TOEFLOverall },
      { label: 'Duolingo Overall', value: row.DuolingoOverall },
      { label: 'GRE', value: row.GRE },
      { label: 'GMAT', value: row.GMAT },
    ];

    const renderSectionData = (data: any) => {
      return (
        <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
          {/* Table Head Equivalent */}
          <div style={{ display: 'flex' }}>
            {data.map((item: any, index: number) => {
              return (
                <div
                  key={`header-${index}`}
                  style={{
                    fontWeight: 'bold',
                    background: '#F8F8F8',
                    fontSize: '13px',
                    flex: 1,
                    padding: '10px', // Example padding, adjust as needed
                  }}
                >
                  {item.label}
                </div>
              );
            })}
          </div>
          {/* Table Body Equivalent */}
          <div style={{ display: 'flex' }}>
            {data.map((item: any, index: number) => {
              return (
                <div
                  key={`data-${index}`}
                  style={{
                    fontSize: '13px',
                    flex: 1,
                    background: '#FFF',
                    padding: '10px', // Example padding, adjust as needed
                  }}
                >
                  {item.value}
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const chipColor = (status: string) => {
      if (status.toLowerCase() === 'low') {
        return 'error';
      }
      if (status.toLowerCase() === 'medium') {
        return 'warning';
      }
      return 'success';
    };

    return (
      <>
        <TableRow hover className={rowClassName} sx={{ '& > *': { borderBottom: 'unset' } }}>
          <TableCell>
            <IconButton
              size="small"
              onClick={() => {
                return toggleNotes(rowId);
              }}
            >
              {expandedNotes[rowId] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{row.FieldOfStudy}</TableCell>
          <TableCell>{row.InstituteName}</TableCell>
          <TableCell>{row.Title}</TableCell>
          <TableCell>{row.Level}</TableCell>
          {activeTab === 'eligible' && (
            <>
              <TableCell>
                {loading[`visa_${rowId}`] ? (
                  <CircularLoader />
                ) :
                  (visaPRStatus[rowId]?.visa?.chances && (
                    <div className="flex justify-between items-center">
                      <Chip
                        label={visaPRStatus[rowId]?.visa?.chances}
                        color={chipColor(visaPRStatus[rowId]?.visa?.chances)}
                        className="mr-1"
                      />
                      {visaPRStatus[rowId]?.visa.description && (
                        <>
                          <CustomWidthTooltip title={visaPRStatus[rowId]?.visa.description} arrow>
                            <HelpIcon className="cursor-pointer" />
                          </CustomWidthTooltip>
                          {profileState === 'UPDATED' && <FaSync
                            className={'ml-2 cursor-pointer'}
                            onClick={() => {
                              return updateVisaPRStatus && updateVisaPRStatus('Visa', row, rowId);
                            }}
                          />}
                        </>
                      )}
                    </div>
                  )) || (
                    <IconButton>
                      <ControlPointIcon
                        className="cursor-pointer"
                        onClick={() => {
                          return updateVisaPRStatus && updateVisaPRStatus('Visa', row, rowId);
                        }}
                      />
                    </IconButton>
                  )
                }
              </TableCell>
              <TableCell>
                {loading[`pr_${rowId}`] ? (
                  <CircularLoader />
                ) :
                  (visaPRStatus[rowId]?.pr?.chances && (
                    <div className="flex justify-between items-center">
                      <Chip
                        label={visaPRStatus[rowId]?.pr?.chances}
                        color={chipColor(visaPRStatus[rowId]?.pr?.chances)}
                        className="mr-1"
                      />
                      {visaPRStatus[rowId]?.pr.description && (
                        <>
                          <CustomWidthTooltip title={visaPRStatus[rowId]?.pr.description} arrow>
                            <HelpIcon className="cursor-pointer" />
                          </CustomWidthTooltip>
                          {profileState === 'UPDATED' && <FaSync
                            className={'ml-2 cursor-pointer'}
                            onClick={() => {
                              return updateVisaPRStatus && updateVisaPRStatus('PR', row, rowId);
                            }}
                          />}
                        </>
                      )}
                    </div>
                  )) || (
                    <IconButton>
                      <ControlPointIcon
                        className="cursor-pointer"
                        onClick={() => {
                          return updateVisaPRStatus && updateVisaPRStatus('PR', row, rowId);
                        }}
                      />
                    </IconButton>
                  )
                }
              </TableCell>
            </>
          )}
        </TableRow>
        {expandedNotes[rowId] && (
          <TableRow>
            <TableCell colSpan={7} style={{ background: '#F8F8F8', boxShadow: 'inset 0px 11px 8px -10px #CCC' }}>
              <Collapse in={expandedNotes[rowId]} timeout="auto" unmountOnExit>
                {renderSectionData(firstDropdownData)}
                {renderSectionData(secondDropdownData)}
                {renderSectionData(thirdDropdownData)}
              </Collapse>
            </TableCell>
          </TableRow>
        )}
      </>
    );
  },
);

function DownloadDialog({ open, onClose, tableData, onDownload }: any) {
  const allColumns = {
    'InstituteName': false,
    'Title': false,
    'FieldOfStudy': false,
    'Level': false,
    'ApplicationFee': false,
    'FeeText': false,
    'Seasons': false,
    'Status': false,
    'Deadline': false,
    'Length': false,
    'InstituteCategory': false,
    'Percentage': false,
    'Backlog': false,
    'Gap': false,
    'Campus': false,
    'City': false,
    'Province': false,
    'IeltsOverall': false,
    'PteOverall': false,
    'TOEFLOverall': false,
    'DuolingoOverall': false,
    'GRE': false,
    'GMAT': false,
  };

  const columnLabels: any = {
    'FieldOfStudy': 'Field of Study',
    'Title': 'Title',
    'InstituteName': 'Institute Name',
    'Level': 'Level',
    'ApplicationFee': 'Application Fee',
    'FeeText': 'Fee Text',
    'Seasons': 'Intakes',
    'Status': 'Status',
    'Deadline': 'Deadline',
    'Length': 'Length',
    'InstituteCategory': 'Institute Category',
    'Percentage': 'Percentage',
    'Backlog': 'Backlog',
    'Gap': 'Gap',
    'Campus': 'Campus',
    'City': 'City',
    'Province': 'Province',
    'IeltsOverall': 'Ielts Overall',
    'PteOverall': 'Pte Overall',
    'TOEFLOverall': 'TOEFL Overall',
    'DuolingoOverall': 'Duolingo Overall',
    'GRE': 'GRE',
    'GMAT': 'GMAT',
  };

  const [selectedColumns, setSelectedColumns] = useState<any>(allColumns);

  const handleToggleColumn = (column: any) => {
    setSelectedColumns({ ...selectedColumns, [column]: !selectedColumns[column] });
  };

  const handleSelectAll = () => {
    const updatedColumns: any = {};
    Object.keys(allColumns).forEach((column) => {
      updatedColumns[column] = true;
    });
    setSelectedColumns(updatedColumns);
  };

  const handleDeselectAll = () => {
    const updatedColumns: any = {};
    Object.keys(allColumns).forEach((column) => {
      updatedColumns[column] = false;
    });
    setSelectedColumns(updatedColumns);
  };

  const handleSubmit = () => {
    onDownload(tableData, selectedColumns);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <div className='bg-[var(--pale-sandal)] pb-2'>
        <DialogTitle className='font-bold py-2 flex justify-center text-center items-center'>Select columns to download</DialogTitle>
        <div className='flex'>
          <div className='flex justify-center items-center w-[50%]'>
            <Button className='text-white bg-black hover:bg-[#333333] text-sm font-bold rounded-none md:px-4 py-3.5 min-w-[100px]' onClick={handleSelectAll}>Select All</Button>
          </div>
          <div className='flex justify-center items-center w-[50%]'>
            <Button className='text-white bg-black hover:bg-[#333333] text-sm font-bold rounded-none md:px-4 py-3.5 min-w-[100px]' onClick={handleDeselectAll}>Deselect All</Button>
          </div>
        </div>
      </div>
      <DialogContent>
        <FormGroup className='grid grid-cols-1 md:grid-cols-3 gap-0'>
          {Object.keys(selectedColumns).length > 0
            ? Object.keys(selectedColumns).map((column) => {return (
              <FormControlLabel
                key={column}
                control={<Checkbox checked={selectedColumns[column]} onChange={() => {return handleToggleColumn(column);}} />}
                label={columnLabels[column]}
              />
            );})
            : <p>No columns available.</p>
          }
        </FormGroup>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} className='text-black text-sm font-bold md:px-4 py-3.5 min-w-[100px]'>Cancel</Button>
        <Button onClick={handleSubmit} className='text-white bg-black text-sm font-bold hover:bg-[#333333] disabled:bg-[#707070] disabled:text-white rounded-none md:px-4 py-3.5 min-w-[100px]' disabled={Object.values(selectedColumns).every((val) => {return !val;})}>
          Download
        </Button>
      </DialogActions>
    </Dialog>
  );
}

// Example component that utilizes the DownloadDialog
function MyComponent({ tableData, open, onClose, csvName }: any) {

  const handleDownload = (data: any, selectedColumns: any) => {
    const selectedColumnLabels = Object.keys(selectedColumns).filter((column) => {return selectedColumns[column];});
    const headerRow = selectedColumnLabels.join(',');
    const csvContent = [
      headerRow,
      ...data.map((row: any) => {return selectedColumnLabels.map((label) => {return `"${row[label] || ''}"`;}).join(',');}),
    ].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', csvName);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <DownloadDialog open={open} onClose={onClose} tableData={tableData} onDownload={handleDownload} />
  );
}

function convertToCSV(objArray: any) {
  // Check if the data is a string and parse it if so
  const array = typeof objArray === 'string' ? JSON.parse(objArray) : objArray;
  let str = '';

  // Ensure there are elements in the array and extract headers
  if (array.length > 0) {
    const header = Object.keys(array[0]);
    str += `${header.join(',')}\r\n`;

    // Extract rows
    array.forEach((item: any) => {
      const row = header
        .map((fieldName) => {
          return JSON.stringify(item[fieldName], (key, value) =>
          // Convert null to empty string for CSV output
          {
            return value === null ? '' : value;
          },
          );
        })
        .join(',');
      str += `${row}\r\n`;
    });
  }

  return str;
}

interface GotDataProps {
  tableData: any;
  tableData2: any;
  spin: boolean;
  userRole?: string; // Make sure this is optional to handle undefined state
}

export const GotData: React.FC<GotDataProps> = ({ tableData, tableData2, spin, userRole }) => {
  const [expandedNotes, setExpandedNotes] = useState({});
  const [activeTab, setActiveTab] = useState('eligible');
  const [loading, setLoading] = useState({});
  const [visaPRStatus, setVisaPRStatus] = useState({});
  const [disabledButtons, setDisabledButtons] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const { updateProfileOverlayState, updateProfileState, profileState } = useHeaderData();
  const { logo_name } = useHeaderData();
  const [run, setRun] = useState(false);
  const [csvData, setCsvData] = useState<unknown>([]);
  const [csvFileName, setCsvFileName] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [fileType, setFileType] = useState('');

  const portalId = '7535538';
  const formId = 'c4d218bc-6b53-4471-af8a-23dec8e26ab7';
  const region = 'na1';
  const target = 'LeadForm';

  useEffect(() => {
    // Reseting visaPRStatus when tableData or tableData2 changes
    setVisaPRStatus({});

    // Reseting disabledButtons when tableData or tableData2 changes
    setDisabledButtons({});
  }, [tableData, tableData2]);

  useEffect(() => {
    if (tableData.table1.length > 0) {
      const isTour = localStorage.getItem('CRS_TABLE_TOUR_DISABLE');
      if (isTour === 'Yes' && !spin) {
        setRun(false);
      } else if(!spin) {
        setRun(true);
      }
    }
  }, [spin, tableData]);

  // Callback function to handle the tour events
  const handleJoyrideCallback = (data: any) => {
    const { status, action } = data;
    // Check if the tour is finished or skipped
    if (!spin && [STATUS.FINISHED, STATUS.SKIPPED].includes(status) || action === 'close') {
      localStorage.setItem('CRS_TABLE_TOUR_DISABLE', 'Yes');
      setRun(false); // Stops the tour
    }
  };

  const updateVisaPRStatus = (action: string, course: object, rowId: any) => {
    setSnackbarOpen(false);
    setErrorMessage('');
    setLoading((prev) => {
      return { ...prev, [`${action.toLowerCase()}_${rowId}`]: true };
    });
    setDisabledButtons((prev) => {
      return {
        ...prev,
        [`${action.toLowerCase()}_${rowId}`]: true,
      };
    });

    const payload = {
      course,
      ask: action,
      email: localStorage.getItem('userEmail'),
    };

    axios
      .post(`${process.env.NEXT_SERVER_API_BASE_URL}/api/visa-pr-prob`, payload, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      })
      .then((response) => {
        updateProfileState('');
        setLoading((prev) => {
          return { ...prev, [`${action.toLowerCase()}_${rowId}`]: false };
        });
        setVisaPRStatus((prev: any) => {
          return {
            ...prev,
            [rowId]: {
              ...prev[rowId],
              [action.includes('Visa') ? 'visa' : 'pr']: {
                chances: response?.data?.Message?.['PR Chances'] || response?.data?.Message?.['Visa Chances'],
                description: response?.data?.Message?.Description || '',
              },
            },
          };
        });
      })
      .catch((error) => {
        setLoading((prev) => {
          return { ...prev, [`${action.toLowerCase()}_${rowId}`]: false };
        });
        setSnackbarOpen(true);
        setErrorMessage('Oops! Looks like something went wrong. Please try again.');
      })
      .finally(() => {
        setLoading((prev) => {
          return { ...prev, [`${action.toLowerCase()}_${rowId}`]: false };
        });
      });
  };

  const toggleNotes = useCallback((id: any) => {
    setExpandedNotes((prev: any) => {
      return { ...prev, [id]: !prev[id] };
    });
  }, []);

  const handleTabClick = useCallback((tabName: string) => {
    setActiveTab(tabName);
  }, []);

  if (spin) return <Loader />;

  const uniqueTableData1 =
    tableData && tableData.table1
      ? Array.from(
        new Map(
          tableData.table1.map((item: any) => {
            return [JSON.stringify(item), item];
          }),
        ).values(),
      )
      : [];
  const uniqueTableData2 =
    tableData2 && tableData2.table2
      ? Array.from(
        new Map(
          tableData2.table2.map((item: any) => {
            return [JSON.stringify(item), item];
          }),
        ).values(),
      )
      : [];

  const handleCSVIconClickFeedback = () => {
    if (fileType === 'Eligible') {
      setCsvData(uniqueTableData1);
      setCsvFileName(`${logo_name}'s Eligible Courses.csv`);
    } else if (fileType === 'NonEligible') {
      setCsvData(uniqueTableData2);
      setCsvFileName(`${logo_name}'s Non Eligible Courses.csv`);
    }
    // Reset after download
    setShowDialog(true);
    setFileType('');
    setShowFeedback(false);
  };

  const handleCSVIconClick = (type: string) => {
    // Depending on the type, set the appropriate data for MyComponent
    if (type === 'Eligible') {
      setCsvData(uniqueTableData1);
      setCsvFileName(`${logo_name}'s Eligible Courses.csv`);
    } else if (type === 'NonEligible') {
      setCsvData(uniqueTableData2);
      setCsvFileName(`${logo_name}'s Non Eligible Courses.csv`);
    }
    setShowDialog(true);
  };

  const steps = [
    {
      target: '.step01',
      content: 'Select a tab to display the courses you are eligible or ineligible for.',
      disableBeacon: true,
    },
    {
      target: '.step02',
      content: 'You can get the list of recommended courses from here after providing feedback.',
      disableBeacon: true,
    },
    {
      target: '.step03',
      content: 'If you want more accurate Visa and Pr probablity, we suggest you fill the profile page details for best outcomes.',
      disableBeacon: true,
    },
    {
      target: '.step04',
      content: 'Click on the arrow icons to expand the rows and view more information about the course.',
      disableBeacon: true,
    },
  ];

  return (
    <div>
      <div className="txtContainer setHeight bblack-bac">
        <Joyride
          continuous
          scrollToFirstStep
          run={run}
          scrollOffset={300}
          showProgress
          showSkipButton
          disableOverlayClose
          steps={steps}
          callback={handleJoyrideCallback}
          styles={{
            options: {
              zIndex: 100,
            },
            buttonNext: {
              backgroundColor: '#D08420',
            },
            buttonBack: {
              color: '#2A2B2D',
            },
          }}
        />
        {uniqueTableData1.length > 0 && (
          <div className={`${styles.tabsContainer}`}>
            <div className={`step01 ${styles.tabs}`}>
              <button
                type="button"
                className={`${styles.tab_button} ${activeTab === 'eligible' ? `${styles.active}` : ''}`}
                onClick={() => {
                  return handleTabClick('eligible');
                }}
              >
                Eligible
              </button>
              <div className={`${styles.divider}`}></div>
              <button
                type="button"
                className={`${styles.tab_button} ${activeTab === 'notEligible' ? `${styles.active}` : ''}`}
                onClick={() => {
                  return handleTabClick('notEligible');
                }}
              >
                Non Eligible
              </button>
            </div>
            {activeTab === 'eligible' && uniqueTableData1.length > 0 && (
              <div
                data-tooltip
                onClick={() => {
                  const feedback = localStorage.getItem('feedback');
                  if (feedback === 'Filled') {
                    handleCSVIconClick('Eligible');
                  } else {
                    setShowFeedback(true);
                    setFileType('Eligible');
                  }
                }}
                aria-label="Download Eligible"
                className="relative step02 cursor-pointer mr-4"
              >
                <CSVIcon />
              </div>
            )}
            {activeTab === 'notEligible' && uniqueTableData2.length > 0 && (
              <div
                data-tooltip
                onClick={() => {
                  const feedback = localStorage.getItem('feedback');
                  if (feedback === 'Filled') {
                    handleCSVIconClick('NonEligible');
                  } else {
                    setShowFeedback(true);
                    setFileType('NonEligible');
                  }
                }}
                aria-label="Download Non Eligible"
                className="relative cursor-pointer mr-4"
              >
                <CSVIcon />
              </div>
            )}
            <MyComponent tableData={csvData} open={showDialog} onClose={() => {return setShowDialog(false);}} csvName={csvFileName}/>
          </div>
        )}
        {activeTab === 'eligible' && uniqueTableData1.length > 0 && (
          <div className="mt-2">
            {/* <h1>Eligible</h1> */}
            <TableContainer component={Paper} className="border border-[#D2D2D2] tableContainer">
              <Table stickyHeader aria-label="collapsible table">
                <TableHead className="sticky table-header z-20">
                  <TableRow>
                    <TableCell className=" table-header" />
                    <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                      Field Of Study
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                      Institute Name
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                      Title
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                      Level
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} className="table-header">
                      Visa&nbsp;Chances
                    </TableCell>
                    <TableCell style={{ fontWeight: 'bold' }} className="table-header">
                      PR&nbsp;Chances
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className='step04'>
                  {uniqueTableData1.map((row, index) => {
                    return (
                      <CollapsibleRow
                        key={`eligible-${index}`}
                        row={row}
                        toggleNotes={toggleNotes}
                        expandedNotes={expandedNotes}
                        rowId={`eligible-${index}`}
                        Role={userRole}
                        updateVisaPRStatus={updateVisaPRStatus}
                        visaPRStatus={visaPRStatus}
                        loading={loading}
                        activeTab={activeTab}
                        disabledButtons={disabledButtons}
                        profileState={profileState}
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Alert variant="outlined" severity="warning" className="mt-4 step03">
              <div className="text-primary-text !font-bold">
                If you&apos;re not happy with the PR or Visa Probability, we encourage you to fully complete your
                profile information by{' '}
                <Link
                  underline="none"
                  component="button"
                  variant="body2"
                  className="!mb-[3px]"
                  onClick={() => {
                    updateProfileOverlayState(true);
                  }}
                >
                  clicking here.
                </Link>
              </div>
            </Alert>
          </div>
        )}
        {activeTab === 'notEligible' && (
          <div className="mt-2">
            {uniqueTableData2.length > 0 ? (
              <TableContainer component={Paper} className="border border-[#D2D2D2] tableContainer">
                <Table stickyHeader aria-label="collapsible table">
                  <TableHead className="sticky table-header z-20">
                    <TableRow>
                      <TableCell className="table-header" />
                      <TableCell style={{ fontWeight: 'bold' }} className="table-header">
                        Field Of Study
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                        Institute Name
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                        Title
                      </TableCell>
                      <TableCell style={{ fontWeight: 'bold' }} className=" table-header">
                        Level
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {uniqueTableData2.map((row, index) => {
                      return (
                        <CollapsibleRow
                          key={`not-eligible-${index}`}
                          row={row}
                          toggleNotes={toggleNotes}
                          expandedNotes={expandedNotes}
                          rowId={`not-eligible-${index}`}
                          profileState={profileState}
                        />
                      );
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <div className="no-data-message" style={{ textAlign: 'center', padding: '20px' }}>
                <p>
                  There are no institutions listed as not eligible at this moment. Please check back later for updates
                  or explore other categories.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
      <SnackbarAlert open={snackbarOpen} message={errorMessage} />
      <StepperPopup
        isOpen={showFeedback}
        onRequestClose={() => {
          return setShowFeedback(false);
        }}
        onFormSubmit={() => {
          handleCSVIconClickFeedback();
        }}
        portalId={portalId}
        formId={formId}
        region={region}
        target={target}
      />
    </div>
  );
};
