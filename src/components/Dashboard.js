import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Dashboard.css'; // Import your CSS file
import { useNavigate, useLocation } from 'react-router-dom';
import LineChart from '../LineChart';
import TimeFilter from '../TimeFilter';
import ComparisonChart from '../ComparisonChart';
import WindiestDaysChart from '../WindiestDaysChart';
import Loader from './Loader';
const ITEMS_PER_PAGE = 10; // Number of users per page


const Dashboard = () => {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(true);
  const location = useLocation();
  const userEdited = location.state && location.state.userEdited;
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [chartData, setChartData] = useState([]);
  const [Line, setLine] = useState()
  const [startTime, setStartTime] = useState('00:00'); // Initialize with default values
  const [endTime, setEndTime] = useState('23:59'); 
  const [totalPages, setTotalPages] = useState(1);


  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    setLoading(true);
    const storedToken = sessionStorage.getItem('authToken')
    const headers = {
      Authorization: storedToken,
    };
    axios.get(`https://praan-task-x116.onrender.com/api/devices?page=${currentPage}&limit=${ITEMS_PER_PAGE}`,{headers})
      .then(response => {
        setLoading(false);
        if (response.data.status === false) {
          toast.error(response.data.message);
        } else {
          setUsers(response.data.devices); 
          setChartData(response.data.devices);
          setTotalPages(Math.ceil(response.data.totalCount / ITEMS_PER_PAGE));

        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        toast.error('An error occurred while fetching user data.');
      });






      axios.get(`https://praan-task-x116.onrender.com/api/devices/chart/line`,{headers})
      .then(response => {
        setLoading(false);
        console.log(response.data,'pppppppppp')
        if (response.data.status === false) {
          toast.error(response.data.message);
        } else {
         console.log(response.data)
          setLine(response.data.output);
          console.log(Line)
        }
      })
      .catch(error => {
        setLoading(false);
        console.error(error);
        toast.error('An error occurred while fetching user data.');
      });









  }, [userEdited,currentPage]);

  const handleNextPage = () => {
    // Ensure that the currentPage does not exceed the total number of pages
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const navigate = useNavigate();
  const handleEdit = (userId) => {
    // Implement the edit functionality based on the userId
    navigate(`/device/${userId}`);
  };
 
  const redirectToAddUser = () =>{
    navigate('/device');
  }


    const handleDelete = (userId) => {
      const confirmed = window.confirm('Are you sure you want to delete device?');
      if(confirmed){
        const storedToken = sessionStorage.getItem('authToken')
    const headers = {
      Authorization: storedToken,
    };
// Implement the delete functionality based on the userId
axios.delete(`https://praan-task-x116.onrender.com/api/devices/${userId}`,{headers})
.then(response => {
  console.log(response.data);
  setUsers(prevUsers => prevUsers.filter(user => user._id !== userId));
toast.success('device deleted successfully');
})
.catch(error => {
  console.error(error);
  toast.error('An error occurred while fetching user data.');
});
      }
      
    };
  
  
    const handleTimeFilter = () => {
      const startHour = new Date();
      startHour.setHours(parseInt(startTime.split(':')[0], 10), parseInt(startTime.split(':')[1], 10), 0, 0);
    
      const endHour = new Date();
      endHour.setHours(parseInt(endTime.split(':')[0], 10), parseInt(endTime.split(':')[1], 10), 59, 59, 999);
    
      // Create a filter object to send to the API
      const filter = {
        startTime: startHour.toISOString(),
        endTime: endHour.toISOString(),
      };
    
    
      const storedToken = sessionStorage.getItem('authToken');
      const headers = {
        Authorization: storedToken,
      };
   
      axios.get(`https://praan-task-x116.onrender.com/api/devices?from_time=${filter.startTime}&to_time=${filter.endTime}&page=1&limit=10`, { headers })
        .then(response => {
          setLoading(false);
          if (response.data.status === false) {
            toast.error(response.data.message);
          } else {
            setUsers(response.data.devices); 
          }
        })
        .catch(error => {
          setLoading(false);
          toast.error('An error occurred while fetching API data.');
        });
    };
    
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const displayedUsers = users
  const handleToggleTable = () => {
    setShowTable(prevShowTable => !prevShowTable);
  };


  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('file', file);

    try {
      const storedToken = sessionStorage.getItem('authToken');
      const headers = {
        Authorization: storedToken,
        'Content-Type': 'multipart/form-data',
      };

      const response = await axios.post(`https://praan-task-x116.onrender.com/api/devices/upload`, formData, {
        headers,
      });

      if (response.data.status) {
        toast.success('File uploaded successfully');
        // You might want to update your data or UI here if necessary
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while uploading the file.');
    }
  };



  return (


    <div>
       <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '20px' }}>
        <button style={{ padding: '10px', color: 'black' }} onClick={handleToggleTable}>
          {showTable ? 'View Devices' : 'Dashboard'}
        </button>
      </div>

      {/* Conditionally render the table or charts */}
      {
        loading ? (
      <Loader /> // Render the loader when loading is true
    ) :
        showTable ? (
        <div>
          <h1>Data Visualization Dashboard</h1>
          <LineChart data={chartData} />
          <TimeFilter onFilterChange={handleTimeFilter} />
          {Line && <ComparisonChart data={Line} />}
          <WindiestDaysChart data={chartData} />
        </div>
      ) : (
        <div>
        <div>
        <label>Start Time:</label>
        <input
          type="time"
          value={startTime}
          onChange={e => setStartTime(e.target.value)}
        />
        <label>End Time:</label>
        <input
          type="time"
          value={endTime}
          onChange={e => setEndTime(e.target.value)}
        />
        <button onClick={handleTimeFilter}>Filter by Time</button>
      </div>
          <table className="table table-dark">
          <thead>
    <tr>
      <th scope="col">Device ID</th>
      <th scope="col">Wind Direction</th>
      <th scope="col">Date And Time</th>
      <th scope="col">Wind Speed</th>
      <th scope="col">P1</th>
      <th scope="col">P10</th>
      <th scope="col">P25</th>
      <th scope="col">Actions</th>
    </tr>
  </thead>
       <tbody>
         {displayedUsers.map(user => (
            <tr key={user.id}>
               <td>{user.device}</td>
               <td>{user.h}</td>
              <td>{user.p}</td>
              <td>{user.w}</td>
              <td>{user.p1}</td>
              <td>{user.p10}</td>
              <td>{user.p25}</td>
               <td>
                 <button onClick={() => handleEdit(user._id)}>Edit</button>
                 <button onClick={() => handleDelete(user._id)}>Delete</button>
               </td>
             </tr>
           ))}
         </tbody>
          </table>
          <div className="pagination" style={{ 'display': 'flex', 'justifyContent': 'center', 'alignItems': 'center', 'marginTop': '20px' }}>
          <button disabled={currentPage === 1} onClick={goToPreviousPage}>
           Previous
         </button>
         <span>{currentPage} / {totalPages}</span>
         <button  disabled={currentPage === totalPages} // Disable the button on the last page
              onClick={handleNextPage}>
           Next
        </button>
          </div>
          <button onClick={() => redirectToAddUser()}>
           Add Device
        </button>
        <div style={{ marginTop: '20px' }}>
            <input type="file" accept=".csv" onChange={handleFileUpload} />
          </div>
        </div>

        
      )}

      <ToastContainer />
    </div>
  );

};

export default Dashboard;
