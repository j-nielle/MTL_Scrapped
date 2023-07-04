<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\RequestNotifs;
use Illuminate\Support\Facades\DB;
use Symfony\Component\HttpFoundation\StreamedResponse;

class SSEController extends Controller{
    private $notifs;
    private $overall;

    public function fetchData(){
        $this->fetchDataFromDB();

        return new StreamedResponse(function () {
            $this->setSSEHeaders();

            while (true) {
                $notifsData = json_encode($this->notifs);

                echo "data: $notifsData\n\n";
                $this->flushOutputBuffer();

                sleep(1);
            }
        });
    }

    private function fetchDataFromDB(){
        $this->notifs = DB::table('requestNotifs')->orderBy('created_at', 'desc')->get();
        $this->overall = DB::table('allMoods')->get();
    }

    private function setSSEHeaders(){
        header('Content-Type: text/event-stream');
        header('Cache-Control: no-cache');
        header('Connection: keep-alive');
    }

    private function flushOutputBuffer(){
        ob_flush();
        flush();
    }
}