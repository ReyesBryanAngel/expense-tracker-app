import React, { useContext } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { Box, IconButton } from '@mui/material'
import useFetchBills from '../hooks/useFetchBills'
import useBillsColumns from '../columns/useBillsColumns'
import { GlobalDataContext } from '../contexts/globalData'
import BillsForm from '../forms/BillsForm'
import AddIcon from "@mui/icons-material/Add";

const BillsPage = () => {
    const { isBillModalOpen, setIsBillModalOpen } = useContext(GlobalDataContext);
    const { columns } = useBillsColumns(setIsBillModalOpen);

    const { bills } = useFetchBills();
    return (
        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", mt: 2 }}>
            <BillsForm
                isModalOpen={isBillModalOpen}
                setIsModalOpen={setIsBillModalOpen}
            />
            <Box sx={{ width: "90%", height: 650, position:'relative' }}>
                <IconButton
                    size="small"
                    sx={{
                        position:'absolute',
                        alignSelf: 'end',
                        width: '24px',
                        height: '24px',
                        bgcolor: 'primary.main',
                        color: 'white',
                        borderRadius: 1,
                        '&:hover': {
                            bgcolor: 'primary.dark',
                        },
                        right: 0
                    }}
                    onClick={() => setIsBillModalOpen(true)}
                >
                    <AddIcon fontSize="small" />
                </IconButton>
                <DataGrid
                    rows={bills}
                    getRowId={(row) => row._id}
                    columns={columns}
                    pageSizeOptions={[20, 50, 100]}
                    sx={{ boxShadow: 2, mt: 5 }}
                />
            </Box>
        </Box>
    )
}

export default BillsPage
