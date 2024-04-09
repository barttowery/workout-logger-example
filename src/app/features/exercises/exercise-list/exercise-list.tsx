import styles from './exercise-list.module.css';
import { ExerciseItem } from '../interfaces/exercise-item';
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { ColDef, SizeColumnsToContentStrategy, SizeColumnsToFitGridStrategy, SizeColumnsToFitProvidedWidthStrategy } from 'ag-grid-community';
import { ExerciseListButtons } from '../exercise-list-buttons/exercise-list-buttons';

/* eslint-disable-next-line */
export interface ExerciseListProps {
  exercises: ExerciseItem[];
}

export function ExerciseList(props: ExerciseListProps) {
  const colDefs: ColDef<ExerciseItem>[] = [
    { field: "name", headerName: "Exercise Name" },
    { field: "duration", headerName: "Time", valueFormatter: d => d.value === null ? 'N/A' : d.value },
    { field: "type", headerName: "Exercise Type" },
    { field: "date", headerName: "Date Completed", valueFormatter: d => new Date(d.value).toLocaleDateString('en-US') },
    { field: "id", headerName: "", cellRenderer: ExerciseListButtons, sortable: false, valueGetter: p => p.data}
  ];
  const autoSizeStrategy: SizeColumnsToFitGridStrategy | SizeColumnsToFitProvidedWidthStrategy | SizeColumnsToContentStrategy = {
    type: 'fitGridWidth',
    defaultMinWidth: 100,
  };
  const NoRowsOverlay = () => {
    return <div>No Exercises Recorded Yet</div>;
  };

  return (
    <div className="ag-theme-quartz" >
      <AgGridReact
        rowData={props.exercises}
        columnDefs={colDefs}
        autoSizeStrategy={autoSizeStrategy}
        domLayout='autoHeight'
        noRowsOverlayComponent={NoRowsOverlay}
      />
    </div>
  );
}

export default ExerciseList;
