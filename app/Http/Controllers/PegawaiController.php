<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Unsur;
use App\Models\Rank;
use App\Models\Aktivitas;
use App\Models\Tahapan;
use App\Models\BuktiFisik;
use Auth; 
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Redirector;

class PegawaiController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */

    private $folder = 'Pegawai/';

     private function _defaultDashboard($errors){
      $errors = '';
      try {
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
        $aktivitas = new Aktivitas();
        $allAktivitas = $aktivitas->getFullActivity();
        $buktiFisik = $aktivitas->getAllBukti();
        //$rank = Aktivitas
      }
      catch (Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e;
      }
      return Inertia::render($this->folder.'PegawaiAktivitasPage', ['allUnsur' => $allUnsur, 'allRank' => $allRank, 'allAktivitas' => $allAktivitas, 'allBukti' => $buktiFisik, 'errors' => $errors]);
    }

    public function index()
    {
      return $this->_defaultDashboard('');
    }

    public function show($id)
    {
        return view('pegawai.pegawai_dashboard', [
            'user' => User::findOrFail($id)
        ]);
    }

    public function addActivity()
    {
        return view('pegawai.pegawai_add_new_activity', [
          'user' => Auth::user()
        ]);
    }

    public function addPegawai(Request $request)
    {
      $save = new User;
      $save->name = $request->name;
      $save->email = $request->email;
      $save->password = $request->password;

      $save->save();
      return Inertia::render('Experiments', ['status' => 'success']);
      //return redirect()->back()->with('status', 'User added');   
      
    }
}