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

class PegawaiController extends Controller
{
    /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */

    private $folder = 'Pegawai/';

     private function _defaultMasterAktivitasDashboard($errors){
      $errors = '';
      try {
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
        $aktivitas = new Aktivitas();
        $allAktivitas = $aktivitas->getFullActivity();
        $buktiFisik = $aktivitas->getAllBukti();
        //$rank = Aktivitas
      }
      catch (\Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      return Inertia::render($this->folder.'PegawaiAktivitasPage', ['allUnsur' => $allUnsur, 'allRank' => $allRank, 'allAktivitas' => $allAktivitas, 'allBukti' => $buktiFisik, 'errors' => $errors]);
    }

    private function _defaultStatusAktivitasDashboard($errors){
      $errors = '';
      $allUnsur = [];
      $allRank = [];
      $allAktivitas = [];
      $buktiFisik = [];
      try {
        $allUnsur = Unsurs::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
        // $aktivitas = new Aktivitas();
        // $allAktivitas = $aktivitas->getFullActivity();
        // $buktiFisik = $aktivitas->getAllBukti();
        //$rank = Aktivitas
        $user = new User();
        $allAktivitas = $user->getCurrentUserAllPersonalAktivitas();
        $buktiFisik = $user->getCurrentUserAllPersonalBukti();
      }
      catch (\Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e->getMessage();
      }
      return Inertia::render($this->folder.'PegawaiStatusAktivitasPage', ['allUnsur' => $allUnsur, 'allRank' => $allRank, 'allAktivitas' => $allAktivitas, 'allBukti' => $buktiFisik, 'errors' => $errors]);
    }

    public function index()
    {
      return $this->_defaultStatusAktivitasDashboard('');
    }

    public function masterAktivitasIndex()
    {
      return $this->_defaultMasterAktivitasDashboard('');
    }

    public function addAktivitas(Request $request)
    {
      $errors = '';
      try {
        $submission = new KPISubmission();
        $submission->user_id = Auth::id();
        $submission->kpi_activity_id = $request->id;

        // WHEN kpi_submission.status = 0 THEN "Menunggu"
        // WHEN kpi_submission.status = 1 THEN "Diterima"
        // WHEN kpi_submission.status = 2 THEN "Ditolak"
        $user = new User();
        $user_boss = $user->getBoss(Auth::id());
        // error_log($user_boss);
        if(count($user_boss) == 0){
          // error_log('should Enter Here');
          $submission->status = 1;
        }
        else{
          // error_log('Not Here');
          $submission->status = 0;
        }
        $submission->save();
      }
      catch (\Throwable $e){
        $errors = 'Saving aktivitas failed with error: '.$e->getMessage();
        return redirect()->back()->with('errors', $errors);
      }
      catch (\Exception $e){
        $errors = 'Saving aktivitas failed with error: '.$e->getMessage();
        return redirect()->back()->with('errors', $errors);
      }
      try {
        for($i=0; $i<count($request->bukti); $i++){

          $buktiSubmission = new BuktiFisikSubmission;
          $buktiSubmission->kpi_submission_id = $submission->id;
          $buktiSubmission->bukti_id = $request->bukti_id[$i];
          $storage = Storage::disk('local')->putFile('bukti_files', $request->file('bukti')[$i]);
          $buktiSubmission->file_location = $storage;
          $buktiSubmission->original_file_name = $request->bukti[$i]->getClientOriginalName();
          $buktiSubmission->save();
        }
      }
      catch (\Throwable $e){
        $errors = 'Saving bukti failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Saving bukti failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

    public function editAktivitas(Request $request)
    {
      $errors = '';
      try {
        for($i=0; $i<count($request->bukti); $i++){

          $buktiSubmission = BuktiFisikSubmission::find($request->submitted_bukti_id[$i]);
          if($buktiSubmission != null){
            Storage::delete($buktiSubmission->file_location);
          }
          //TODO: save new bukti uploads
          // else{
          //   $buktiSubmission = new BuktiFisikSubmission;
          //   $buktiSubmission->kpi_submission_id = $submission->id;
          //   $buktiSubmission->bukti_id = $request->bukti_id[$i];
          // }
          $storage = Storage::disk('local')->putFile('bukti_files', $request->file('bukti')[$i]);
          $buktiSubmission->file_location = $storage;
          $buktiSubmission->original_file_name = $request->bukti[$i]->getClientOriginalName();
          $buktiSubmission->save();
        }
      }
      catch (\Throwable $e){
        $errors = 'Edit bukti failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Edit bukti failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

    public function deleteAktivitas(Request $request)
    {
      $errors = '';
      try {
        $buktiSubmission = BuktiFisikSubmission::where('kpi_submission_id',$request->id)->get();
        for($i=0; $i<count($buktiSubmission); $i++){
          Storage::delete($buktiSubmission[$i]->file_location);
        }
        BuktiFisikSubmission::where('kpi_submission_id',$request->id)->delete();
        KPISubmission::destroy($request->id);
      }
      catch (\Throwable $e){
        $errors = 'Delete aktivitas failed with error: '.$e->getMessage();
      }
      catch (\Exception $e){
        $errors = 'Delete aktivitas failed with error: '.$e->getMessage();
      }
      return redirect()->back()->with('errors', $errors);
    }

    public function downloadBukti(Request $request){
      $user = new User();
      $bukti = $user->getCurrentUserSelectedPersonalBukti($request->individual_submitted_bukti_id);
      return Storage::download($bukti->file_location,$bukti->original_file_name);
  }

}