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

class AdministratorController extends Controller
{
  /**
     * Show the profile for a given user.
     *
     * @param  int  $id
     * @return \Illuminate\View\View
     */
    private $folder = 'Administrator/';

    public function index()
    {
      return Inertia::render($this->folder.'AddMasterActivity', ['hello' => 'world']);
    }

    private function _newUnsurDefaultData($errors){
      try {
        //get all unsur, but convert to usable array in the js here
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
      }
      catch (Throwable $e){
        $errors = 'Retrieving unsur failed with error: '.$e;
      }
      return Inertia::render($this->folder.'AddUnsur', ['selected' => '1', 'allUnsur' => $allUnsur, 'errors' => $errors]);
    }

    public function newUnsur()
    {
      return $this->_newUnsurDefaultData('');
    }

    public function addUnsur(Request $request)
    {
      $errors = '';
      try {
        $save = new Unsur;
        $save->title = $request->title;
        $save->description = $request->description;
        $level = 0;
        if($request->parent_id != null && $request->parent_id != -1){
          $parentId = Unsur::find($request->parent_id);
          if($parentId==null)
            throw new Exception("Parent Not Found. Check Query", 1);
          $save->parent_id = $request->parent_id;
          $level = $parentId->level+1;
        }
        $save->level = $level;
        $save->save();
      }
      catch (Throwable $e){
        $errors = 'Saving unsur failed with error: '.$e;
      }
      return $this->_newUnsurDefaultData($errors);
    }

    public function _newAktivitasDefaultData($errors){
      $errors = '';
      try {
        //get all unsur, but convert to usable array in the js here
        $allUnsur = Unsur::select('title AS label','id AS value','parent_id','level')->get();
        $allRank = Rank::select('name AS label','id AS value')->get();
      }
      catch (Throwable $e){
        $errors = 'Retrieving aktivitas failed with error: '.$e;
      }
      return Inertia::render($this->folder.'AddAktivitas', ['allRank' => $allRank, 'allUnsur' => $allUnsur, 'errors' => $errors]);
    }

    public function newAktivitas(){
      return $this->_newAktivitasDefaultData('');
    }

    public function addAktivitas(Request $request)
    {
      $errors = '';
      try {
        $activity = new Aktivitas;
        $activity->title = $request->title;
        $activity->description = $request->description;
        $activity->rank_id = $request->rank_id;
        $activity->credit_value = $request->credit_value;
        $activity->kpi_group_id = $request->kpi_group_id;
        $activity->has_file = true;
        $activity->save();
      }
      catch (Throwable $e){
        $errors = 'Saving aktivitas failed with error: '.$e;
      }
      try {
        $tahapan = new Tahapan;
        $tahapan->kpi_activity_id = $activity->id;
        $tahapan->description = $request->tahapan;
        $tahapan->save();
      }
      catch (Throwable $e){
        Aktivitas::destroy($activity->id);
        $errors = 'Saving tahapan failed with error: '.$e;
      }
      try {
        foreach($request->bukti as $buct){
          $bukti = new BuktiFisik;
          $bukti->kpi_activity_id = $activity->id;
          $bukti->description = $buct;
          $bukti->file_type = 'document';
          $bukti->save();
        }
      }
      catch (Exception $e){
        Aktivitas::destroy($activity->id);
        Tahapan::destroy($tahapan->id);
        $errors = 'Saving bukti failed with error: '.$e;
      }
      return $this->_newAktivitasDefaultData($errors);
    }
}