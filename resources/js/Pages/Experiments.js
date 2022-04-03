import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import HelloReact from '@/Components/HelloReact';

export default function Experiments(props) {
    return (
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Budak</h2>}
  >
    <Container maxWidth="sm">
      <Typography component="div" style={{ 
        backgroundColor: 'Orange', height: '10vh' 
      }}>
            <Head title="Experiments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 bg-white border-b border-gray-200">You're a budak pemerintah now!</div>
                        <HelloReact></HelloReact>
                    </div>
                </div>
            </div>
      </Typography>
    </Container>
  </Authenticated>
    );
}
  
// const App = () => {
//   return (
//     <Container maxWidth="sm">
//       <Typography component="div" style={{ 
//         backgroundColor: 'Orange', height: '100vh' 
//       }}>
//         Greetings from GeeksforGeeks
//       </Typography>
//     </Container>
//   );
// }
  
// export default App