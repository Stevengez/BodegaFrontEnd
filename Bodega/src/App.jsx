import { useEffect, useState } from 'react'
import './App.css'
import { Backdrop, Button, CircularProgress } from '@mui/material'
import BannerComponent from './Components/banner'
import TableComponent from './Components/table'
import { getAll } from './midleware/requests'

function App() {
  const [data, setData] = useState([])
  const [open, setOpen] = useState(false)
  const [openModal, setOpenModal] = useState(false)
  const [heroID, setHeroID] = useState(null);


  const columns = [
    { field: 'category', headerName: 'Category', filterable: true},
    { field: 'entityId', headerName: 'Entity ID', align: 'right' },
    {field: 'environment', headerName: "Environment", align: 'right', filterable: true},
    { field: 'country', headerName: 'Country', align: 'right' , filterable: true},
    { field: 'origin', headerName: 'Origin', align: 'right' , filterable: true},
    { field: 'businessProcess', headerName: 'Business Process', align: 'right' },
    { field: 'interfaceName', headerName: 'Interface Name', align: 'right' }
];


useEffect(() => {
  const fetchData = async () => {
    setOpen(true)
    const loadData = await getAll();
    if(loadData.status === 200){
      setOpen(false)
    }
    setData(loadData.data);
  };

  fetchData();
}, []);



  return (
    <>
    <div className="Container">
        <BannerComponent title={"Bodega"} subTitle={"Grupo 2"} />
      </div>
      <div className='tablePage'>
        <TableComponent columns={columns} data={data} />
      </div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

     
    </>
  )
}

export default App
