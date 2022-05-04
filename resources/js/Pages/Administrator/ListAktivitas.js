import ReactDOM from 'react-dom';
import React from 'react';
import Authenticated from '@/Layouts/Authenticated';
import { Link, Head } from '@inertiajs/inertia-react';
import Container from '@material-ui/core/Container';
import ActivityTable from '@/Components/ActivityTable';
import ReactModal from '@/Components/ReactModal';
import AddUnsurForm from '@/Components/Forms/AddUnsurForm';
import AddActivityForm from '@/Components/Forms/AddActivityForm';

export default function ListAktivitas(props) {
  const token = document.head.querySelector('meta[name="csrf-token"]').content;

  return (
    <Authenticated
      auth={props.auth}
      errors={props.errors}
      header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Aktivitas</h2>}
    >
      <div>
        <Head title="Tambah Master Data Aktivitas" />
        <div className="col-8 p-6 bg-white">
          <div>
            Errors: {props.allAktivitas[1].tahapan}
          </div>
        </div>

        <div className="py-12">
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <div className="p-6 bg-white border-b border-gray-200">
              <tr>
                <td>
                  <ReactModal
                    modalOpenText={'+ Unsur'} 
                    modalTitle={'Unsur Baru'}
                    modalContent={<AddUnsurForm allUnsur={props.allUnsur}/>}
                    modalWidth={'60%'}
                  />
                </td>
                <td style={{padding:'20px'}}>
                  <ReactModal
                    modalOpenText={'+ Aktivitas'} 
                    modalTitle={'Aktivitas Baru'}
                    modalContent={<AddActivityForm allUnsur={props.allUnsur} allRank={props.allRank}/>}
                    modalWidth={'60%'}
                  />
                </td>
              </tr>
            </div>
          </div>
          <div className="max-w-8xl mx-auto sm:px-6 lg:px-8">
            <input type="hidden" name="_token" value={token} />
            <div className="p-6 bg-white border-b border-gray-200">
              <ActivityTable tableData={props.allAktivitas} buktiFisikData={props.allBukti} allUnsur={props.allUnsur} allRank={props.allRank}/>
            </div>
          </div>
        </div>
      </div>
    </Authenticated>
  
  );
}
  
if (document.getElementById('experiments')) {
  ReactDOM.render(<Experiments />, document.getElementById('experiments'));
}
