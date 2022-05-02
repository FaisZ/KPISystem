<?php

namespace App\Models;

use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use App\Models\Rank;

class Aktivitas extends Authenticatable
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'kpi_activity';
    protected $primaryKey = 'id';    
    protected $fillable = [
        'title',
        'description',
        'rank_id',
        'credit_value',
    ];

    public function getFullActivity()
    {
        // return Aktivitas::select('kpi_group_id AS group_id','title AS aktivitas','rank_id AS jabatan','credit_value as angkaKredit');
        return DB::table('kpi_activity')
        ->select('kpi_activity.id','kpi_group.title as unsur','kpi_activity.title AS aktivitas','rank.name AS jabatan','credit_value as angkaKredit','tahapan.description AS tahapan')
        ->leftJoin('kpi_group','kpi_activity.kpi_group_id','=','kpi_group.id')
        ->leftJoin('rank','kpi_activity.rank_id','=','rank.id')
        ->leftJoin('tahapan','kpi_activity.id','=','tahapan.kpi_activity_id')
        // ->leftJoin('bukti_fisik','kpi_activity.id','=','bukti_fisik.kpi_activity_id')
        ->get();
    }
    public function getAllBukti(){
        return DB::table('kpi_activity')
        ->select('kpi_activity.id','bukti_fisik.description')
        ->leftJoin('bukti_fisik','kpi_activity.id','=','bukti_fisik.kpi_activity_id')
        ->get();
    }
}
