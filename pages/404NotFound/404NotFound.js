import { Button } from '@mantine/core';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div style={{width:'100%',height:'100vh',display:'flex',alignItems:'center',justifyContent:'center'}}>
        <div>
            <h1>404 Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Button component={Link} to="/" variant="outline" color="blue">
                Go Back to Home
            </Button>
        </div>
    </div>
  );
};

export default NotFound;
