import ReactDOM from 'react-dom';
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
import Dropdown from 'reactjs-dropdown-component';
import Select from 'react-select';

export default function AddUnsur(props) {
  const token = document.head.querySelector('meta[name="csrf-token"]').content;
  const unsurDropDownChilds = ['mama','mimi'];
  const techCompanies = [
    { label: "Apple", value: 1 },
    { label: "Facebook", value: 2 },
    { label: "Netflix", value: 3 },
    { label: "Tesla", value: 4 },
    { label: "Amazon", value: 5 },
    { label: "Alphabet", value: 6 },
  ];
  
  const onChange = (item, name) => {
    $x = name;
  }
  
  return (
      <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Buat Unsur Baru</h2>}
  >
    <Container maxWidth="lg">
            <Head title="Tambah Master Data Aktivitas" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                  <div className="p-6 bg-white border-b border-gray-200">
                    Visualisasi
                    Unsur 1
                  </div>
                    <form method="POST" action="/e/addPegawai">
                      <input type="hidden" name="_token" value={token} />
                      {/* <input type="hidden" name="_token" value="{{ csrf_token() }}" /> */}
                        <div className="p-6 bg-white border-b border-gray-200">
                          Sub-Unsur dari Unsur
                            <Select options={ techCompanies } />
                          Nama Unsur
                          <Input name="name"/>
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
  
if (document.getElementById('experiments')) {
  ReactDOM.render(<Experiments />, document.getElementById('experiments'));
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