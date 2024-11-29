import { DataGrid, GridColDef, GridValueFormatter, GridRenderCellParams } from '@mui/x-data-grid';
import { useFoodStore } from '../store/store';
import { useEffect } from 'react';
import dayjs from 'dayjs';
import { FoodEntry } from '../db/database';

const columns: GridColDef<FoodEntry>[] = [
  {
    field: 'name',
    headerName: 'Food Name',
    width: 200
  },
  {
    field: 'calories',
    headerName: 'Calories',
    width: 120,
    type: 'number'
  },
  {
    field: 'created_at',
    headerName: 'Date Added',
    width: 200,
    valueFormatter: (value: string) =>
      dayjs(value).format('YYYY-MM-DD HH:mm')
  },
  {
    field: 'actions',
    headerName: 'Actions',
    width: 150,
    renderCell: (params: GridRenderCellParams<FoodEntry>) => (
      <div>
        <button
          onClick={() => console.log('Edit', params.row.id)}
          style={{ marginRight: '8px' }}
        >
          Edit
        </button>
        <button
          onClick={() => console.log('Delete', params.row.id)}
        >
          Delete
        </button>
      </div>
    )
  }
];

export const FoodList = () => {
  const { foods, fetchFoods, removeFood } = useFoodStore();

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={foods}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 5 }
          }
        }}
        pageSizeOptions={[5]}
        getRowId={(row: FoodEntry) => row.id}
      />
    </div>
  );
};