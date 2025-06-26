import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { useFoodStore } from "../../../store/store";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import { FoodEntry } from "../../../db/database";
import { FoodForm } from "./FoodForm";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";

export const FoodList = () => {
  const { foods, fetchFoods, removeFood } = useFoodStore();
  const [editItem, setEditItem] = useState<FoodEntry | null>(null);

  useEffect(() => {
    fetchFoods();
  }, [fetchFoods]);

  const columns: GridColDef<FoodEntry>[] = [
    {
      field: "name",
      headerName: "Food Name",
      width: 200,
    },
    {
      field: "calories",
      headerName: "Calories",
      width: 120,
      type: "number",
    },
    {
      field: "created_at",
      headerName: "Date Added",
      width: 200,
      valueFormatter: (value: string) =>
        dayjs(value).format("YYYY-MM-DD HH:mm"),
    },
    {
      field: "actions",
      headerName: "Actions",
      width: 150,
      renderCell: (params: GridRenderCellParams<FoodEntry>) => {
        const handleDelete = async () => {
          try {
            await removeFood(params.row.id);
          } catch (error) {
            console.error("Failed to delete food:", error);
          }
        };

        const handleEdit = () => {
          setEditItem(params.row);
        };

        return (
          <div>
            <button onClick={handleEdit} style={{ marginRight: "8px" }}>
              Edit
            </button>
            <button onClick={handleDelete}>Delete</button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <div style={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={foods}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
          getRowId={(row: FoodEntry) => row.id}
        />
      </div>
      {editItem && (
        <Dialog
          open={true}
          onClose={() => setEditItem(null)}
          maxWidth="sm"
          fullWidth
        >
          <DialogTitle>Edit Food Entry</DialogTitle>
          <DialogContent>
            <FoodForm editItem={editItem} onClose={() => setEditItem(null)} />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};
