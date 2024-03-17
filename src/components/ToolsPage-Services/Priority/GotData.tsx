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
};

const CustomWidthTooltip = styled(({ className, ...props }: TooltipProps) => {
  return <Tooltip {...props} classes={{ popper: className }} />;
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
                          <FaSync
                            className={'ml-2 cursor-pointer'}
                            onClick={() => {
                              return updateVisaPRStatus && updateVisaPRStatus('Visa', row, rowId);
                            }}
                          />
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
                          <FaSync
                            className={'ml-2 cursor-pointer'}
                            onClick={() => {
                              return updateVisaPRStatus && updateVisaPRStatus('PR', row, rowId);
                            }}
                          />
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

function downloadCSV(data: any, filename: string) {
  const csvData = convertToCSV(data);
  const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  link.href = URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
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
  const [fileType, setFileType] = useState('');
  const { updateProfileOverlayState } = useHeaderData();
  const { logo_name } = useHeaderData();

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
        setLoading((prev) => {
          return { ...prev, [`${action.toLowerCase()}_${rowId}`]: false };
        });
        setVisaPRStatus((prev: any) => {
          return {
            ...prev,
            [rowId]: {
              ...prev[rowId],
              [action.includes('Visa') ? 'visa' : 'pr']: {
                chances: response.data.Message['PR Chances'] || response.data.Message['Visa Chances'],
                description: response.data.Message.Description || '',
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

  const handleFileDownload = () => {

    if (fileType === 'Eligible') {
      downloadCSV(tableData.table1, `${logo_name}'s Eligible Courses.csv`);
    } else if (fileType === 'NonEligible') {
      downloadCSV(tableData2.table2, `${logo_name}'s Non Eligible Courses.csv`);
    }
    // Reset after download
    setFileType('');
    setShowFeedback(false);
  };

  return (
    <div>
      <div className="txtContainer setHeight bblack-bac">
        {uniqueTableData1.length > 0 && (
          <div className={`${styles.tabsContainer}`}>
            <div className={`${styles.tabs}`}>
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
                  setShowFeedback(true);
                  setFileType('Eligible');
                }}
                aria-label="Download Eligible"
                className="relative cursor-pointer mr-4"
              >
                <CSVIcon />
              </div>
            )}
            {activeTab === 'notEligible' && uniqueTableData2.length > 0 && (
              <div
                data-tooltip
                onClick={() => {
                  setShowFeedback(true);
                  setFileType('NonEligible');
                }}
                aria-label="Download Non Eligible"
                className="relative cursor-pointer mr-4"
              >
                <CSVIcon />
              </div>
            )}
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
                <TableBody>
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
                      />
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
            <Alert variant="outlined" severity="warning" className="mt-4">
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
          handleFileDownload();
        }}
        portalId={portalId}
        formId={formId}
        region={region}
        target={target}
      />
    </div>
  );
};
