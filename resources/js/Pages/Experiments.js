import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Head } from '@inertiajs/inertia-react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import ShoppingList from '@/Components/ShoppingList';
import TicTacToe from '@/Components/TicTacToe';
import TicTacToeChild from '@/Components/TicTacToeChild';
import Input from '@/Components/Input';
import Button from '@/Components/Button';

export default function Experiments(props) {
  const token = document.head.querySelector('meta[name="csrf-token"]').content;
    return (
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Tambah Master Data Aktivitas</h2>}
  >
    <Container maxWidth="lg">
            <Head title="Experiments" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <form method="POST" action="/e/addPegawai">
                      <input type="hidden" name="_token" value={token} />
                      {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
                        <div className="p-6 bg-white border-b border-gray-200">
                          Username
                          <Input name="name"/>
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                          Email
                          <Input name="email"/>
                        </div>
                        <div className="p-6 bg-white border-b border-gray-200">
                          Password
                          <Input name="password"/>
                        </div>
                        <Button children='Tambahkan' />
                        {/* <ShoppingList name="Blast"/> */}
                    </form>
                </div>
            </div>
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