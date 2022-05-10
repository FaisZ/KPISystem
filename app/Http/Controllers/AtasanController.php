<?php
 
namespace App\Http\Controllers;
 
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Unsur;
use App\Models\Rank;
use App\Models\Aktivitas;
use App\Models\Tahapan;
use App\Models\BuktiFisik;
use App\Models\KPISubmission;
use App\Models\BuktiFisikSubmission;
use Auth; 
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Http\Redirector;
use Illuminate\Support\Facades\Storage;

class AtasanController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */

    private $folder = 'Atasan/';

    private function _defaultStatusAktivitasDashboard($errors){
      $errors = '';
      try {
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
        $user = new User();
        $allAktivitas = $user->getCurrentUserUnderlingAllPersonalAktivitas();
        $buktiFisik = $user->getCurrentUserUnderlingAllPersonalBukti();
        // $allAktivitas = $user->getCurrentUserAllPersonalAktivitas();
        // $buktiFisik = $user->getCurrentUserAllPersonalBukti();
      }
      catch (\Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      return Inertia::render($this->folder.'BawahanStatusAktivitasPage', ['allUnsur' => $allUnsur, 'allRank' => $allRank, 'allAktivitas' => $allAktivitas, 'allBukti' => $buktiFisik, 'errors' => $errors]);
    }

    public function index()
    {
      return $this->_defaultStatusAktivitasDashboard('');
    }


    public function acceptAktivitas(Request $request)
    {
      $errors = '';
      try {
        $pegawaiActivity = KPISubmission::where('id',$request->id)->firstOrFail();
        $pegawaiActivity->status = 1;
        $pegawaiActivity->save();
      }
      catch (\Throwable $e){
        $errors = 'Accepting aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Accepting aktivitas failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

    public function rejectAktivitas(Request $request)
    {
      $errors = '';
      try {
        $pegawaiActivity = KPISubmission::where('id',$request->id)->firstOrFail();
        $pegawaiActivity->status = 2;
        $pegawaiActivity->save();
      }
      catch (\Throwable $e){
        $errors = 'Rejecting aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Rejecting aktivitas failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

}