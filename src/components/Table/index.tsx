import { DataGrid, type GridColDef } from '@mui/x-data-grid';

interface TableProps {
  columns: GridColDef[];
}

export const Table = ({ columns }: TableProps) => {
  return <DataGrid rows={rows} columns={columns} />;
};
